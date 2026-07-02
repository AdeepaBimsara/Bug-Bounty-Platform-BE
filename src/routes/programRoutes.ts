import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { browsePrograms, createProgram, deleteProgram, getMyPrograms, getProgramById, updateProgram } from "../controller/programController";

const router = Router();

router.post("/", authenticate, createProgram);

router.get("/my-programs", authenticate,getMyPrograms);

router.delete("/:id", authenticate,deleteProgram);

router.put("/:id",authenticate,updateProgram);

router.get("/:id",authenticate,getProgramById);

router.get("/", authenticate, browsePrograms);

export default router;
