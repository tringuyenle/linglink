import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { FlashcardListService } from './flashcard-list.service';
import { FlashcardList } from 'schemas/flashcard-list.schema';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';
import { CreateFlashcardListDto } from './dto/create-flashcard-list.dto';

@Controller('flashcard-list')
export class FlashcardListController {
    constructor(private readonly flashcardListService: FlashcardListService) { }

    @Post()
    @UseGuards(MyJwtGuard)
    createFlashcardList(@Req() req, @Body() createFlashcardListDto: CreateFlashcardListDto) {
        return this.flashcardListService.createFlashcardList(req.user, createFlashcardListDto);
    }
    @Get()
    findAll(): Promise<FlashcardList[]> {
        return this.flashcardListService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<FlashcardList> {
        return this.flashcardListService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateFlashcardListDto: Partial<FlashcardList>): Promise<FlashcardList> {
        return this.flashcardListService.update(id, updateFlashcardListDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<FlashcardList> {
        return this.flashcardListService.remove(id);
    }
    @Get('user')
    @UseGuards(MyJwtGuard) // Sử dụng MyJwtGuard để bảo vệ phương thức
    getFlashCardList(@Req() req): Promise<FlashcardList[]> {
        return this.flashcardListService.getFlashCardListByUserId(req.user);
    }

}
