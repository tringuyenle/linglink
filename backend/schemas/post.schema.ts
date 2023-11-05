import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Post {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    question: string;

    @Prop()
    user: string;
};

export const PostSchema = SchemaFactory.createForClass(Post);