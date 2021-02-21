import { ExecutionContext, Logger, UseGuards } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { stringify } from 'querystring';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/modules/authentication/guards/jwt-auth.guard';
import { WsJwtGuard } from 'src/modules/authentication/guards/ws.guard';
import { Server } from "ws";

@WebSocketGateway(3001)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger = new Logger(ChatGateway.name)

    @WebSocketServer() server: Server;
    users: number = 0;
    clients = [];

    afterInit(server: any) {
        this.logger.debug(" Khởi tạo gateway thành công")
    }

    @UseGuards(WsJwtGuard)
    handleConnection(client: any, ...args: any[]) {
        this.logger.debug(`Kết nối thành công ${stringify(client)}`)

        let id = new Date().getTime();

        this.users++;
        this.server.emit("users", this.users);

        console.log("connected users : ", this.users);

        this.clients.push(client);
    }

    handleDisconnect(client: any) {
        this.users--;

        this.logger.debug(`Client đã ngăt kết nối ${client.id}`)
        this.server.emit("users", this.users)
    }

    @UseGuards(WsJwtGuard)
    @SubscribeMessage('message')
    handleMessage(client, data: any) {
        let user = client.user

        console.log(`client : ${stringify(user)}`)

        data = {
            ...data,
            ...{
                from: user.fullname
            }
        }

        let messageToBroardCast = {
            event: "msgToClient",
            data
        }

        for (let clientz of this.clients){
            clientz.send(JSON.stringify(messageToBroardCast))
        }
    }

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
        return data;
    }

}
