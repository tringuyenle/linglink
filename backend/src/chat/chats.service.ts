import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom } from 'schemas/chatroom.schema';
import { Message } from 'schemas/message.schema';
import { User } from 'schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { CreateChatRoomDTO } from './dto/createChatRoom.dto';

@Injectable()
export class ChatsService {
    constructor(
        @InjectModel('Message') private readonly messageModel: Model<Message>,
        @InjectModel('ChatRoom') private readonly chatRoomModel: Model<ChatRoom>,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async createChatRoom(chat_from_user: User, createChatRoom: CreateChatRoomDTO) {
        const chat_to_user = await this.userService.getByUserEmail(createChatRoom.email);

        if (!chat_to_user) {
            throw new NotFoundException('Recipient not found');
        }

        try {
            const chatRoomId_from_user = chat_from_user._id.toString() + '--' + chat_to_user._id.toString();
            const chatRoomId_to_user = chat_to_user._id.toString() + '--' + chat_from_user._id.toString();
            let chatRoom = await this.chatRoomModel.findOne({chatRoomId: { $in: [chatRoomId_from_user, chatRoomId_to_user]}});

            if (!chatRoom) {
                chatRoom = await this.chatRoomModel.create({
                    chatRoomId: chatRoomId_to_user,
                    name: createChatRoom.name,
                    participant: [chat_from_user._id, chat_to_user._id],
                    createAt: Date.now()
                });
                await chatRoom.save();
            }
            
            const token = await this.jwtService.signAsync({
                chatRoomId: chatRoom.chatRoomId, 
                from_user: chat_from_user}, 
            {secret: this.configService.get('JWT_SOCKET_SECRET'),})

            return {
                token,
                chatRoom
            }
        } catch (err) {
            throw new HttpException('Failed to create chat room', HttpStatus.INTERNAL_SERVER_ERROR);
        };
    }
}
