import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from 'schemas/user.schema';
import { Post } from '../../schemas/post.schema';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

    async create(user: User, postsData: CreatePostDTO) {
        const newPost = await this.postModel.create(postsData);
        newPost.author = user;
        await newPost.save();
        return newPost;
    }

    async getAllPosts() {
        return await this.postModel.find().populate({path: 'user', select: '-hashedPassword'}).exec();
    }

    async getPostById(postId: string) {
        const post = await this.postModel.findOne({ _id: postId }).populate({path: 'user', select: '-hashedPassword'}).exec();
        if (post) {
          return post;
        }
        throw new HttpException('Post with this id does not exist', HttpStatus.NOT_FOUND);
    }

    async update(postId: string ,postsData: UpdatePostDTO) {
        return await this.postModel.findOneAndUpdate({_id: postId} as FilterQuery<Post>, postsData);
    }

    async remove(postId: string) {
        return await this.postModel.deleteOne({_id: postId} as FilterQuery<Post>);
    }
}
