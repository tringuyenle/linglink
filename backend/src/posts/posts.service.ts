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

    async createPost(user: User, postsData: CreatePostDTO) {
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

    async updatePostById(user: User, postId: string ,postsData: UpdatePostDTO) {
        const currentPost = await this.getPostById(postId);
        if (user.email === currentPost.author.email) {
            return await this.postModel.findOneAndUpdate({_id: postId} as FilterQuery<Post>, postsData, { new: true });
        }
        return new HttpException('The post has been updated by the author', HttpStatus.UNAUTHORIZED)
    }

    async removePostById(user: User, postId: string) {
        const currentPost = await this.getPostById(postId);
        if (user.email === currentPost.author.email) {
            return await this.postModel.deleteOne({_id: postId} as FilterQuery<Post>);
        }
        return new HttpException('The post has been updated by the author', HttpStatus.UNAUTHORIZED)
    }
}
