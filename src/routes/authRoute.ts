import express from 'express';
import { getProfile, LoginUser, registerUser } from '../controllers/authControllers';
import { auth } from '../middlewares/auth';
import { LoginValidation, registerValidation } from '../utils/validation';

const router = express.Router();

router.route('/register').post(registerValidation, registerUser);
router.route('/login').post(LoginValidation, LoginUser);
router.route('/me').get(auth, getProfile);

export default router;
