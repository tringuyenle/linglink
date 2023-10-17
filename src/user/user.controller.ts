import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { User } from 'schemas/user.schema';
import { GetUser } from './decorator';

@Controller('user')
export class UserController {

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    me(@GetUser() user: User) {
        
        return user;   
    }
}
