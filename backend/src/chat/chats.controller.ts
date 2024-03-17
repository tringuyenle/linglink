import { Controller } from '@nestjs/common';
import { ChatsService } from './chats.service';

//@UseGuards(MyJwtGuard)
@Controller('chats')
export class ChatsController {
    constructor(
        private readonly chatsService: ChatsService,
    ) { }

}
