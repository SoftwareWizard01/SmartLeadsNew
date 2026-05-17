import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["admin", "sales"]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    role: "admin" | "sales";
}, {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "sales" | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth.schema.d.ts.map