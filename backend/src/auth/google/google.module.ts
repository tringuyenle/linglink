import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../schemas/user.schema';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { GoogleStrategy } from '../strategy/google.strategy';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import config from '../../common/configs/config';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        JwtModule.register({}),
        ConfigModule.forRoot({load: [config],}),
    ],
    controllers: [GoogleController],
    providers: [GoogleService, GoogleStrategy, UserService, AuthService]
})
export class GoogleModule {}
