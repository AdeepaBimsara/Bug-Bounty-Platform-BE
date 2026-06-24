import { Schema,Document,model } from "mongoose";

export enum UserRole{
    ADMIN = 'ADMIN',
    RESEARCHER = 'RESEARCHER',
    COMPANY = 'COMPANY'
}

export interface IUser extends Document{
    role: UserRole
    fullName: string
    email: string
    password: string
}

const userSchema = new Schema<IUser>(
    {
        role:{
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.RESEARCHER
        },

        fullName: {
            type: String, 
            required: true
        },

        email: {
            type: String,
             required: true
        },

        password: {
            type: String,
             required: true}
    },
    {
        timestamps: true
    }
) 

export const UserModel = model<IUser>("user",userSchema)