"use strict";
/**
 * Auth Controller
 * Handles HTTP request/response for authentication operations
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
exports.verifyToken = exports.verifyOtp = exports.sendOtp = void 0;
const authService = __importStar(require("../services/authService"));
/**
 * POST /auth/send-otp - Send OTP to email address
 */
const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const result = authService.sendOtp(email);
        res.status(200).json(result);
    }
    catch (error) {
        const apiError = error;
        res.status(apiError.statusCode || 500).json({
            error: apiError.message || 'Internal server error'
        });
    }
};
exports.sendOtp = sendOtp;
/**
 * POST /auth/verify-otp - Verify OTP and get JWT token
 */
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const result = authService.verifyOtp(email, otp);
        res.status(200).json(result);
    }
    catch (error) {
        const apiError = error;
        res.status(apiError.statusCode || 500).json({
            error: apiError.message || 'Internal server error'
        });
    }
};
exports.verifyOtp = verifyOtp;
/**
 * GET /auth/verify-token - Verify JWT token validity
 */
const verifyToken = async (req, res) => {
    try {
        // Token is already verified by middleware, return user info
        res.status(200).json({
            message: 'Token is valid',
            user: req.user
        });
    }
    catch (error) {
        const apiError = error;
        res.status(apiError.statusCode || 500).json({
            error: apiError.message || 'Internal server error'
        });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authController.js.map