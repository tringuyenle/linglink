import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
    
    async getByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email }).exec();
        if (user) {
          return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }
     
    async create(userData: CreateUserDTO) {
        const newUser = await this.userModel.create(userData);
        await newUser.save();
        return newUser;
    }
}
