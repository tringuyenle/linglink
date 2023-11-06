import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Post {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    question: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: User;
};

export const PostSchema = SchemaFactory.createForClass(Post);