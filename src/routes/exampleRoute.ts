const { exampleController } = require('../controllers/exampleController');
// const router = require('express').Router();
import express from 'express';

const router = express.Router();

router.route('/').get(exampleController);

export default router;
