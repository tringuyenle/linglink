import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop()
    email: string;

    @Prop()
    hashedPassword: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
};

export const UserSchema = SchemaFactory.createForClass(User);