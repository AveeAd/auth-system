import { ReqHandler } from '../types';
import jwt from 'jsonwebtoken';

export const auth: ReqHandler = async (req, res, next) => {
	try {
		if (next) {
			if (req.headers.authorization) {
				const token = req.headers.authorization.split(' ')[1];
				if (process.env.JWT_SECRET) {
					const decoded = await jwt.verify(token, process.env.JWT_SECRET);
					req.user = decoded;
					next();
				} else {
					res.status(500).json({ success: false, message: 'Internal Server Error' });
				}
			}
		} else {
			res.status(500).json({ success: false, message: 'Internal Server Error' });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};
