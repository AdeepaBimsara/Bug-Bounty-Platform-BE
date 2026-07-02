import { Request, Response } from "express"
import {UserModel, UserRole} from "../models/userModel"
import {signAccessToken,signRefreshToken} from "../ultils/tokens"
import {AuthRequest} from "../middleware/auth"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

dotenv.config()

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string

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
            role: role || UserRole.RESEARCHER,
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

export const login = async (req: Request, res: Response) => {
    try{
        const {email,password} = req.body

        const user = await UserModel.findOne({email})

        console.log("User : " ,user);
        
        if(!user){
            return res.status(401).json({message: "Invalid credentials"})
        }

        const isValid = await bcrypt.compare(password, user?.password)

        if(!isValid){
           return res.status(401).json({message: "Invalid credintials"})
        }

        console.log("password mach: " , isValid);
        

        const accessToken = signAccessToken(user)
        const refreshToken = signRefreshToken(user)

         res.status(200).json({
            message: "success",
            data: {
                email: user.email,
                role: user.role,
                accessToken,
                refreshToken
            }
    })

    }catch(err){

      console.error(err);

      res.status(500).json({
        message: "Login fail",
        error: err
      })
      

    }
}

export const getMyDetails = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const user = await UserModel.findById(req.user.sub).select("-password")

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    })
  }

  const { email, role, _id } = user

  res.status(200).json({ message: "ok", data: { id: _id, email, role } })
}

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body
  try {
    if (!refreshToken) {
      return res.status(400).json({ message: "Token required..!" })
    }
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET)
    const userId = payload.sub
    const user = await UserModel.findById(userId)
    if (!user) {
      return res.status(403).json({ message: "Invalid or expire token" })
    }
    
    const newAccessToken = signAccessToken(user)
    res.status(200).json({
      message: "",
      data: { accessToken: newAccessToken }
    })
  } catch (err) {
    res.status(403).json({ message: "Invalid or expire token" })
  }
}

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const user = await UserModel
      .findById(req.user.sub)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "Profile Loaded",
      data: user
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};