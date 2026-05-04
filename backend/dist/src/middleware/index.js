"use strict";
/**
 * Middleware Index
 * Export all middleware from a single entry point
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authenticate = void 0;
var authMiddleware_1 = require("./authMiddleware");
Object.defineProperty(exports, "authenticate", { enumerable: true, get: function () { return authMiddleware_1.authenticate; } });
Object.defineProperty(exports, "optionalAuth", { enumerable: true, get: function () { return authMiddleware_1.optionalAuth; } });
//# sourceMappingURL=index.js.map