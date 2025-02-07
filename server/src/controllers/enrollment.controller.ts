import { Request, Response, NextFunction } from "express";
import { enrollmentService } from "../services/enrollment.service.js";

export const createEnrollment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const enrollment = await enrollmentService.createEnrollment(req.body);
		res.status(201).json(enrollment);
	} catch (error) {
		next(error);
	}
};

export const getStudentEnrollments = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const enrollments = await enrollmentService.getStudentEnrollments(
			req.params.studentId,
		);
		res.status(200).json(enrollments);
	} catch (error) {
		next(error);
	}
};

export const cancelEnrollment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await enrollmentService.cancelEnrollment(req.params.enrollmentId);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};
