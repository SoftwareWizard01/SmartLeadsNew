import { Request } from 'express';
import { JwtPayload } from '../utils/jwt';

// Augment the Express Request type so req.user is typed throughout
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
