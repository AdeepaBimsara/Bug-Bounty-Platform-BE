import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { createProgram, deleteProgram, getMyPrograms, updateProgram } from "../controller/programController";

const router = Router();

router.post("/", authenticate, createProgram);

router.get("/my-programs", authenticate,getMyPrograms);

router.delete("/:id", authenticate,deleteProgram);

router.put("/:id",authenticate,updateProgram);

export default router;
