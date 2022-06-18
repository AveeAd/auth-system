import express from 'express';
// const mongoose = require('mongoose');
import dotenv from 'dotenv';
import cors from 'cors';
import exampleRoute from './src/routes/exampleRoute';
dotenv.config();

const app = express();
app.use(cors());

app.use('/example', exampleRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
