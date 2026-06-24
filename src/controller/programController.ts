import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { ProgramModel } from "../models/programModel";

export const createProgram = async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      type,
      description,
      scope,
      visibility,
      rewardMin,
      rewardMax,
    } = req.body;

    const companyId = req.user.sub;

    const program = await ProgramModel.create({
      title,
      type,
      description,
      scope,
      visibility,
      rewardMin,
      rewardMax,
      companyId,
    });

    res.status(201).json({
      message: "Program created successfully",
      data: program,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create program",
    });
  }
};
