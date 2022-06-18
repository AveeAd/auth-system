import { Request, Response } from 'express';

export const getProfile = async (_req: Request, res: Response) => {
	res.json({ message: 'getProfile' });
};
