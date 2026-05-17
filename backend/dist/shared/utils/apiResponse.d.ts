import { Response } from 'express';
export interface ApiSuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}
export interface ApiErrorResponse {
    success: false;
    message: string;
    errors?: Record<string, string[]> | string[];
}
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    pages: number;
}
export interface PaginatedApiResponse<T> extends ApiSuccessResponse<T[]> {
    pagination: PaginationMeta;
}
export declare const sendSuccess: <T>(res: Response, data: T, message?: string, statusCode?: number) => void;
export declare const sendPaginated: <T>(res: Response, data: T[], pagination: PaginationMeta, message?: string) => void;
export declare const sendError: (res: Response, message: string, statusCode?: number, errors?: Record<string, string[]> | string[]) => void;
//# sourceMappingURL=apiResponse.d.ts.map