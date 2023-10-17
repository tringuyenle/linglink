import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { RegisterDTO } from './dto';
import { UserService } from '../user/user.service';
import { LogInDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
        ) {}
    
    async register(registrationData: RegisterDTO) {
        //generate password to hashedpassword
        const hashedPassword = await argon.hash(registrationData.hashedPassword);
        
        try {
            //insert data into database
            const createdUser = await this.userService.create({
              ...registrationData,
              hashedPassword: hashedPassword,
              createdAt: new Date,
              updatedAt: new Date,
            });
                
            return await this.signJwtToken(createdUser.id, createdUser.email); 
          } catch (error) {
            if (error.code == "11000") {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(loginData: LogInDTO) {
        try {
            const user = await this.userService.getByEmail(loginData.email);
            const isPasswordMatching = await argon.verify(user.hashedPassword, loginData.password);
            if (!isPasswordMatching) {
                throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
            }
            user.hashedPassword = undefined;
            return await this.signJwtToken(user.id, user.email); 
        } catch(error) {
            return error;
        }
    }

    async signJwtToken(userId: string, email: string): Promise<{accessToken: string}> {
        const payload = {
            sub: userId,
            email
        }
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '50m',
            secret: this.configService.get('JWT_SECRET')
        })
        return {
            accessToken: jwtString,
        };
    }
}
