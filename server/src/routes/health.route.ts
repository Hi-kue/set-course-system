import express from "express";
import * as healthController from "../controllers/health.controller.js";

const router = express.Router();

router.get("/", healthController.checkHealth);
router.get("/detailed", healthController.detailedHealthCheck);

export default router;
