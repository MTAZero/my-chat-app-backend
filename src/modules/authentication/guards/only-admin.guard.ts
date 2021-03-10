import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { TblUsersService } from 'src/modules/database/services/tbl-users.service';

@Injectable()
export class OnlySAGuard extends AuthGuard('jwt') {
    @Inject()
    userService: TblUsersService;

    constructor(private readonly _reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const passportActive = await super.canActivate(context);

        if (!passportActive) {
            throw new HttpException(
                'You do not have permission (Roles)',
                HttpStatus.UNAUTHORIZED,
            );
        }

        try {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            let _user = await this.userService.getOne(user.userId);

            if (_user.username === 'mtazero') return true;

            return false;
        } catch (ex) {
            return false;
        }
    }
}
