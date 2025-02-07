import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const Middleware = {
	notFound: (req: Request, res: Response, next: NextFunction) => {
		const error = new Error(`Not Found - ${req.originalUrl}`);
		res.status(404);
		next(error);
	},

	errorHandler: (
		error: Error,
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
		res.status(statusCode);
		res.json({
			message: error.message,
			stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
		});
	},

	unknownEndpoint: (req: Request, res: Response) => {
		res.status(404).json({ error: "unknown endpoint" });
	},
};
