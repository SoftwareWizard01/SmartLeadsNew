"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_1 = require("mongoose");
const AppError_1 = require("../shared/utils/AppError");
const env_1 = require("../config/env");
const globalErrorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }
    if (err instanceof zod_1.ZodError) {
        res.status(422).json({
            success: false,
            message: 'Validation failed.',
            errors: err.flatten().fieldErrors,
        });
        return;
    }
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        res.status(401).json({ success: false, message: 'Token has expired.' });
        return;
    }
    if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        res.status(401).json({ success: false, message: 'Invalid token.' });
        return;
    }
    if (typeof err === 'object' &&
        err !== null &&
        err.code === 11000) {
        const field = Object.keys(err.keyValue ?? {})[0];
        res.status(409).json({
            success: false,
            message: `${field} already exists.`,
        });
        return;
    }
    if (err instanceof mongoose_1.Error.ValidationError) {
        const messages = Object.values(err.errors).map((e) => e.message);
        res.status(422).json({ success: false, message: messages.join(', ') });
        return;
    }
    console.error('UNHANDLED ERROR:', err);
    res.status(500).json({
        success: false,
        message: env_1.env.NODE_ENV === 'development'
            ? (err instanceof Error ? err.message : String(err))
            : 'An unexpected error occurred.',
    });
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=error.middleware.js.map