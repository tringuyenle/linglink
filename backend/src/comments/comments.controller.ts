import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateCommentDTO } from './dto/createComment.dto';
import { UpdateCommentDTO } from './dto/updateComment.dto';
import { CommentsService } from './comments.service';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    @UseGuards(MyJwtGuard)
    createComment(@Req() req, @Body() createCommentDto: CreateCommentDTO) {
        return this.commentsService.createComment(req.user, createCommentDto);
    }

    @Get(':id')
    getCommentByPostId(@Param('id') post_id: string) {
        return this.commentsService.getCommentsByPostId(post_id);
    }

    // @Get(':id')
    // getCommentByUserId(@Param('id') user_id: string) {
    //     // return this.tagsService.getTagById(user_id);
    // }

    @Put(':id')
    @UseGuards(MyJwtGuard)
    updateCommentById(@Req() req, @Param('id') commentId: string, @Body() updateCommentDto: UpdateCommentDTO) {
        return this.commentsService.updateCommentsById(req.user, commentId, updateCommentDto);
    }

    @Delete(':id')
    @UseGuards(MyJwtGuard)
    removeCommentById(@Req() req, @Param('id') commentId: string) {
        return this.commentsService.removeCommentById(req.user, commentId);
    }

    @Delete('post/:id')
    @UseGuards(MyJwtGuard)
    removeCommentsByPostId(@Req() req, @Param('id') postId: string) {
        return this.commentsService.removeCommentsByPostId(req.user, postId);
    }
}
