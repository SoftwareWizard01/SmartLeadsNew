import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * Wraps an async route handler and forwards any thrown errors to next().
 * Eliminates try/catch boilerplate in every controller.
 */
export const asyncHandler =
  (fn: AsyncRouteHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
