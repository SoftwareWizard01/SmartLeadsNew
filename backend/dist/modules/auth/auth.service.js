"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AppError_1 = require("../../shared/utils/AppError");
const jwt_1 = require("../../shared/utils/jwt");
const auth_repository_1 = require("./auth.repository");
class AuthService {
    repo;
    constructor() {
        this.repo = new auth_repository_1.AuthRepository();
    }
    async register(dto) {
        const exists = await this.repo.emailExists(dto.email);
        if (exists) {
            throw new AppError_1.AppError('An account with this email already exists.', 409);
        }
        const user = await this.repo.create(dto);
        return this.buildAuthResponse(user);
    }
    async login(dto) {
        const user = await this.repo.findByEmail(dto.email);
        if (!user) {
            throw new AppError_1.AppError('Invalid email or password.', 401);
        }
        const isMatch = await user.comparePassword(dto.password);
        if (!isMatch) {
            throw new AppError_1.AppError('Invalid email or password.', 401);
        }
        return this.buildAuthResponse(user);
    }
    async getMe(userId) {
        const user = await this.repo.findById(userId);
        if (!user) {
            throw new AppError_1.AppError('User not found.', 404);
        }
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }
    buildAuthResponse(user) {
        const token = (0, jwt_1.signToken)({
            userId: user._id.toString(),
            role: user.role,
        });
        return {
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map