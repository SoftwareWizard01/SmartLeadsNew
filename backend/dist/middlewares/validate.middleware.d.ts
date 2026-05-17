import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';
type ValidationTarget = 'body' | 'query' | 'params';
export declare const validate: (schema: ZodSchema, target?: ValidationTarget) => RequestHandler;
export {};
//# sourceMappingURL=validate.middleware.d.ts.map