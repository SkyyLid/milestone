import express from "express";
import { signup, login } from "../controllers/authController";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// router.get("/logout", logout)

// router.post("/verify-email",verifyEmail)
// router.post("/forgot-password",forgotPassword)
export default router;
