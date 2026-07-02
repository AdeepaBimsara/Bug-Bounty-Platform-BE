import express from "express";
import { createReport, deleteReport, getReport, updateReport } from "../controller/reportController";
import { upload } from "../middleware/uploadMiddleware";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post(
  "/",
  upload.single("proofFile"),
  createReport
);

router.get("/", getReport);
router.put("/:id", updateReport);
router.delete("/:id",authenticate, deleteReport);

export default router;