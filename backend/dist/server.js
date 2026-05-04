"use strict";
/**
 * Customer Dashboard Backend Server
 *
 * Express.js server with JWT authentication (TypeScript)
 * Folder structure: routes, controllers, services, middleware, types
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Import routes
const routes_1 = require("./src/routes");
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '5000', 10);
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/auth', routes_1.authRoutes);
app.use('/customers', routes_1.customerRoutes);
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
// API documentation endpoint
app.get('/api-docs', (req, res) => {
    res.status(200).json({
        name: 'Customer Dashboard API',
        version: '1.0.0',
        authentication: {
            description: 'JWT Bearer token authentication',
            flow: [
                '1. POST /auth/send-otp with phone number',
                '2. POST /auth/verify-otp with phone and OTP (any OTP works for testing)',
                '3. Use returned token in Authorization header: Bearer <token>'
            ]
        },
        endpoints: {
            auth: {
                'POST /auth/send-otp': 'Send OTP to phone number',
                'POST /auth/verify-otp': 'Verify OTP and get JWT token',
                'GET /auth/verify-token': 'Verify token validity (protected)'
            },
            customers: {
                'GET /customers': 'Get all customers (protected)',
                'GET /customers/:id': 'Get customer by ID (protected)',
                'POST /customers': 'Add new customer (protected)',
                'PUT /customers/:id': 'Update customer (protected)',
                'DELETE /customers/:id': 'Delete customer (protected)'
            }
        }
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map