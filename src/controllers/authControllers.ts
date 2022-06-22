import User from '../model/User';
import { ReqHandler } from '../types';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const registerUser: ReqHandler = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success: false, message: 'Validation Failed', errors: errors.array() });
		} else {
			const { firstName, lastName, username, phone, email, password, gender } = req.body;
			const user = await User.create({ firstName, lastName, username, phone, email, password, gender });
			await user.save();
			res.status(201).json({ success: true, message: 'User Created Successfully', data: user });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

export const LoginUser: ReqHandler = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success: false, message: 'Validation Failed', errors: errors.array() });
		} else {
			const { username, password } = req.body;
			const user = await User.findOne({ username: username }).select('+password');
			if (!user) {
				res.status(404).json({ success: false, message: 'Incorrect username' });
			} else {
				const isPasswordCorrect = await user.comparePassword(password);
				if (!isPasswordCorrect) {
					res.status(400).json({ success: false, message: 'Incorrect password' });
				} else {
					if (process.env.JWT_SECRET) {
						const accessToken = await jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
							expiresIn: 60,
						});
						const refreshToken = await jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
							expiresIn: 7 * 24 * 60 * 60,
						});
						res.status(200).json({
							success: true,
							message: 'Logged In Successfully',
							data: { accessToken, refreshToken, expiresIn: new Date(Date.now() + 60 * 1000).toISOString() },
						});
					} else {
						res.status(500).json({ success: false, message: 'Internal Server Error' });
					}
				}
			}
		}
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

export const renewToken: ReqHandler = async (req, res) => {
	try {
		const { refreshToken } = req.body;
		if (refreshToken && process.env.JWT_SECRET) {
			const decoded: any = await jwt.verify(refreshToken, process.env.JWT_SECRET);
			if (decoded) {
				const accessToken = await jwt.sign({ id: decoded.id, username: decoded.username }, process.env.JWT_SECRET, {
					expiresIn: 60,
				});
				res
					.status(200)
					.json({
						success: true,
						message: 'Token Renewed Successfully',
						data: { accessToken, expiresIn: new Date(Date.now() + 60 * 1000).toISOString() },
					});
			}
		}
	} catch (error: any) {
		if (error?.message && error?.message.includes('jwt expired')) {
			res.status(401).json({ success: false, message: 'Token Expired. Please login again!' });
		} else {
			res.status(500).json({ success: false, message: 'Internal Server Error' });
		}
	}
};

export const getProfile: ReqHandler = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.status(200).json({ success: true, message: 'Profile Fetched Successfully', data: user });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};
