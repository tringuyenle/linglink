import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';
import { ChatsService } from './chats.service';
import { CreateChatRoomDTO } from './dto/createChatRoom.dto';

//@UseGuards(MyJwtGuard)
@Controller('chats')
export class ChatsController {
    constructor(
        private readonly chatsService: ChatsService,
    ) { }

    @Post('create-chat-room')
    @UseGuards(MyJwtGuard)
    async createChatRoom(@Req() req, @Body() createChatRoomDto: CreateChatRoomDTO) {
        return await this.chatsService.createChatRoom(req.user, createChatRoomDto)
    }
}
