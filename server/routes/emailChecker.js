import express from 'express';
import checkEmail from '../controllers/emailController.js';

const router = express.Router();

router.get('/check-email', checkEmail);

export default router;