import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from 'src/modules/database/services/authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    @Inject(AuthenticationService)
    authService: AuthenticationService

    async validate(username: string, password: string): Promise<any> {
        let result = await this.authService.validateUser(
            username,
            password,
        );
        if (!result.isValidate) throw new UnauthorizedException();

        return result.user;
    }
}
