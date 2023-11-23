import { IsNotEmpty } from "class-validator";
import { Tag } from "schemas/tag.schema";

export class CreateQuestionDTO {
    tagsListId: string[]

    content: string

    answer: string[]

    rightAnswer: string[]

    img_url: string

    audio_url: string
}