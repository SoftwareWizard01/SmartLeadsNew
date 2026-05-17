"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapLeadToDto = void 0;
const mapLeadToDto = (lead) => ({
    id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    status: lead.status,
    source: lead.source,
    notes: lead.notes ?? '',
    createdBy: lead.createdBy.toString(),
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
});
exports.mapLeadToDto = mapLeadToDto;
//# sourceMappingURL=lead.types.js.map