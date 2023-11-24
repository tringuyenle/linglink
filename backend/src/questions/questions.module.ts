import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from '../../schemas/Question.schema';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TagsService } from 'src/tags/tags.service';
import { TagSchema } from 'schemas/tag.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Question', schema: QuestionSchema},
            {name: 'Tag', schema: TagSchema}
        ]),
    ],
    providers: [QuestionsService, TagsService],
    controllers: [QuestionsController],
})
export class QuestionsModule {}
