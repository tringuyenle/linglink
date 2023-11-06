import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/myjwt.guard';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { PostsService } from './posts.service';

//@UseGuards(MyJwtGuard)
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @UseGuards(MyJwtGuard)
    create(@Req() req, @Body() createPostDto: CreatePostDTO) {
        return this.postsService.create(req.user, createPostDto);
    }

    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    getPostById(@Param() id: string) {
        return this.postsService.getPostById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDTO) {
        return this.postsService.update(+id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
