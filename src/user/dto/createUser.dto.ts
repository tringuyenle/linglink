import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    hashedPassword: string

    name: string

    createdAt: Date

    updatedAt: Date
}