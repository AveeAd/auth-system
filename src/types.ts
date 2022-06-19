import { NextFunction, Request, Response } from 'express';

export interface ReqHandler {
	(req: Request, res: Response, next?: NextFunction): void;
}
