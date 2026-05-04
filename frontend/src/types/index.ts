/**
 * Type definitions for the Customer Dashboard Frontend
 */

/**
 * Customer entity
 */
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

/**
 * Customer form data (for creating new customers)
 */
export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
}

/**
 * Form validation errors
 */
export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  submit?: string;
}

/**
 * API response for customer list
 */
export interface CustomerListResponse {
  customers: Customer[];
  count: number;
}

/**
 * API response for single customer operations
 */
export interface CustomerResponse {
  message: string;
  customer: Customer;
}

/**
 * API error response
 */
export interface ApiErrorResponse {
  error: string;
}

/**
 * OTP send response
 */
export interface OtpSendResponse {
  message: string;
  email: string;
  expiresIn: string;
  devNote?: string;
}

/**
 * Login response with JWT token
 */
export interface LoginResponse {
  message: string;
  token: string;
  expiresIn: string;
  user: {
    email: string;
  };
}

/**
 * Auth form errors
 */
export interface AuthFormErrors {
  email?: string;
  otp?: string;
  submit?: string;
}
