"use strict";
/**
 * Auth Middleware
 * Handles JWT token verification for protected routes
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authenticate = void 0;
const authService = __importStar(require("../services/authService"));
/**
 * Middleware to verify JWT token
 * Protects routes that require authentication
 */
const authenticate = (req, res, next) => {
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
    }
    catch (error) {
        const apiError = error;
        res.status(apiError.statusCode || 401).json({
            error: apiError.message || 'Invalid token'
        });
    }
};
exports.authenticate = authenticate;
/**
 * Optional authentication middleware
 * Attaches user info if token is valid, but doesn't block request
 */
const optionalAuth = (req, res, next) => {
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
    }
    catch {
        // Continue without user info if token is invalid
        next();
    }
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=authMiddleware.js.map