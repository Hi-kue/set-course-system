import express from "express";
import * as enrollmentController from "../controllers/enrollment.controller.js";

const router = express.Router();

router.post("/", enrollmentController.createEnrollment);
router.get("/:studentId", enrollmentController.getStudentEnrollments);
router.delete("/:enrollmentId", enrollmentController.cancelEnrollment);

export default router;
