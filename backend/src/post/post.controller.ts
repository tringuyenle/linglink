import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from 'schemas/user.schema';
import { MyJwtGuard } from '../auth/myjwt.guard';

@UseGuards(MyJwtGuard)
@Controller('post')
export class UserController {

    @Get('me')
    me(@Req() post): User {
        
        return post;   
    }
}
