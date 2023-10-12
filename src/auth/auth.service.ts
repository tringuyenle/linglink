import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { AuthDTO } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

@Injectable({})
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
    
    async register(authDTO: AuthDTO) {
        //generate password to hashedpassword
        const hashedPassword = await argon.hash(authDTO.hashedPassword);
        //insert data into database
        const newUser = new this.userModel({
            email: authDTO.email,
            hashedPassword: hashedPassword,
            firstName: authDTO.firstName,
            lastName: authDTO.lastName,
            createdAt: new Date,
            updatedAt: new Date,
        });
        return await newUser.save();
    }

    login() {
        return {
            message: 'hello login already',
        }
    }
}
