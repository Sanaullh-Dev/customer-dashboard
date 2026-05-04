/**
 * Customer Service
 * Handles all business logic related to customer operations
 */

import {
  Customer,
  CustomerCreateData,
  CustomerUpdateData,
  CustomerListResponse,
  ApiError
} from '../types';

// In-memory storage for customers
let customers: Customer[] = [];
let nextId = 1;

/**
 * Get all customers
 * @returns List of customers and count
 */
export const getAllCustomers = (): CustomerListResponse => {
  return {
    customers,
    count: customers.length
  };
};

/**
 * Add a new customer
 * @param customerData - Customer data (name, email, phone)
 * @returns Created customer
 * @throws ApiError if validation fails
 */
export const addCustomer = (customerData: CustomerCreateData): Customer => {
  const { name, email, phone } = customerData;

  // Validate required fields
  if (!name || !email || !phone) {
    const error: ApiError = new Error('All fields (name, email, phone) are required');
    error.statusCode = 400;
    throw error;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error: ApiError = new Error('Invalid email format');
    error.statusCode = 400;
    throw error;
  }

  const newCustomer: Customer = {
    id: nextId++,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim()
  };

  customers.push(newCustomer);
  return newCustomer;
};

/**
 * Update an existing customer
 * @param id - Customer ID
 * @param updateData - Data to update
 * @returns Updated customer
 * @throws ApiError if customer not found or validation fails
 */
export const updateCustomer = (id: string | number, updateData: CustomerUpdateData): Customer => {
  const customerId = typeof id === 'string' ? parseInt(id, 10) : id;

  if (isNaN(customerId)) {
    const error: ApiError = new Error('Invalid customer ID');
    error.statusCode = 400;
    throw error;
  }

  const customerIndex = customers.findIndex(c => c.id === customerId);

  if (customerIndex === -1) {
    const error: ApiError = new Error('Customer not found');
    error.statusCode = 404;
    throw error;
  }

  const { name, email, phone } = updateData;

  // Validate email format if provided
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const error: ApiError = new Error('Invalid email format');
      error.statusCode = 400;
      throw error;
    }
  }

  // Update only provided fields
  if (name) customers[customerIndex].name = name.trim();
  if (email) customers[customerIndex].email = email.trim().toLowerCase();
  if (phone) customers[customerIndex].phone = phone.trim();

  return customers[customerIndex];
};

/**
 * Delete a customer by ID
 * @param id - Customer ID
 * @returns Deleted customer
 * @throws ApiError if customer not found
 */
export const deleteCustomer = (id: string | number): Customer => {
  const customerId = typeof id === 'string' ? parseInt(id, 10) : id;

  if (isNaN(customerId)) {
    const error: ApiError = new Error('Invalid customer ID');
    error.statusCode = 400;
    throw error;
  }

  const customerIndex = customers.findIndex(c => c.id === customerId);

  if (customerIndex === -1) {
    const error: ApiError = new Error('Customer not found');
    error.statusCode = 404;
    throw error;
  }

  const deletedCustomer = customers.splice(customerIndex, 1)[0];
  return deletedCustomer;
};

/**
 * Get a customer by ID
 * @param id - Customer ID
 * @returns Customer
 * @throws ApiError if customer not found
 */
export const getCustomerById = (id: string | number): Customer => {
  const customerId = typeof id === 'string' ? parseInt(id, 10) : id;

  if (isNaN(customerId)) {
    const error: ApiError = new Error('Invalid customer ID');
    error.statusCode = 400;
    throw error;
  }

  const customer = customers.find(c => c.id === customerId);

  if (!customer) {
    const error: ApiError = new Error('Customer not found');
    error.statusCode = 404;
    throw error;
  }

  return customer;
};
