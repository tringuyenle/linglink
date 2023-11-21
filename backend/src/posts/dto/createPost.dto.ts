import { IsNotEmpty } from "class-validator";
import { Question } from "schemas/question.schema";
import { CreateQuestionDTO } from "src/questions/dto/createQuestion.dto";

export class CreatePostDTO {
    topicID: string;

    @IsNotEmpty()
    content: string;

    question: string;
    
    newQuestion: CreateQuestionDTO;

    img_url: string;

    audio_url: string;
}