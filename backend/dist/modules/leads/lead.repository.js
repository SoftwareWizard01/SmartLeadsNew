"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRepository = void 0;
const lead_model_1 = require("./lead.model");
class LeadRepository {
    async findAll(filters) {
        const { status, source, search, sort = 'latest', page = 1, limit = 10, } = filters;
        const query = {};
        if (status)
            query.status = status;
        if (source)
            query.source = source;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }
        const sortOrder = sort === 'oldest' ? 1 : -1;
        const skip = (page - 1) * limit;
        const [leads, total] = await Promise.all([
            lead_model_1.Lead.find(query).sort({ createdAt: sortOrder }).skip(skip).limit(limit).lean(),
            lead_model_1.Lead.countDocuments(query),
        ]);
        return {
            leads,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findById(id) {
        return lead_model_1.Lead.findById(id).lean();
    }
    async create(data) {
        const lead = await lead_model_1.Lead.create(data);
        return lead.toObject();
    }
    async updateById(id, data) {
        return lead_model_1.Lead.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
    }
    async deleteById(id) {
        const result = await lead_model_1.Lead.findByIdAndDelete(id);
        return result !== null;
    }
    async findAllForExport(filters) {
        const query = {};
        if (filters.status)
            query.status = filters.status;
        if (filters.source)
            query.source = filters.source;
        if (filters.search) {
            query.$or = [
                { name: { $regex: filters.search, $options: 'i' } },
                { email: { $regex: filters.search, $options: 'i' } },
            ];
        }
        return lead_model_1.Lead.find(query).sort({ createdAt: -1 }).lean();
    }
}
exports.LeadRepository = LeadRepository;
//# sourceMappingURL=lead.repository.js.map