import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { MessageSchema } from '../../schemas/message.schema';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ReserPasswordTokenSchema } from 'schemas/reset-password-token.schema';
import { UserSchema } from 'schemas/user.schema';
import { ChatsGateway } from './chats.gateway';
import { ChatRoomSchema } from 'schemas/chatroom.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'User', schema: UserSchema},
            {name: 'Message', schema: MessageSchema},
            {name: 'ChatRoom', schema: ChatRoomSchema},
            {name: 'ReserPasswordToken', schema: ReserPasswordTokenSchema },
        ]),
    ],
    providers: [ChatsService, AuthService, UserService, JwtService, ConfigService, ChatsGateway],
    controllers: [ChatsController],
})
export class ChatsModule {}
