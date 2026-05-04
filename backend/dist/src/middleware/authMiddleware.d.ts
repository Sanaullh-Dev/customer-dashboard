/**
 * Auth Middleware
 * Handles JWT token verification for protected routes
 */
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
/**
 * Middleware to verify JWT token
 * Protects routes that require authentication
 */
export declare const authenticate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
/**
 * Optional authentication middleware
 * Attaches user info if token is valid, but doesn't block request
 */
export declare const optionalAuth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map