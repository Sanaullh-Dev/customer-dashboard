/**
 * Customer Controller
 * Handles HTTP request/response for customer operations
 */

import { Request, Response } from 'express';
import * as customerService from '../services/customerService';
import { ApiError } from '../types';

/**
 * GET /customers - Get all customers
 */
export const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = customerService.getAllCustomers();
    res.status(200).json(result);
  } catch (error) {
    const apiError = error as ApiError;
    res.status(apiError.statusCode || 500).json({
      error: apiError.message || 'Internal server error'
    });
  }
};

/**
 * GET /customers/:id - Get a customer by ID
 */
export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = customerService.getCustomerById(req.params.id);
    res.status(200).json({ customer });
  } catch (error) {
    const apiError = error as ApiError;
    res.status(apiError.statusCode || 500).json({
      error: apiError.message || 'Internal server error'
    });
  }
};

/**
 * POST /customers - Add a new customer
 */
export const addCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = customerService.addCustomer(req.body);
    res.status(201).json({
      message: 'Customer added successfully',
      customer
    });
  } catch (error) {
    const apiError = error as ApiError;
    res.status(apiError.statusCode || 500).json({
      error: apiError.message || 'Internal server error'
    });
  }
};

/**
 * PUT /customers/:id - Update a customer
 */
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = customerService.updateCustomer(req.params.id, req.body);
    res.status(200).json({
      message: 'Customer updated successfully',
      customer
    });
  } catch (error) {
    const apiError = error as ApiError;
    res.status(apiError.statusCode || 500).json({
      error: apiError.message || 'Internal server error'
    });
  }
};

/**
 * DELETE /customers/:id - Delete a customer
 */
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = customerService.deleteCustomer(req.params.id);
    res.status(200).json({
      message: 'Customer deleted successfully',
      customer
    });
  } catch (error) {
    const apiError = error as ApiError;
    res.status(apiError.statusCode || 500).json({
      error: apiError.message || 'Internal server error'
    });
  }
};
