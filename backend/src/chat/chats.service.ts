import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from 'schemas/chat.schema';

@Injectable()
export class ChatsService {
    constructor(
        @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    ) {}

}
