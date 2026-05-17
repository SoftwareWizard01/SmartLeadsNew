import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Error as MongooseError } from 'mongoose';
import { AppError } from '../shared/utils/AppError';
import { env } from '../config/env';

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  // ── Operational errors (expected, user-facing) ───────────────────────────
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // ── Zod validation errors ─────────────────────────────────────────────────
  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      message: 'Validation failed.',
      errors: err.flatten().fieldErrors,
    });
    return;
  }

  // ── JWT errors ───────────────────────────────────────────────────────────
  if (err instanceof TokenExpiredError) {
    res.status(401).json({ success: false, message: 'Token has expired.' });
    return;
  }

  if (err instanceof JsonWebTokenError) {
    res.status(401).json({ success: false, message: 'Invalid token.' });
    return;
  }

  // ── Mongoose duplicate key ───────────────────────────────────────────────
  if (
    typeof err === 'object' &&
    err !== null &&
    (err as { code?: number }).code === 11000
  ) {
    const field = Object.keys((err as { keyValue?: object }).keyValue ?? {})[0];
    res.status(409).json({
      success: false,
      message: `${field} already exists.`,
    });
    return;
  }

  // ── Mongoose validation error ────────────────────────────────────────────
  if (err instanceof MongooseError.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message);
    res.status(422).json({ success: false, message: messages.join(', ') });
    return;
  }

  // ── Unknown / programmer errors ──────────────────────────────────────────
  console.error('UNHANDLED ERROR:', err);

  res.status(500).json({
    success: false,
    message:
      env.NODE_ENV === 'development'
        ? (err instanceof Error ? err.message : String(err))
        : 'An unexpected error occurred.',
  });
};
