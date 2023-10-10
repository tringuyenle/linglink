import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: String,
    hashedPassword: String,
    firstName: String,
    lastName: String,
    createdAt: Date,
    updatedAt: Date,
});