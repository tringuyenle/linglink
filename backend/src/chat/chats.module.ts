import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatSchema } from '../../schemas/chat.schema';
import { TopicsService } from '../topics/topics.service';
import { QuestionsService } from '../questions/questions.service';
import { TagsService } from '../tags/tags.service';
import { ReactionsService } from '../reactions/reactions.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Chat', schema: ChatSchema},
        ]),
    ],
    providers: [ChatsService],
    controllers: [ChatsController],
})
export class ChatsModule {}
