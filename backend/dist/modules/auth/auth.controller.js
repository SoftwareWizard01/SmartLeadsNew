"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const apiResponse_1 = require("../../shared/utils/apiResponse");
const asyncHandler_1 = require("../../shared/utils/asyncHandler");
const authService = new auth_service_1.AuthService();
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dto = req.body;
    const result = await authService.register(dto);
    (0, apiResponse_1.sendSuccess)(res, result, 'Account created successfully.', 201);
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dto = req.body;
    const result = await authService.login(dto);
    (0, apiResponse_1.sendSuccess)(res, result, 'Login successful.');
});
exports.getMe = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.userId;
    const user = await authService.getMe(userId);
    (0, apiResponse_1.sendSuccess)(res, user, 'User retrieved.');
});
//# sourceMappingURL=auth.controller.js.map