import { Request, Response, NextFunction } from "express";
import * as courseService from "../services/course.service.js";

export const getAllCourses = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const courses = await courseService.getAllCourses();
		res.status(200).json(courses);
	} catch (error) {
		next(error);
	}
};

export const createCourse = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const newCourse = await courseService.createCourse(req.body);
		res.status(201).json(newCourse);
	} catch (error) {
		next(error);
	}
};

export const getCourseById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const course = await courseService.getCourseById(req.params.id);
		res.status(200).json(course);
	} catch (error) {
		next(error);
	}
};

export const updateCourse = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const updatedCourse = await courseService.updateCourse(
			req.params.id,
			req.body,
		);
		res.status(200).json(updatedCourse);
	} catch (error) {
		next(error);
	}
};

export const deleteCourse = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await courseService.deleteCourse(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};
