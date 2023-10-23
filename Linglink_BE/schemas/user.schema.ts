import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop({unique: true})
    email: string;

    @Prop()
    hashedPassword: string;

    @Prop()
    name: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
};

export const UserSchema = SchemaFactory.createForClass(User);