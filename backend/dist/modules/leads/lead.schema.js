"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadQuerySchema = exports.updateStatusSchema = exports.updateLeadSchema = exports.createLeadSchema = void 0;
const zod_1 = require("zod");
const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'lost'];
const LEAD_SOURCES = ['website', 'instagram', 'referral'];
exports.createLeadSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'Name is required' })
        .min(2, 'Name must be at least 2 characters')
        .max(100)
        .trim(),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address')
        .toLowerCase(),
    status: zod_1.z.enum(LEAD_STATUSES).default('new'),
    source: zod_1.z.enum(LEAD_SOURCES, { required_error: 'Source is required' }),
    notes: zod_1.z.string().max(1000).optional().default(''),
});
exports.updateLeadSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100).trim().optional(),
    email: zod_1.z.string().email().toLowerCase().optional(),
    status: zod_1.z.enum(LEAD_STATUSES).optional(),
    source: zod_1.z.enum(LEAD_SOURCES).optional(),
    notes: zod_1.z.string().max(1000).optional(),
});
exports.updateStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(LEAD_STATUSES, { required_error: 'Status is required' }),
});
exports.leadQuerySchema = zod_1.z.object({
    status: zod_1.z.enum(LEAD_STATUSES).optional(),
    source: zod_1.z.enum(LEAD_SOURCES).optional(),
    search: zod_1.z.string().optional(),
    sort: zod_1.z.enum(['latest', 'oldest']).default('latest'),
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(10),
});
//# sourceMappingURL=lead.schema.js.map