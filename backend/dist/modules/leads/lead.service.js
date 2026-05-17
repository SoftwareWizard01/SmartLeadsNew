"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadService = void 0;
const AppError_1 = require("../../shared/utils/AppError");
const lead_repository_1 = require("./lead.repository");
const lead_types_1 = require("./lead.types");
class LeadService {
    repo;
    constructor() {
        this.repo = new lead_repository_1.LeadRepository();
    }
    async getLeads(filters) {
        const { leads, pagination } = await this.repo.findAll(filters);
        return {
            leads: leads.map(lead_types_1.mapLeadToDto),
            pagination,
        };
    }
    async getLeadById(id) {
        const lead = await this.repo.findById(id);
        if (!lead)
            throw new AppError_1.AppError('Lead not found.', 404);
        return (0, lead_types_1.mapLeadToDto)(lead);
    }
    async createLead(dto) {
        const lead = await this.repo.create(dto);
        return (0, lead_types_1.mapLeadToDto)(lead);
    }
    async updateLead(id, dto, role) {
        const exists = await this.repo.findById(id);
        if (!exists)
            throw new AppError_1.AppError('Lead not found.', 404);
        const updatePayload = role === 'sales' ? { status: dto.status } : dto;
        const updated = await this.repo.updateById(id, updatePayload);
        if (!updated)
            throw new AppError_1.AppError('Failed to update lead.', 500);
        return (0, lead_types_1.mapLeadToDto)(updated);
    }
    async deleteLead(id) {
        const deleted = await this.repo.deleteById(id);
        if (!deleted)
            throw new AppError_1.AppError('Lead not found.', 404);
    }
    async getLeadsForExport(filters) {
        return this.repo.findAllForExport(filters);
    }
}
exports.LeadService = LeadService;
//# sourceMappingURL=lead.service.js.map