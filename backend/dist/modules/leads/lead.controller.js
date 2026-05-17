"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportLeadsCsv = exports.deleteLead = exports.updateLead = exports.createLead = exports.getLeadById = exports.getLeads = void 0;
const lead_service_1 = require("./lead.service");
const apiResponse_1 = require("../../shared/utils/apiResponse");
const asyncHandler_1 = require("../../shared/utils/asyncHandler");
const csvExport_1 = require("../../shared/utils/csvExport");
const leadService = new lead_service_1.LeadService();
exports.getLeads = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const filters = req.query;
    const { leads, pagination } = await leadService.getLeads(filters);
    (0, apiResponse_1.sendPaginated)(res, leads, pagination, 'Leads retrieved successfully.');
});
exports.getLeadById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const lead = await leadService.getLeadById(req.params.id);
    (0, apiResponse_1.sendSuccess)(res, lead, 'Lead retrieved successfully.');
});
exports.createLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dto = {
        ...req.body,
        createdBy: req.user.userId,
    };
    const lead = await leadService.createLead(dto);
    (0, apiResponse_1.sendSuccess)(res, lead, 'Lead created successfully.', 201);
});
exports.updateLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dto = req.body;
    const role = req.user.role;
    const lead = await leadService.updateLead(req.params.id, dto, role);
    (0, apiResponse_1.sendSuccess)(res, lead, 'Lead updated successfully.');
});
exports.deleteLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await leadService.deleteLead(req.params.id);
    (0, apiResponse_1.sendSuccess)(res, null, 'Lead deleted successfully.');
});
exports.exportLeadsCsv = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { status, source, search } = req.query;
    const leads = await leadService.getLeadsForExport({
        status: status,
        source: source,
        search,
    });
    (0, csvExport_1.streamLeadsAsCsv)(res, leads);
});
//# sourceMappingURL=lead.controller.js.map