import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';
import { ReactionsService } from './reactions.service';

@Controller('reactions')
export class ReactionsController {
    constructor(private readonly reactionsService: ReactionsService) {}

    @Post('/likepost/:id')
    @UseGuards(MyJwtGuard)
    likePost(@Req() req, @Param('id') postId: string) {
        return this.reactionsService.likePost(req.user, postId);
    }

    @Post('/dislikepost/:id')
    @UseGuards(MyJwtGuard)
    dislikePost(@Req() req, @Param('id') postId: string) {
        return this.reactionsService.dislikePost(req.user, postId);
    }

    @Post('/likecomment/:id')
    @UseGuards(MyJwtGuard)
    likeComment(@Req() req, @Param('id') commentId: string) {
        return this.reactionsService.likeComment(req.user, commentId);
    }

    @Post('/dislikecomment/:id')
    @UseGuards(MyJwtGuard)
    dislikeComment(@Req() req, @Param('id') commentId: string) {
        return this.reactionsService.dislikeComment(req.user, commentId);
    }

    @Get('/post/:id')
    getReactionByPostId(@Param('id') post_id: string) {
        return this.reactionsService.getReactionByPostId(post_id);
    }

    @Get('/comment/:id')
    getReactionByCommentId(@Param('id') comment_id: string) {
        return this.reactionsService.getReactionByCommentId(comment_id);
    }
}
