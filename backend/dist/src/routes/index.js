"use strict";
/**
 * Routes Index
 * Export all routes from a single entry point
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = exports.authRoutes = void 0;
const authRoutes_1 = __importDefault(require("./authRoutes"));
exports.authRoutes = authRoutes_1.default;
const customerRoutes_1 = __importDefault(require("./customerRoutes"));
exports.customerRoutes = customerRoutes_1.default;
//# sourceMappingURL=index.js.map