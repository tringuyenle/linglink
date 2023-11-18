import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTopicDTO } from './dto/createTopic.dto';
import { UpdateTopicDTO } from './dto/updateTopic.dto';
import { TopicsService } from './topics.service';

@Controller('topics')
export class TopicsController {
    constructor(private readonly topicsService: TopicsService) {}

    @Post()
    createTopic(@Body() createTopicDto: CreateTopicDTO) {
        return this.topicsService.createTopic(createTopicDto);
    }

    @Get()
    getAllTopics() {
        return this.topicsService.getAllTopics();
    }

    @Get(':id')
    getTopicById(@Param('id') id: string) {
        return this.topicsService.getTopicById(id);
    }

    @Put(':id')
    updateTopicById(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDTO) {
        return this.topicsService.updateTopicById(id, updateTopicDto);
    }

    @Delete(':id')
    removeTopicById(@Param('id') id: string) {
        return this.topicsService.removeTopicById(id);
    }
}
