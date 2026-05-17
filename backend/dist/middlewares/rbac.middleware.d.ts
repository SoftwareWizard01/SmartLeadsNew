import { RequestHandler } from 'express';
import { JwtPayload } from '../shared/utils/jwt';
type Role = JwtPayload['role'];
export declare const authorize: (...allowedRoles: Role[]) => RequestHandler;
export {};
//# sourceMappingURL=rbac.middleware.d.ts.map