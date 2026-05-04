"use strict";
/**
 * Auth Routes
 * Routes for authentication (login with OTP)
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
const express_1 = require("express");
const authController = __importStar(require("../controllers/authController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
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
router.get('/verify-token', authMiddleware_1.authenticate, authController.verifyToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map