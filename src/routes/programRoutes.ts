import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { createProgram } from "../controller/programController";

const router = Router();

router.post("/", authenticate, createProgram);

export default router;
