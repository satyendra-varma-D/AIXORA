import express from 'express';
import { authController } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/verify-mfa', authController.verifyMfa);
router.post('/logout', authController.logout);
router.get('/profile', requireAuth, authController.profile);

export default router;
