import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '../src/user/enums/user.enum';
import { TargetTypes } from '../src/user/enums/target.enum';

export class Target {
    targetType: TargetTypes;

    targetPoint: number;

    targetDate: Date;
};

@Schema({ timestamps: true })
export class User {
    @Prop({unique: true})
    email: string;

    @Prop()
    hashedPassword: string;

    @Prop()
    name: string;

    @Prop()
    role: UserRoles;

    @Prop()
    target: Target;
};

export const UserSchema = SchemaFactory.createForClass(User);
