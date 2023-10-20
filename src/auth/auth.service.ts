import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon from 'argon2';
import { RegisterDTO } from './dto';
import { UserService } from '../user/user.service';
import { LogInDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Token } from './models/token.model';
import { SecurityConfig } from '../common/configs/config.interface';

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
                
            return this.generateTokens(createdUser.id); 
          } catch (error) {
            return error.message;
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
            return this.generateTokens(user.id); 
        } catch(error) {
            return error;
        }
    }

    // async signJwtToken(userId: string, email: string): Promise<{accessToken: string, refreshToken: string}> {
    //     const payload = {
    //         sub: userId,
    //         email
    //     }
    //     const securityConfig = this.configService.get<SecurityConfig>('security');
    //     const jwtString = await this.jwtService.signAsync(payload, {
    //         expiresIn: securityConfig.expiresIn,
    //         secret: this.configService.get('JWT_SECRET')
    //     })
    //     return {
    //         accessToken: jwtString,
    //         refreshToken: jwtString,
    //     };
    // }

    async generateTokens(payload: { userId: string }): Promise<{accessToken: string, refreshToken: string}> {
            const accessToken = await this.generateAccessToken(payload);
            const refreshToken = await this.generateRefreshToken(payload);

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    async generateAccessToken(payload: { userId: string }): Promise<string> {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '15m',
        });
    }

    async generateRefreshToken(payload: { userId: string }): Promise<string> {
        // const securityConfig = this.configService.get<SecurityConfig>('security');
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: '30m',
        });
    }

    async refreshToken(token: string) {
        try {
            const { userId } = this.jwtService.verify(token, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });

        return this.generateTokens({
            userId,
        });
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
