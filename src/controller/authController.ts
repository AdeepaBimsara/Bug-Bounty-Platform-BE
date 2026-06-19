import { Request, Response } from "express"
import {UserModel, UserRole} from "../models/userModel"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"


dotenv.config()

export const registerUser = async (req: Request, res: Response) => {
    try{
        const {role,fullName,email,password} = req.body

        const exUser = await UserModel.findOne({email: email})

        if(exUser){
            return res.status(400).json({message: "user already exits"})
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt)

        const newUser = new UserModel({
            roles: [UserRole.RESEARCHER],
            fullName,
            email,
            password: hashedPassword
        })

        await newUser.save()

        res.status(201).json({message: "user register succsessful...."})

    }catch(err){
        console.error(err)

        res.status(500).json({
            message: "registration fail",
            error: err
        })

    }
}