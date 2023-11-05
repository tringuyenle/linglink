import { IsNotEmpty } from "class-validator";

export class UpdatePostDTO {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    question: string

    user: string

    createdAt: Date

    updatedAt: Date
}