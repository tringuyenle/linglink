import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    hashedPassword: string

    firstName: string

    lastName: string

    createdAt: Date

    updatedAt: Date
}