import { z } from 'zod';

const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'lost'] as const;
const LEAD_SOURCES = ['website', 'instagram', 'referral'] as const;

export const createLeadSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters')
    .max(100)
    .trim(),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address')
    .toLowerCase(),
  status: z.enum(LEAD_STATUSES).default('new'),
  source: z.enum(LEAD_SOURCES, { required_error: 'Source is required' }),
  notes: z.string().max(1000).optional().default(''),
});

export const updateLeadSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  email: z.string().email().toLowerCase().optional(),
  status: z.enum(LEAD_STATUSES).optional(),
  source: z.enum(LEAD_SOURCES).optional(),
  notes: z.string().max(1000).optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(LEAD_STATUSES, { required_error: 'Status is required' }),
});

export const leadQuerySchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  source: z.enum(LEAD_SOURCES).optional(),
  search: z.string().optional(),
  sort: z.enum(['latest', 'oldest']).default('latest'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type LeadQueryInput = z.infer<typeof leadQuerySchema>;
