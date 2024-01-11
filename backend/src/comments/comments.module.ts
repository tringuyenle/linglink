import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from '../../schemas/comment.schema';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostSchema } from 'schemas/post.schema';
import { PostsService } from 'src/posts/posts.service';
import { TopicsService } from 'src/topics/topics.service';
import { QuestionsService } from 'src/questions/questions.service';
import { TagsService } from 'src/tags/tags.service';
import { TopicSchema } from 'schemas/topic.schema';
import { QuestionSchema } from 'schemas/question.schema';
import { TagSchema } from 'schemas/tag.schema';
import { ReactionsService } from 'src/reactions/reactions.service';
import { ReactionSchema } from 'schemas/reaction.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Comment', schema: CommentSchema}, 
            {name: 'Post', schema: PostSchema},
            {name: 'Topic', schema: TopicSchema},
            {name: 'Question', schema: QuestionSchema},
            {name: 'Tag', schema: TagSchema},
            {name: 'Reaction', schema: ReactionSchema}
        ])
    ],
    providers: [CommentsService, PostsService, TopicsService, QuestionsService, TagsService, ReactionsService],
    controllers: [CommentsController],
})
export class CommentsModule {}
