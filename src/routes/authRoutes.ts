import { Router } from "express";
import { getMyDetails, login, registerUser,refreshToken } from "../controller/authController";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/roles";
import { UserRole } from "../models/userModel";

const router = Router()

router.post("/register",registerUser)

router.post("/login", login)

router.get("/me", authenticate, getMyDetails)

// router.post(
//   "/admin/register",
//   authenticate,
//   requireRole([UserRole.ADMIN]),
//   registerAdmin
// )

router.post("/refresh", refreshToken)



export default router