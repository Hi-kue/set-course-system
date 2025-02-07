import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tokens = await authService.login(req.body);
		res.status(200).json(tokens);
	} catch (error) {
		next(error);
	}
};

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await authService.register(req.body);
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

export const refreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tokens = await authService.refreshToken(req.body.refreshToken);
		res.status(200).json(tokens);
	} catch (error) {
		next(error);
	}
};

export const logout = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		await authService.logout(req.user.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};
