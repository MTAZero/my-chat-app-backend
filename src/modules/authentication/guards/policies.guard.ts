import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthHelperService } from '../casl/auth-helper.service';

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies: any = (action_code = '', module_code = '') => {
    let obj = {
        action_code,
        module_code,
    };

    return SetMetadata(CHECK_POLICIES_KEY, obj)
};

@Injectable()
export class PoliciesGuard extends AuthGuard('jwt') {

    @Inject()
    authHelperService: AuthHelperService;

    constructor(private reflector: Reflector) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);

        const obj = this.reflector.get(
            CHECK_POLICIES_KEY,
            context.getHandler(),
        ) || { module_code: '', action_code: '' };

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return await this.authHelperService.canAccessAPI(user.userId, obj.module_code, obj.action_code);
    }
}
