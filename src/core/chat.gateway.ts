import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Socket } from 'socket.io';
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

    handleConnection(client: any, ...args: any[]) {
        this.logger.debug(`Kết nối thành công ${client.client}`)

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

    @SubscribeMessage('message')
    handleMessage(client, text: string) {
        this.logger.debug(`Tin nhắn từ client ${text}`)

        let messageToBroardCast = {
            event: "msgToClient",
            message: `New User say Hello ${text}`
        }

        for (let clientz of this.clients){
            clientz.send(JSON.stringify(messageToBroardCast))
        }

        return {
            event: 'abc',
            data: "lala"
        }
    }

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
        return data;
    }

}
