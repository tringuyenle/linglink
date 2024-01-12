import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostSchema } from 'schemas/post.schema';
import { TopicSchema } from 'schemas/topic.schema';
import { TopicsService } from 'src/topics/topics.service';
import { QuestionsService } from 'src/questions/questions.service';
import { QuestionSchema } from 'schemas/question.schema';
import { TagsService } from 'src/tags/tags.service';
import { TagSchema } from 'schemas/tag.schema';
import { ReactionsService } from 'src/reactions/reactions.service';
import { ReactionSchema } from 'schemas/reaction.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Post', schema: PostSchema},
            {name: 'Topic', schema: TopicSchema},
            {name: 'Question', schema: QuestionSchema},
            {name: 'Tag', schema: TagSchema},
            {name: 'Reaction', schema: ReactionSchema},
        ]),
    ],
    providers: [PostsService, TopicsService, QuestionsService, TagsService, ReactionsService],
    controllers: [PostsController],
})
export class PostsModule {}
