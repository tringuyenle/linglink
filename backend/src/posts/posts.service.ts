import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schema';
import { Post } from '../../schemas/post.schema';
import { CreatePostDTO } from './dto/createPost.dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

    async create(user: User, postsData: CreatePostDTO) {
        const newPost = await this.postModel.create(postsData);
        newPost.user = user;
        await newPost.save();
        return newPost;
    }

    async findAll() {}

    async getPostById(_id: string) {
        const post = await this.postModel.findOne({ _id: _id }).exec();
        if (post) {
          return post;
        }
        throw new HttpException('Post with this id does not exist', HttpStatus.NOT_FOUND);
    }

    async update(idData: number ,postsData: CreatePostDTO) {}

    async remove(idData: number) {}
}
