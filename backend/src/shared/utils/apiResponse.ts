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

/**
 * Send a standardised success response.
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
): void => {
  const body: ApiSuccessResponse<T> = { success: true, message, data };
  res.status(statusCode).json(body);
};

/**
 * Send a paginated success response.
 */
export const sendPaginated = <T>(
  res: Response,
  data: T[],
  pagination: PaginationMeta,
  message = 'Success'
): void => {
  const body: PaginatedApiResponse<T> = {
    success: true,
    message,
    data,
    pagination,
  };
  res.status(200).json(body);
};

/**
 * Send a standardised error response.
 */
export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  errors?: Record<string, string[]> | string[]
): void => {
  const body: ApiErrorResponse = { success: false, message, ...(errors && { errors }) };
  res.status(statusCode).json(body);
};
