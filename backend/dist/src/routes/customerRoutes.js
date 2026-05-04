"use strict";
/**
 * Customer Routes
 * Routes for customer CRUD operations (protected by JWT)
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
const customerController = __importStar(require("../controllers/customerController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
/**
 * GET /customers
 * Get all customers (protected - requires JWT)
 *
 * @header {string} Authorization - Bearer <token>
 * @returns List of customers and count
 */
router.get('/', authMiddleware_1.authenticate, customerController.getAllCustomers);
/**
 * GET /customers/:id
 * Get a specific customer by ID (protected - requires JWT)
 *
 * @header {string} Authorization - Bearer <token>
 * @param {number} id - Customer ID
 * @returns Customer details
 */
router.get('/:id', authMiddleware_1.authenticate, customerController.getCustomerById);
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
router.post('/', authMiddleware_1.authenticate, customerController.addCustomer);
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
router.put('/:id', authMiddleware_1.authenticate, customerController.updateCustomer);
/**
 * DELETE /customers/:id
 * Delete a customer (protected - requires JWT)
 *
 * @header {string} Authorization - Bearer <token>
 * @param {number} id - Customer ID
 * @returns Deleted customer
 */
router.delete('/:id', authMiddleware_1.authenticate, customerController.deleteCustomer);
exports.default = router;
//# sourceMappingURL=customerRoutes.js.map