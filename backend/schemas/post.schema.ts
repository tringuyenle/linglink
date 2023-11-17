import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Post {
    @Prop()
    topic: string;

    @Prop()
    content: string;

    @Prop()
    question: string;

    @Prop()
    img_url: string;

    @Prop()
    upVotes: number;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    upVotesList: User[];

    @Prop()
    downVotes: number;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    downVotesList: User[];

    @Prop({ type: Types.ObjectId, ref: 'User' })
    author: User;
};

export const PostSchema = SchemaFactory.createForClass(Post);