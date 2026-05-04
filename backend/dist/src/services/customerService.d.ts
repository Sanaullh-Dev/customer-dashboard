/**
 * Customer Service
 * Handles all business logic related to customer operations
 */
import { Customer, CustomerCreateData, CustomerUpdateData, CustomerListResponse } from '../types';
/**
 * Get all customers
 * @returns List of customers and count
 */
export declare const getAllCustomers: () => CustomerListResponse;
/**
 * Add a new customer
 * @param customerData - Customer data (name, email, phone)
 * @returns Created customer
 * @throws ApiError if validation fails
 */
export declare const addCustomer: (customerData: CustomerCreateData) => Customer;
/**
 * Update an existing customer
 * @param id - Customer ID
 * @param updateData - Data to update
 * @returns Updated customer
 * @throws ApiError if customer not found or validation fails
 */
export declare const updateCustomer: (id: string | number, updateData: CustomerUpdateData) => Customer;
/**
 * Delete a customer by ID
 * @param id - Customer ID
 * @returns Deleted customer
 * @throws ApiError if customer not found
 */
export declare const deleteCustomer: (id: string | number) => Customer;
/**
 * Get a customer by ID
 * @param id - Customer ID
 * @returns Customer
 * @throws ApiError if customer not found
 */
export declare const getCustomerById: (id: string | number) => Customer;
//# sourceMappingURL=customerService.d.ts.map