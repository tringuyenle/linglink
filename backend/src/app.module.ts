import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { TopicsModule } from './topics/topics.module';
import { TagsModule } from './tags/tags.module';
import { QuestionsModule } from './questions/questions.module';
import { FlashcardListModule } from './flashcard-list/flashcard-list.module';
import { FlashcardModule } from './flashcards/flashcards.module';
import { CommentsModule } from './comments/comments.module';
require("dotenv").config();

@Module({
  imports: 
  [
    MongooseModule.forRoot(process.env.DB_URL), 
    AuthModule, UserModule, PostsModule, 
    TopicsModule, TagsModule, QuestionsModule, 
    FlashcardListModule, FlashcardModule, CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
