import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schemas/user.schema';
import { UserService } from './post.service';
import { UserController } from './post.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
