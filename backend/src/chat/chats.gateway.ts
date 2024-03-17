import { Logger } from '@nestjs/common';
import {
    OnGatewayInit,
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { ChatsService } from './chats.service';

@WebSocketGateway({ namespace: 'chats' })
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    private readonly logger = new Logger(ChatsGateway.name);
    constructor(private readonly chatsService: ChatsService) {}

@WebSocketServer() io: Namespace;

// Gateway initialized (provided in module and instantiated)
afterInit(): void {
    this.logger.log(`Websocket Gateway initialized.`);
}

handleConnection(client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`WS Client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);

    this.io.emit('hello', `from ${client.id}`);
}

handleDisconnect(client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`Disconnected socket id: ${client.id}`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);

    // TODO - remove client from poll and send `participants_updated` event to remaining clients
}
}