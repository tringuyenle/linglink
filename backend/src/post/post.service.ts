import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { CreatePostDTO } from './dto/createPost.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async create(postData: CreatePostDTO) {
        const newUser = await this.userModel.create(postData);
        await newUser.save();
        return newUser;
    }
}
