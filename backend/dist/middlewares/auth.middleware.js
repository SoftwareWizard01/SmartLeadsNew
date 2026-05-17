"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../shared/utils/jwt");
const AppError_1 = require("../shared/utils/AppError");
const authenticate = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError_1.AppError('Authentication required. No token provided.', 401));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch {
        next(new AppError_1.AppError('Invalid or expired token.', 401));
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map