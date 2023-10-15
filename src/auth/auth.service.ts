import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { RegisterDTO } from './dto';
import { UserService } from '../user/user.service';
import { LogInDTO } from './dto/login.dto';

@Injectable({})
export class AuthService {
    constructor(private readonly userService: UserService) {}
    
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
            createdUser.hashedPassword = undefined;
            return createdUser;
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
            return user; 
        } catch(error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }
}
