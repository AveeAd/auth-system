import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

//env
dotenv.config();

//import routes
import exampleRoute from './src/routes/exampleRoute';
import authRoute from './src/routes/authRoute';

//initialize app
const app = express();

//db
const mongo_uri = process.env.MONGO_URI_LOCAL || 'mongodb://localhost:27017/test';
mongoose
	.connect(mongo_uri)
	.then(() => console.log('===== MONGODB CONNECTED ====='))
	.catch(() => console.log('Failed to connect to MONGODB!!!'));

//middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/v1/example', exampleRoute);
app.use('/api/v1/auth', authRoute);

//start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`===== SERVER RUNNING ON PORT: ${port} =====`));
