"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const user_model_1 = require("../../models/user.model");
class AuthRepository {
    async findByEmail(email) {
        return user_model_1.User.findOne({ email }).select('+password');
    }
    async findById(id) {
        return user_model_1.User.findById(id);
    }
    async create(data) {
        return user_model_1.User.create(data);
    }
    async emailExists(email) {
        const count = await user_model_1.User.countDocuments({ email });
        return count > 0;
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map