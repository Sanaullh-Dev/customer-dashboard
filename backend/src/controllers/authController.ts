/**
 * Auth Controller
 * Handles HTTP request/response for authentication operations
 */

import { Response } from 'express';
import * as authService from '../services/authService';
import { AuthenticatedRequest, ApiError } from '../types';

/**
 * POST /auth/send-otp - Send OTP to email address
 */
export const sendOtp = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const result = authService.sendOtp(email);
    res.status(200).json(result);
  } catch (error) {
    const apiError = error as ApiError;
    res.status(apiError.statusCode || 500).json({
      error: apiError.message || 'Internal server error'
    });
  }
};

/**
 * POST /auth/verify-otp - Verify OTP and get JWT token
 */
export const verifyOtp = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;
    const result = authService.verifyOtp(email, otp);
    res.status(200).json(result);
  } catch (error) {
    const apiError = error as ApiError;
    res.status(apiError.statusCode || 500).json({
      error: apiError.message || 'Internal server error'
    });
  }
};

/**
 * GET /auth/verify-token - Verify JWT token validity
 */
export const verifyToken = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // Token is already verified by middleware, return user info
    res.status(200).json({
      message: 'Token is valid',
      user: req.user
    });
  } catch (error) {
    const apiError = error as ApiError;
    res.status(apiError.statusCode || 500).json({
      error: apiError.message || 'Internal server error'
    });
  }
};
