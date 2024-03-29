import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Message } from 'schemas/message.schema'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
    private readonly authService: AuthService
  ) {}
}
