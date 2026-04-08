import express from "express";
import authController from "./auth.controller.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({ message: "Auth module ready" });
})

router.post("/signup", authController.signup)

router.post("/login", authController.login)

router.post("/verify-otp", authController.verifyOTP)

export default router;