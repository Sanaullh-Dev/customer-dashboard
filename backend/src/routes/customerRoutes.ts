/**
 * Customer Routes
 * Routes for customer CRUD operations (protected by JWT)
 */

import { Router } from 'express';
import * as customerController from '../controllers/customerController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

/**
 * GET /customers
 * Get all customers (protected - requires JWT)
 * 
 * @header {string} Authorization - Bearer <token>
 * @returns List of customers and count
 */
router.get('/', authenticate, customerController.getAllCustomers);

/**
 * GET /customers/:id
 * Get a specific customer by ID (protected - requires JWT)
 * 
 * @header {string} Authorization - Bearer <token>
 * @param {number} id - Customer ID
 * @returns Customer details
 */
router.get('/:id', authenticate, customerController.getCustomerById);

/**
 * POST /customers
 * Add a new customer (protected - requires JWT)
 * 
 * @header {string} Authorization - Bearer <token>
 * @body {string} name - Customer name
 * @body {string} email - Customer email
 * @body {string} phone - Customer phone
 * @returns Created customer
 */
router.post('/', authenticate, customerController.addCustomer);

/**
 * PUT /customers/:id
 * Update a customer (protected - requires JWT)
 * 
 * @header {string} Authorization - Bearer <token>
 * @param {number} id - Customer ID
 * @body {string} name - Customer name (optional)
 * @body {string} email - Customer email (optional)
 * @body {string} phone - Customer phone (optional)
 * @returns Updated customer
 */
router.put('/:id', authenticate, customerController.updateCustomer);

/**
 * DELETE /customers/:id
 * Delete a customer (protected - requires JWT)
 * 
 * @header {string} Authorization - Bearer <token>
 * @param {number} id - Customer ID
 * @returns Deleted customer
 */
router.delete('/:id', authenticate, customerController.deleteCustomer);

export default router;
