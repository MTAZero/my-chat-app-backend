import { HttpException, HttpStatus } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private readonly _reflector: Reflector) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const passportActive = await super.canActivate(context);

        if (!passportActive) {
            throw new HttpException(
                'You do not have permission (Roles)',
                HttpStatus.UNAUTHORIZED,
            );
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        console.log("user : ", user)

        return user.username === "admin";
    }

}