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

    @Get('post/:id')
    getCommentByPostId(@Param('id') postId: string, @Param('userId') userId: string = null) {
        return this.commentsService.getCommentsWithReactByPostId(postId, userId);
    }

    @Get(':id')
    getCommentByCommentId(@Param('id') commentId: string, @Param('userId') userId: string = null) {
        return this.commentsService.getCommentsWithReactByCommentId(commentId, userId);
    }

    // @Get(':id')
    // getCommentByUserId(@Param('id') userId: string) {
    //     // return this.tagsService.getTagById(userId);
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
