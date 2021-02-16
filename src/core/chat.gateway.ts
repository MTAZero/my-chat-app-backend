import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(3001)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection {
    
    private logger = new Logger(ChatGateway.name)

    afterInit(server: any) {
        this.logger.debug(" Khởi tạo gateway thành công")
    }

    handleConnection(client: any, ...args: any[]) {
        this.logger.debug("Kết nối thành công ")
    }

    @SubscribeMessage('message')
    handleMessage(client: any, text: string): string {
        this.logger.debug(`Tin nhắn từ client ${text}`)
        return 'Hello world!';
    }

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
        return data;
    }

}
