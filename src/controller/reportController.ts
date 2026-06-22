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

export const getReport = async (
  req: Request,
  res: Response
) => {
  try {

    const reports = await Report.find();

    res.status(200).json(reports);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch reports"
    });

  }
};

export const updateReport = async (req: Request, res: Response) => {
  try {

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedReport);

  } catch (error) {

    res.status(500).json({
      message: "Update failed"
    });

  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {

    await Report.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Report deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Delete failed"
    });

  }
};