import { Request, Response } from 'express';

export const exampleController = (_req: Request, res: Response) => {
	res.send('This is an example');
};
