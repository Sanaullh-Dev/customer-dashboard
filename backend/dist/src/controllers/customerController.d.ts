/**
 * Customer Controller
 * Handles HTTP request/response for customer operations
 */
import { Request, Response } from 'express';
/**
 * GET /customers - Get all customers
 */
export declare const getAllCustomers: (req: Request, res: Response) => Promise<void>;
/**
 * GET /customers/:id - Get a customer by ID
 */
export declare const getCustomerById: (req: Request, res: Response) => Promise<void>;
/**
 * POST /customers - Add a new customer
 */
export declare const addCustomer: (req: Request, res: Response) => Promise<void>;
/**
 * PUT /customers/:id - Update a customer
 */
export declare const updateCustomer: (req: Request, res: Response) => Promise<void>;
/**
 * DELETE /customers/:id - Delete a customer
 */
export declare const deleteCustomer: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=customerController.d.ts.map