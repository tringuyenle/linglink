import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostSchema } from 'schemas/post.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Post', schema: PostSchema}])],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}
