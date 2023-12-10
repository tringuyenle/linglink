import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

@Schema()
export class FlashcardList extends Document {
    _id: ObjectId;

    @Prop()
    name: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Flashcard' }] })
    flashcards: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'User' })
    author: Types.ObjectId;
}

export const FlashcardListSchema = SchemaFactory.createForClass(FlashcardList);
