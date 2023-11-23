import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    hashedPassword: string

    name: string
    
    avatar: string

    role: string

    createdAt: Date

    updatedAt: Date
}