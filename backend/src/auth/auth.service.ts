import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
            });
                
            return this.generateTokens({
                userId: createdUser.id
            }); 
          } catch (error) {
            if (error.code == "11000") {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(loginData: LogInDTO) {
        try {
            const user = await this.userService.getByUserEmail(loginData.email);
            const isPasswordMatching = await argon.verify(user.hashedPassword, loginData.password);
            if (!isPasswordMatching) {
                throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
            }
            return this.generateTokens({
                userId: user.id
            }); 
        } catch(error) {
            return error;
        }
    }

    async generateTokens(payload: { userId: string }): Promise<Token> {
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(payload),
            this.generateRefreshToken(payload)
        ]);

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    async generateAccessToken(payload: { userId: string }): Promise<string> {
        const securityConfig = this.configService.get<SecurityConfig>('security');
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: securityConfig.expiresIn,
        });
    }

    async generateRefreshToken(payload: { userId: string }): Promise<string> {
        const securityConfig = this.configService.get<SecurityConfig>('security');
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: securityConfig.refreshIn,
        });
    }

    async refreshToken(token: string) {
        try {
            const { userId } = await this.jwtService.verifyAsync(token, {
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
