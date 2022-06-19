import { check } from 'express-validator';

export const registerValidation = [
	check('firstName')
		.isString()
		.withMessage('First name must be a string')
		.notEmpty()
		.withMessage('First name cannot be empty'),
	check('lastName')
		.isString()
		.withMessage('Last name must be a string')
		.notEmpty()
		.withMessage('Last name cannot be empty'),
	check('username')
		.isString()
		.withMessage('Username must be a string')
		.notEmpty()
		.withMessage('User name cannot be empty'),
	check('phone')
		.isMobilePhone('ne-NP')
		.withMessage('Phone must be a number')
		.notEmpty()
		.withMessage('Phone cannot be empty'),
	check('email').isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email cannot be empty'),
	check('password')
		.isString()
		.withMessage('Password must be a string')
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long'),
	check('gender')
		.custom((value: string) => {
			const valid = ['male', 'female', 'lesbian', 'gay', 'bisexual', 'transgender', 'other'].includes(value);
			if (valid) {
				return true;
			} else {
				throw Error('Gender must be one of male|female|lesbian|gay|bisexual|transgender|other');
			}
		})
		.notEmpty()
		.withMessage('Gender cannot be empty'),
	// check('dob').notEmpty().withMessage('Date of birth cannot be empty'),
];

export const LoginValidation = [
	check('username')
		.isString()
		.withMessage('User must be valid string')
		.notEmpty()
		.withMessage('User name cannot be empty'),
	check('password')
		.isString()
		.withMessage('Password must be valid string')
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long'),
];
