import { IsEmail, IsNotEmpty } from "class-validator";
import { Post } from "schemas/post.schema";

export class UpdateQuestionDTO {
    @IsNotEmpty()
    QuestionName: string

    postsList: Post[];

    createdAt: Date

    updatedAt: Date
}