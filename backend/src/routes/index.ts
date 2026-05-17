import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import leadRoutes from '../modules/leads/lead.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/leads', leadRoutes);

export default router;
