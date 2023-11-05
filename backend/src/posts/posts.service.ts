import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { CreatePostDTO } from './dto/createPost.dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Post') private readonly userModel: Model<User>) {}

    async create(postsData: CreatePostDTO) {
        const newPost = await this.userModel.create(postsData);
        await newPost.save();
        return newPost;
    }

    async findAll() {}

    async findOne(id: number) {}

    async update(idData: number ,postsData: CreatePostDTO) {}

    async remove(idData: number) {}

    
}
