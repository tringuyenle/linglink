import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Chat {
    _id: ObjectId;

    @Prop()
    content: string;

    @Prop()
    imgs_url: [string];

    @Prop({ type: Types.ObjectId, ref: 'User' })
    from: User;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    to: User;
};

export const ChatSchema = SchemaFactory.createForClass(Chat);