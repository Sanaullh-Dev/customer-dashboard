/**
 * Auth Service
 * Handles authentication business logic
 */
import { OtpSendResponse, LoginResponse, JwtUserPayload } from '../types';
export declare const JWT_SECRET: string;
export declare const JWT_EXPIRES_IN: string;
/**
 * Send OTP to email address (simulated)
 * @param email - Email address
 * @returns OTP request details
 */
export declare const sendOtp: (email: string) => OtpSendResponse;
/**
 * Verify OTP and generate JWT token
 * @param email - Email address
 * @param otp - OTP to verify
 * @returns JWT token and user details
 */
export declare const verifyOtp: (email: string, otp: string) => LoginResponse;
/**
 * Verify JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload
 * @throws ApiError if token is invalid
 */
export declare const verifyToken: (token: string) => JwtUserPayload;
//# sourceMappingURL=authService.d.ts.map