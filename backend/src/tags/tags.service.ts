import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from 'schemas/tag.schema';
import { CreateTagDTO } from './dto/createTag.dto';

@Injectable()
export class TagsService {
    constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {}
    
    async createTag(createTagDto: CreateTagDTO): Promise<Tag> {
        const createdTag = new this.tagModel(createTagDto);
        return createdTag.save();
    }
    
    async getAllTags(): Promise<Tag[]> {
        return this.tagModel.find().exec();
    }
    
    async getTagById(id: string): Promise<Tag> {
        return this.tagModel.findById(id).exec();
    }
    
    async updateTagById(id: string, updateTagDto: CreateTagDTO): Promise<Tag> {
        return this.tagModel.findByIdAndUpdate(id, updateTagDto, { new: true }).exec();
    }
    
    async removeTagById(id: string): Promise<Tag> {
        return this.tagModel.findByIdAndRemove(id).exec();
    }
}
