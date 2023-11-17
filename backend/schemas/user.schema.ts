import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '../src/common/enums/user.enum';
import { TargetTypes } from '../src/common/enums/target.enum';

export class Target {
    targetType: TargetTypes;

    targetScore: number;

    currentScore: { type: number, default: 0 };

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
