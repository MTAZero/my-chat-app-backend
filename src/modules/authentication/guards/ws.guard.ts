import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { throws } from 'assert';
import { stringify } from 'querystring';
import { Socket } from 'socket.io';
import { AuthenticationService } from 'src/modules/database/services/authentication.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
    private logger: Logger = new Logger(WsJwtGuard.name);

    constructor(private authService: AuthenticationService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const client: any = context.switchToWs().getClient<Socket>();
            const authToken = client._protocol;
            const user = await this.authService.verifyToken(authToken);

            context.switchToWs().getClient().user = user;

            return Boolean(user);
        } catch (err) {
            throw new WsException(err.message);
        }
    }
}
