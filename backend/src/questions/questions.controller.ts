import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateQuestionDTO } from './dto/createQuestion.dto';
import { UpdateQuestionDTO } from './dto/updateQuestion.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Post()
    createQuestion(@Body() createQuestionDto: CreateQuestionDTO) {
        return this.questionsService.createQuestion(createQuestionDto);
    }

    @Get()
    getAllQuestions() {
        return this.questionsService.getAllQuestions();
    }

    @Get(':id')
    getQuestionById(@Param('id') id: string) {
        return this.questionsService.getQuestionById(id);
    }

    @Put(':id')
    updateQuestionById(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDTO) {
        return this.questionsService.updateQuestionById(id, updateQuestionDto);
    }

    @Delete(':id')
    removeQuestionById(@Param('id') id: string) {
        return this.questionsService.removeQuestionById(id);
    }
}
