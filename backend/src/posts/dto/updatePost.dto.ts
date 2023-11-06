import { IsNotEmpty } from "class-validator";
import { User } from "schemas/user.schema";

export class UpdatePostDTO {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    question: string

    user: User

    createdAt: Date

    updatedAt: Date
}