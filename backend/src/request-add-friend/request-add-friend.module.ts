import { Module } from '@nestjs/common';
import { RequestAddFriendController } from './request-add-friend.controller';
import { RequestAddFriendService } from './request-add-friend.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestAddFriendSchema } from 'schemas/request-add-friend.schema';
import { ChatsService } from 'src/chat/chats.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChatRoomSchema } from 'schemas/chatroom.schema';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RequestAddFriend', schema: RequestAddFriendSchema },
      { name: 'ChatRoom', schema: ChatRoomSchema },
      { name: 'User', schema: UserSchema },
    ])
  ],
  controllers: [RequestAddFriendController],
  providers: [RequestAddFriendService, ChatsService, ConfigService, JwtService, UserService]
})
export class RequestAddFriendModule {}
