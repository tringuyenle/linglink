import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { User } from 'schemas/user.schema';
import { Post } from '../../schemas/post.schema';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { TopicsService } from '../topics/topics.service';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('Post') private readonly postModel: Model<Post>,
        private readonly topicsService: TopicsService,
        private readonly questionsService: QuestionsService,
    ) {}

    async createPost(user: User, postsData: CreatePostDTO) {
        try {
            const topic = await this.topicsService.getTopicById(postsData.topicID);
            if (!topic) {
                throw new NotFoundException('Topic not found');
            }
            let question = null;
            if (postsData.question) {
                question = new Types.ObjectId(postsData.question);
            } else if (postsData.newQuestion) {
                question = await this.questionsService.createQuestion(postsData.newQuestion);
            }

            const newPost = await this.postModel.create({
                ...postsData,
                author: user,
                topic: topic,
                question: question,
                createAt: Date.now()
            });

            await newPost.save();

            if (topic) {
                await this.topicsService.addNewPostIntoTopicById(postsData.topicID, newPost);
            }

            return newPost;
        } catch (error) {
            // Trả về lỗi cho người dùng
            throw new HttpException('Failed to create post', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllPosts() {
        return await this.postModel.find().populate({ path: 'author', select: '-hashedPassword' }).exec();
    }

    async getPostById(postId: string) {
        const post = await this.postModel.findById(postId).populate({ path: 'author', select: '-hashedPassword' }).exec();
        if (post) {
            return post;
        }
        throw new HttpException('Post with this id does not exist', HttpStatus.NOT_FOUND);
    }

    async getPostByTopic(topicId: string) {
        const topic = await this.topicsService.getTopicById(topicId);
        if (topic) {
            return topic.postsList;
        }
        throw new HttpException('Post with this id does not exist', HttpStatus.NOT_FOUND);
    }

    async updatePostById(user: User, postId: string, postsData: UpdatePostDTO) {
        const currentPost = await this.getPostById(postId);
        if (user.email === currentPost.author.email) {
            return await this.postModel.findOneAndUpdate({ _id: postId } as FilterQuery<Post>, postsData, { new: true });
        }
        return new HttpException('The post has been updated by the author', HttpStatus.UNAUTHORIZED)
    }

    async removePostById(user: User, postId: string) {
        const currentPost = await this.getPostById(postId);
        if (user.email === currentPost.author.email) {
            await this.topicsService.deletePostInTopicById(currentPost.topic.toString(), currentPost);
            return await this.postModel.deleteOne({ _id: postId } as FilterQuery<Post>);
        }
        return new HttpException('The post has been deleted by the author', HttpStatus.UNAUTHORIZED)
    }
    async getAllPostsByPage(lastPostId: string, pageSize: number): Promise<Post[]> {
        let query = {};

        if (lastPostId) {
            // Nếu có lastPostId, thêm điều kiện lọc để chỉ lấy bài viết có _id nhỏ hơn lastPostId
            query['_id'] = { $lt: lastPostId };
        }

        const posts = await this.postModel
            .find(query)
            .sort({ _id: -1 })
            .limit(pageSize)
            .populate('author')
            .populate('question')
            .populate('topic')
            .exec();

        return posts;
    }

    async changeNumComments(post: Post, changedCommentCount: number) {
        try {
            // Increment the numComments field
            const newNumComments = post.numComments + changedCommentCount;

            // Use findOneAndUpdate to update the document
            const updatedPost = await this.postModel.findOneAndUpdate(
                { _id: post._id } as FilterQuery<Post>,
                { $set: { numComments: newNumComments } },
                { new: true }
            );

            return updatedPost;
        } catch (error) {
            // Handle errors
            console.error('Error updating post:', error);
            throw error;
        }
    }
}
