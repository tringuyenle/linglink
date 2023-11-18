import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic } from 'schemas/topic.schema';
import { CreateTopicDTO } from './dto/createTopic.dto';

@Injectable()
export class TopicsService {
    constructor(@InjectModel('Topic') private readonly topicModel: Model<Topic>) {}
    
    async createTopic(createTopicDto: CreateTopicDTO): Promise<Topic> {
        const createdTopic = new this.topicModel(createTopicDto);
        return createdTopic.save();
    }
    
    async getAllTopics(): Promise<Topic[]> {
        return this.topicModel.find().exec();
    }
    
    async getTopicById(id: string): Promise<Topic> {
        return this.topicModel.findById(id).exec();
    }
    
    async updateTopicById(id: string, updateTopicDto: CreateTopicDTO): Promise<Topic> {
        return this.topicModel.findByIdAndUpdate(id, updateTopicDto, { new: true }).exec();
    }
    
    async removeTopicById(id: string): Promise<Topic> {
        return this.topicModel.findByIdAndRemove(id).exec();
    }
}
