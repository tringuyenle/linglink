import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'schemas/user.schema';
import { MyJwtGuard } from '../auth/myjwt.guard';
import { GetUser } from './decorator';

@UseGuards(MyJwtGuard)
@Controller('user')
export class UserController {

    @Get('me')
    me(@GetUser() user: User): User {
        
        return user;   
    }
}
