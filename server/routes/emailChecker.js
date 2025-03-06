import express from 'express';
import checkEmail from '../controllers/emailController.js';

const router = express.Router();

router.get('/check-email', checkEmail);
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

export default router;