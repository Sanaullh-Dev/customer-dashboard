/**
 * Auth Routes
 * Routes for authentication (login with OTP)
 */

import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

/**
 * POST /auth/send-otp
 * Send OTP to email address for login
 * 
 * @body {string} email - Email address to send OTP
 * @returns Success message with OTP sent confirmation
 */
router.post('/send-otp', authController.sendOtp);

/**
 * POST /auth/verify-otp
 * Verify OTP and receive JWT token
 * 
 * @body {string} email - Email address
 * @body {string} otp - OTP received (any OTP works for testing)
 * @returns JWT token and user details
 */
router.post('/verify-otp', authController.verifyOtp);

/**
 * GET /auth/verify-token
 * Verify if current JWT token is valid (protected route)
 * 
 * @header {string} Authorization - Bearer <token>
 * @returns Token validity status and user info
 */
router.get('/verify-token', authenticate, authController.verifyToken);

export default router;
