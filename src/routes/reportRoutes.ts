import express from "express";
import { createReport } from "../controller/reportController";
import { upload } from "../middleware/uploadMiddleware";

const router = express.Router();

router.post(
  "/",
  upload.single("proofFile"),
  createReport
);

export default router;