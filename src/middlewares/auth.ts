import { ReqHandler } from '../types';
import jwt from 'jsonwebtoken';

export const auth: ReqHandler = async (req, res, next) => {
	try {
		if (next) {
			if (req.headers.authorization) {
				const token = req.headers.authorization.split(' ')[1];
				if (token && process.env.JWT_SECRET) {
					const decoded = await jwt.verify(token, process.env.JWT_SECRET);
					req.user = decoded;
					next();
				} else {
					res.status(401).json({ success: false, message: 'You are not authorized' });
				}
			} else {
				res.status(401).json({ success: false, message: 'You are not authorized' });
			}
		} else {
			res.status(500).json({ success: false, message: 'Internal Server Error' });
		}
	} catch (error: any) {
		if (error?.message && error?.message.includes('jwt expired')) {
			res.status(401).json({ success: false, message: 'Token Expired. Please login again!' });
		} else {
			res.status(400).json({ success: false, message: 'Invalid Token' });
		}
	}
};
