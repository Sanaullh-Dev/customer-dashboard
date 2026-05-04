/**
 * Auth Middleware
 * Handles JWT token verification for protected routes
 */

import { Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import { AuthenticatedRequest, ApiError } from '../types';

/**
 * Middleware to verify JWT token
 * Protects routes that require authentication
 */
export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        error: 'Access denied. No token provided.'
      });
      return;
    }

    // Check if it's a Bearer token
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Access denied. Invalid token format. Use: Bearer <token>'
      });
      return;
    }

    // Extract token
    const token = authHeader.substring(7);

    if (!token) {
      res.status(401).json({
        error: 'Access denied. Token is empty.'
      });
      return;
    }

    // Verify token
    const decoded = authService.verifyToken(token);

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    const apiError = error as ApiError;
    res.status(apiError.statusCode || 401).json({
      error: apiError.message || 'Invalid token'
    });
  }
};

/**
 * Optional authentication middleware
 * Attaches user info if token is valid, but doesn't block request
 */
export const optionalAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      if (token) {
        const decoded = authService.verifyToken(token);
        req.user = decoded;
      }
    }

    next();
  } catch {
    // Continue without user info if token is invalid
    next();
  }
};
