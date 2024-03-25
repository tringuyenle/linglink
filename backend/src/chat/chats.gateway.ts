import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { WsBadRequestException } from 'src/exceptions/ws-exceptions';
import { ChatsService } from './chats.service';
import { SocketWithAuth } from './types';

@WebSocketGateway({namespace: 'chats',})

export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(ChatsGateway.name);
    constructor(private readonly chatsService: ChatsService) {}

    @WebSocketServer() io: Namespace;
        // Gateway initialized (provided in module and instantiated)
    afterInit(): void {
        this.logger.log(`Websocket Gateway initialized.`);
    }

    handleConnection(client: SocketWithAuth) {
        const sockets = this.io.sockets;

        this.logger.debug(
            `Socket connected with userID: ${client.from_user._id}, chatID: ${client.chatRoomId}, and name: "${client.from_user.name}"`,
        );
        // console.log(client);

        this.logger.log(`WS Client with id: ${client.id} connected!`);
        this.logger.debug(`Number of connected sockets: ${sockets.size}`);

        this.io.emit(client.chatRoomId, `from ${client.from_user.name}`);
    }

    handleDisconnect(client: SocketWithAuth) {
        const sockets = this.io.sockets;

        this.logger.debug(
            `Socket disconnected with userID: ${client.from_user._id}, chatID: ${client.chatRoomId}, and name: "${client.from_user.name}"`,
        );

        this.logger.log(`Disconnected socket id: ${client.id}`);
        this.logger.debug(`Number of connected sockets in chatroom ${client.chatRoomId} is: ${sockets.size}`);

        // TODO - remove client from chat and send `participants_updated` event to remaining clients
    }

    @SubscribeMessage('test')
    async test() {
        throw new WsBadRequestException('error message');
    }
}