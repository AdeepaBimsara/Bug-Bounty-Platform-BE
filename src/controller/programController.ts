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

export const getMyPrograms = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const companyId = req.user.sub;

    const programs = await ProgramModel.find({
      companyId,
    });

    res.status(200).json({
      data: programs,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch programs",
    });
  }
};

export const deleteProgram = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const companyId = req.user.sub;

    const program = await ProgramModel.findOneAndDelete({
      _id: id,
      companyId,
    });

    if (!program) {
      return res.status(404).json({
        message: "Program not found",
      });
    }

    res.status(200).json({
      message: "Program deleted successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};

export const updateProgram = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const companyId = req.user.sub;

    const updatedProgram =
      await ProgramModel.findOneAndUpdate(
        {
          _id: id,
          companyId,
        },
        req.body,
        {
          new: true,
        }
      );

    if (!updatedProgram) {
      return res.status(404).json({
        message: "Program not found",
      });
    }

    return res.status(200).json({
      message: "Program updated successfully",
      data: updatedProgram,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Update failed",
    });
  }
};