/**
 * Customer Dashboard Backend Server
 * 
 * Express.js server with JWT authentication (TypeScript)
 * Folder structure: routes, controllers, services, middleware, types
 */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';

// Import routes
import { authRoutes, customerRoutes } from './src/routes';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/customers', customerRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

// API documentation endpoint
app.get('/api-docs', (req: Request, res: Response) => {
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

export default app;
