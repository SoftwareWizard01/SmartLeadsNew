import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';

type ValidationTarget = 'body' | 'query' | 'params';

/**
 * Validates req[target] against a Zod schema.
 * On failure, returns 422 with field-level errors.
 * On success, replaces req[target] with the parsed (coerced) value.
 */
export const validate = (
  schema: ZodSchema,
  target: ValidationTarget = 'body'
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const errors = (result.error as ZodError).flatten().fieldErrors;
      res.status(422).json({
        success: false,
        message: 'Validation failed.',
        errors,
      });
      return;
    }

    // Replace with parsed + coerced values (e.g., page: "2" → 2)
    (req as unknown as Record<string, unknown>)[target] = result.data;
    next();
  };
};
