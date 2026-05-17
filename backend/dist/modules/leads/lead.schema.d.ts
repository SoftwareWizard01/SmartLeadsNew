import { z } from 'zod';
export declare const createLeadSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<["new", "contacted", "qualified", "lost"]>>;
    source: z.ZodEnum<["website", "instagram", "referral"]>;
    notes: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status: "new" | "contacted" | "qualified" | "lost";
    name: string;
    email: string;
    source: "website" | "instagram" | "referral";
    notes: string;
}, {
    name: string;
    email: string;
    source: "website" | "instagram" | "referral";
    status?: "new" | "contacted" | "qualified" | "lost" | undefined;
    notes?: string | undefined;
}>;
export declare const updateLeadSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["new", "contacted", "qualified", "lost"]>>;
    source: z.ZodOptional<z.ZodEnum<["website", "instagram", "referral"]>>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "new" | "contacted" | "qualified" | "lost" | undefined;
    name?: string | undefined;
    email?: string | undefined;
    source?: "website" | "instagram" | "referral" | undefined;
    notes?: string | undefined;
}, {
    status?: "new" | "contacted" | "qualified" | "lost" | undefined;
    name?: string | undefined;
    email?: string | undefined;
    source?: "website" | "instagram" | "referral" | undefined;
    notes?: string | undefined;
}>;
export declare const updateStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["new", "contacted", "qualified", "lost"]>;
}, "strip", z.ZodTypeAny, {
    status: "new" | "contacted" | "qualified" | "lost";
}, {
    status: "new" | "contacted" | "qualified" | "lost";
}>;
export declare const leadQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["new", "contacted", "qualified", "lost"]>>;
    source: z.ZodOptional<z.ZodEnum<["website", "instagram", "referral"]>>;
    search: z.ZodOptional<z.ZodString>;
    sort: z.ZodDefault<z.ZodEnum<["latest", "oldest"]>>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    sort: "latest" | "oldest";
    limit: number;
    page: number;
    status?: "new" | "contacted" | "qualified" | "lost" | undefined;
    search?: string | undefined;
    source?: "website" | "instagram" | "referral" | undefined;
}, {
    status?: "new" | "contacted" | "qualified" | "lost" | undefined;
    sort?: "latest" | "oldest" | undefined;
    search?: string | undefined;
    limit?: number | undefined;
    source?: "website" | "instagram" | "referral" | undefined;
    page?: number | undefined;
}>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type LeadQueryInput = z.infer<typeof leadQuerySchema>;
//# sourceMappingURL=lead.schema.d.ts.map