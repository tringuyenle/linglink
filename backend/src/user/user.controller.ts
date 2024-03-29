import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { User } from '../../schemas/user.schema'
import { MyJwtGuard } from '../auth/guard/myjwt.guard'
import { GetUser } from './decorator'

@Controller('user')
export class UserController {
  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: User): User {
    return user
  }
}
