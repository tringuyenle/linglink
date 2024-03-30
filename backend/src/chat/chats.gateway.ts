import { Logger, UseFilters } from '@nestjs/common'
import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Message } from 'schemas/message.schema';
import { Namespace } from 'socket.io';
import { WsCatchAllFilter } from 'src/exceptions/ws-catch-all-filter';
import { WsBadRequestException } from 'src/exceptions/ws-exceptions';
import { ChatsService } from './chats.service';
import { CreateMessageDTO } from './dto/createMessage.dto';
import { SocketWithAuth } from './types';

@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({namespace: 'chats',})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(ChatsGateway.name);
    constructor(private readonly chatsService: ChatsService) {}

    @WebSocketServer() io: Namespace;
        // Gateway initialized (provided in module and instantiated)
    afterInit(): void {
        this.logger.log(`Websocket Gateway initialized.`);
    }

    async handleConnection(client: SocketWithAuth) {
        const sockets = this.io.sockets;

        this.logger.debug(
            `Socket connected with userID: ${client.from_user._id}, chatID: ${client.chatRoomId}, and name: "${client.from_user.name}"`,
        );
        // console.log(client);

        this.logger.log(`WS Client with id: ${client.id} connected!`);
        this.logger.debug(`Number of connected sockets: ${sockets.size}`);

        await client.join(client.chatRoomId);
        this.io.to(client.chatRoomId).emit('enter-chat-room', `from ${client.from_user.name}`);
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

    @SubscribeMessage('chat')
    async nominate(
        @MessageBody() message: CreateMessageDTO,
        @ConnectedSocket() client: SocketWithAuth,
    ): Promise<void> {
        this.logger.debug(
          `Attempting to add chat from user ${client.from_user._id} to room ${client.chatRoomId}\n${message.content}`,
        );

        const newMessage = {
            content: message.content,
            imgs_url: message.imgs_url,
            from: client.from_user,
            chatRoomId: client.chatRoomId
        }
    
        this.io.to(client.chatRoomId).emit('chat', newMessage);
    }
}
