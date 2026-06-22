import { Request, Response } from "express";
import Report from "../models/reportModel";

export const createReport = async (
  req: Request,
  res: Response
) => {
  try {
    const report = await Report.create({

      programId: req.body.programId,

      programName: req.body.programName,

      title: req.body.title,

      severity: req.body.severity,

      description: req.body.description,

      status:"Pending",

      proofFile: req.file?.filename,

    });

    res.status(201).json(report);

    console.log(req.body)
    console.log(req.file)
    
  } catch (error) {
    res.status(500).json({
      message: "Failed to create report",
    });
  }
};