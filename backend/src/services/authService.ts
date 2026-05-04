/**
 * Auth Service
 * Handles authentication business logic
 */

import jwt, { SignOptions } from 'jsonwebtoken';
import {
  OtpData,
  OtpSendResponse,
  LoginResponse,
  JwtUserPayload,
  ApiError
} from '../types';

// JWT Configuration
export const JWT_SECRET: string = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '24h';

// In-memory storage for OTP requests (in production, use Redis or database)
const otpRequests = new Map<string, OtpData>();

/**
 * Send OTP to email address (simulated)
 * @param email - Email address
 * @returns OTP request details
 */
export const sendOtp = (email: string): OtpSendResponse => {
  if (!email) {
    const error: ApiError = new Error('Email address is required');
    error.statusCode = 400;
    throw error;
  }

  // Validate email format (basic validation)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error: ApiError = new Error('Invalid email address format');
    error.statusCode = 400;
    throw error;
  }

  // Generate a random OTP (for demo purposes, any OTP will work)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store OTP request with expiry (5 minutes)
  const otpData: OtpData = {
    email: email.trim().toLowerCase(),
    otp,
    createdAt: Date.now(),
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
  };
  
  otpRequests.set(email.trim().toLowerCase(), otpData);

  // In production, send OTP via email service
  console.log(`[DEV] OTP for ${email}: ${otp} (any OTP will work for testing)`);

  return {
    message: 'OTP sent successfully',
    email: email.trim().toLowerCase(),
    expiresIn: '5 minutes',
    // For development/testing - any OTP will work
    devNote: 'Any OTP will work for testing purposes'
  };
};

/**
 * Verify OTP and generate JWT token
 * @param email - Email address
 * @param otp - OTP to verify
 * @returns JWT token and user details
 */
export const verifyOtp = (email: string, otp: string): LoginResponse => {
  if (!email || !otp) {
    const error: ApiError = new Error('Email address and OTP are required');
    error.statusCode = 400;
    throw error;
  }

  // For demo purposes, any OTP will work
  // In production, validate against stored OTP
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const storedOtpData = otpRequests.get(email.trim().toLowerCase());
  
  // Any OTP will work for testing (as per requirement)
  // Just validate that OTP is 4-6 digits
  if (otp.length < 4 || otp.length > 6) {
    const error: ApiError = new Error('OTP must be 4-6 digits');
    error.statusCode = 400;
    throw error;
  }

  // Generate JWT token
  const payload: Omit<JwtUserPayload, 'iat' | 'exp'> = {
    email: email.trim().toLowerCase(),
    loginAt: Date.now()
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as SignOptions);

  // Clean up OTP request
  otpRequests.delete(email.trim().toLowerCase());

  return {
    message: 'Login successful',
    token,
    expiresIn: JWT_EXPIRES_IN,
    user: {
      email: email.trim().toLowerCase()
    }
  };
};

/**
 * Verify JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload
 * @throws ApiError if token is invalid
 */
export const verifyToken = (token: string): JwtUserPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtUserPayload;
    return decoded;
  } catch (err) {
    const jwtError = err as Error;
    if (jwtError.name === 'TokenExpiredError') {
      const error: ApiError = new Error('Token has expired');
      error.statusCode = 401;
      throw error;
    }
    if (jwtError.name === 'JsonWebTokenError') {
      const error: ApiError = new Error('Invalid token');
      error.statusCode = 401;
      throw error;
    }
    throw err;
  }
};
