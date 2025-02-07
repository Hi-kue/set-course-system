import express from "express";
import * as authController from "../src/controllers/auth.controller.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

export default router;
