import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
	firstName: string;
	lastName: string;
	username: string;
	phone: string;
	email: string;
	password: string;
	gender: 'male' | 'female' | 'lesbian' | 'gay' | 'bisexual' | 'transgender' | 'other';
	dob: string;
	friends?: mongoose.Types.ObjectId[];
	permanentAddress?: string;
	temporaryAddress?: string;
	comparePassword: (password: string) => boolean;
}

const User = new mongoose.Schema<IUser>(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		gender: {
			type: String,
			required: true,
			enum: ['male', 'female', 'lesbian', 'gay', 'bisexual', 'transgender', 'other'],
		},
		dob: {
			type: String,
			// required: true,
		},
		permanentAddress: String,
		temporaryAddress: String,
		friends: {
			type: [mongoose.Types.ObjectId],
			default: [],
			ref: 'User',
		},
	},

	{ timestamps: true }
);

//hash password
User.pre('save', async function (next) {
	if (!this.isModified('password')) next();
	this.password = await bcrypt.hash(this.password, 10);
});

//compare password
User.methods.comparePassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', User);
