import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostSchema } from 'schemas/post.schema';
import { TopicSchema } from 'schemas/topic.schema';
import { TopicsService } from 'src/topics/topics.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Post', schema: PostSchema},
            {name: 'Topic', schema: TopicSchema}
        ])
    ],
    providers: [PostsService, TopicsService],
    controllers: [PostsController],
})
export class PostsModule {}
