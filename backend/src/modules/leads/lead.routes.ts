import { Router } from 'express';
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  exportLeadsCsv,
} from './lead.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/rbac.middleware';
import { validate } from '../../middlewares/validate.middleware';
import {
  createLeadSchema,
  updateLeadSchema,
  leadQuerySchema,
} from './lead.schema';

const router = Router();

// All lead routes require authentication
router.use(authenticate);

// GET /leads?status=&source=&search=&sort=&page=&limit=
router.get('/', validate(leadQuerySchema, 'query'), getLeads);

// GET /leads/export/csv  — MUST be before /:id to avoid param collision
router.get('/export/csv', authorize('admin'), exportLeadsCsv);

// GET /leads/:id
router.get('/:id', getLeadById);

// POST /leads
router.post('/', authorize('admin', 'sales'), validate(createLeadSchema), createLead);

// PUT /leads/:id  — admin: full update | sales: status only (enforced in service)
router.put('/:id', authorize('admin', 'sales'), validate(updateLeadSchema), updateLead);

// DELETE /leads/:id  — admin only
router.delete('/:id', authorize('admin'), deleteLead);

export default router;
