/**
 * Type definitions for the Customer Dashboard Backend
 */
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
/**
 * Customer entity
 */
export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
}
/**
 * Customer creation data (without id)
 */
export interface CustomerCreateData {
    name: string;
    email: string;
    phone: string;
}
/**
 * Customer update data (all fields optional)
 */
export interface CustomerUpdateData {
    name?: string;
    email?: string;
    phone?: string;
}
/**
 * Customer list response
 */
export interface CustomerListResponse {
    customers: Customer[];
    count: number;
}
/**
 * OTP request data stored in memory
 */
export interface OtpData {
    email: string;
    otp: string;
    createdAt: number;
    expiresAt: number;
}
/**
 * OTP send response
 */
export interface OtpSendResponse {
    message: string;
    email: string;
    expiresIn: string;
    devNote: string;
}
/**
 * Login response with JWT token
 */
export interface LoginResponse {
    message: string;
    token: string;
    expiresIn: string;
    user: {
        email: string;
    };
}
/**
 * JWT payload structure
 */
export interface JwtUserPayload extends JwtPayload {
    email: string;
    loginAt: number;
}
/**
 * Extended Express Request with user info
 */
export interface AuthenticatedRequest extends Request {
    user?: JwtUserPayload;
}
/**
 * Custom error with status code
 */
export interface ApiError extends Error {
    statusCode?: number;
}
//# sourceMappingURL=index.d.ts.map