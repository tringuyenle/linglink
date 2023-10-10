import { Document } from "mongoose";

export interface IUser extends Document {
    readonly email: string,
    readonly hashedPassword: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
}