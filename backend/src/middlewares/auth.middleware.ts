import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../shared/utils/jwt';
import { AppError } from '../shared/utils/AppError';

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Authentication required. No token provided.', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    next(new AppError('Invalid or expired token.', 401));
  }
};
