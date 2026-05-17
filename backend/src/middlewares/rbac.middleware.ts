import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AppError } from '../shared/utils/AppError';
import { JwtPayload } from '../shared/utils/jwt';

type Role = JwtPayload['role'];

/**
 * Factory that returns a middleware enforcing that req.user.role
 * is one of the allowed roles. Must be used AFTER authenticate.
 *
 * @example
 * router.delete('/:id', authenticate, authorize('admin'), controller.deleteLead);
 */
export const authorize = (...allowedRoles: Role[]): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Not authenticated.', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          `Access denied. Required role: [${allowedRoles.join(', ')}].`,
          403
        )
      );
    }

    next();
  };
};
