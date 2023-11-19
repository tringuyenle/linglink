import { IsNotEmpty } from "class-validator";
import { Question } from "schemas/question.schema";

export class CreatePostDTO {
    topicID: string;

    @IsNotEmpty()
    content: string;

    question: Question;

    img_url: string;

    audio_url: string;
}