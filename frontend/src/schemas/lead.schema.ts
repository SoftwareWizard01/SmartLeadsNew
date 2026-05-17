import { z } from 'zod';
import { LEAD_STATUSES, LEAD_SOURCES } from '../lib/constants';

export const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  status: z.enum(LEAD_STATUSES).default('new'),
  source: z.enum(LEAD_SOURCES, { required_error: 'Source is required' }),
  notes: z.string().max(1000).optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
