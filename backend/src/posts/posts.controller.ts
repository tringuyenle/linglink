import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { PostsService } from './posts.service';

//@UseGuards(MyJwtGuard)
@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ) {}

    @Post()
    @UseGuards(MyJwtGuard)
    createPost(@Req() req, @Body() createPostDto: CreatePostDTO) {
        return this.postsService.createPost(req.user, createPostDto);
    }

    @Get()
    getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @Get(':id')
    getPostById(@Param('id') id: string) {
        return this.postsService.getPostById(id);
    }

    @Get('topic/:id')
    getPostByTopic(@Param('id') id: string) {
        return this.postsService.getPostByTopic(id);
    }

    @Put(':id')
    @UseGuards(MyJwtGuard)
    updatePostById(@Req() req, @Param('id') id: string, @Body() updatePostDto: UpdatePostDTO) {
        return this.postsService.updatePostById(req.user, id, updatePostDto);
    }

    @Delete(':id')
    @UseGuards(MyJwtGuard)
    removePostById(@Req() req, @Param('id') id: string) {
        return this.postsService.removePostById(req.user, id);
    }
}
