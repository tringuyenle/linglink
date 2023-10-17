import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { UserSchema } from '../../schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, UserService, ConfigService, JwtStrategy]
})
export class AuthModule {}
