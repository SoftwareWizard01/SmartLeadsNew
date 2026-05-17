"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const AppError_1 = require("../shared/utils/AppError");
const authorize = (...allowedRoles) => {
    return (req, _res, next) => {
        if (!req.user) {
            return next(new AppError_1.AppError('Not authenticated.', 401));
        }
        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError_1.AppError(`Access denied. Required role: [${allowedRoles.join(', ')}].`, 403));
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=rbac.middleware.js.map