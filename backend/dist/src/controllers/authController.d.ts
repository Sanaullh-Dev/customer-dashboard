/**
 * Auth Controller
 * Handles HTTP request/response for authentication operations
 */
import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
/**
 * POST /auth/send-otp - Send OTP to email address
 */
export declare const sendOtp: (req: AuthenticatedRequest, res: Response) => Promise<void>;
/**
 * POST /auth/verify-otp - Verify OTP and get JWT token
 */
export declare const verifyOtp: (req: AuthenticatedRequest, res: Response) => Promise<void>;
/**
 * GET /auth/verify-token - Verify JWT token validity
 */
export declare const verifyToken: (req: AuthenticatedRequest, res: Response) => Promise<void>;
//# sourceMappingURL=authController.d.ts.map