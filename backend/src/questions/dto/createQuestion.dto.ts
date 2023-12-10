import { IsNotEmpty } from "class-validator";
import { Tag } from "schemas/tag.schema";

export class CreateQuestionDTO {
    tagsListId: string[]

    content: string

    answer: string[]

    key: number

    audio_url: string
}