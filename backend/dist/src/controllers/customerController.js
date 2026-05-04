"use strict";
/**
 * Customer Controller
 * Handles HTTP request/response for customer operations
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
exports.deleteCustomer = exports.updateCustomer = exports.addCustomer = exports.getCustomerById = exports.getAllCustomers = void 0;
const customerService = __importStar(require("../services/customerService"));
/**
 * GET /customers - Get all customers
 */
const getAllCustomers = async (req, res) => {
    try {
        const result = customerService.getAllCustomers();
        res.status(200).json(result);
    }
    catch (error) {
        const apiError = error;
        res.status(apiError.statusCode || 500).json({
            error: apiError.message || 'Internal server error'
        });
    }
};
exports.getAllCustomers = getAllCustomers;
/**
 * GET /customers/:id - Get a customer by ID
 */
const getCustomerById = async (req, res) => {
    try {
        const customer = customerService.getCustomerById(req.params.id);
        res.status(200).json({ customer });
    }
    catch (error) {
        const apiError = error;
        res.status(apiError.statusCode || 500).json({
            error: apiError.message || 'Internal server error'
        });
    }
};
exports.getCustomerById = getCustomerById;
/**
 * POST /customers - Add a new customer
 */
const addCustomer = async (req, res) => {
    try {
        const customer = customerService.addCustomer(req.body);
        res.status(201).json({
            message: 'Customer added successfully',
            customer
        });
    }
    catch (error) {
        const apiError = error;
        res.status(apiError.statusCode || 500).json({
            error: apiError.message || 'Internal server error'
        });
    }
};
exports.addCustomer = addCustomer;
/**
 * PUT /customers/:id - Update a customer
 */
const updateCustomer = async (req, res) => {
    try {
        const customer = customerService.updateCustomer(req.params.id, req.body);
        res.status(200).json({
            message: 'Customer updated successfully',
            customer
        });
    }
    catch (error) {
        const apiError = error;
        res.status(apiError.statusCode || 500).json({
            error: apiError.message || 'Internal server error'
        });
    }
};
exports.updateCustomer = updateCustomer;
/**
 * DELETE /customers/:id - Delete a customer
 */
const deleteCustomer = async (req, res) => {
    try {
        const customer = customerService.deleteCustomer(req.params.id);
        res.status(200).json({
            message: 'Customer deleted successfully',
            customer
        });
    }
    catch (error) {
        const apiError = error;
        res.status(apiError.statusCode || 500).json({
            error: apiError.message || 'Internal server error'
        });
    }
};
exports.deleteCustomer = deleteCustomer;
//# sourceMappingURL=customerController.js.map