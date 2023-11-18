import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Question } from './question.schema';
import { Topic } from './topic.schema';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Post {
    @Prop({ type: Types.ObjectId, ref: 'Topic' })
    topic: Topic;

    @Prop()
    content: string;

    @Prop()
    question: Question;

    @Prop()
    img_url: string;

    @Prop({ default: 0 })
    upVotes: number;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    upVotesList: User[];

    @Prop({ default: 0 })
    downVotes: number;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    downVotesList: User[];

    @Prop({ type: Types.ObjectId, ref: 'User' })
    author: User;
};

export const PostSchema = SchemaFactory.createForClass(Post);