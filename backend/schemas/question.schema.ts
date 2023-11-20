import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Tag } from './tag.schema';

@Schema({ timestamps: true })
export class Question {
    // @Prop()
    // questionName: string;
    _id: ObjectId;

    @Prop({ type: [Types.ObjectId], ref: 'Tag' })
    tagsList: Tag[];

    @Prop()
    content: string;

    @Prop()
    answer: string[];

    @Prop()
    rightAnswer: string[];

    @Prop()
    img_url: string;

    @Prop()
    audio_url: string;
};

export const QuestionSchema = SchemaFactory.createForClass(Question);