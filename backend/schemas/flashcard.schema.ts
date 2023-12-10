// flashcard/schemas/flashcard.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

@Schema()
export class Flashcard extends Document {
    _id: ObjectId;

    @Prop()
    word: string;

    @Prop()
    answer: string;

    @Prop()
    date: Date;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    author: Types.ObjectId;
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);
