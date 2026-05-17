import api from './axios';
import { PaginatedApiResponse, ApiSuccessResponse } from '../types/api.types';
import { Lead, LeadQueryFilters } from '../types/lead.types';
import { LeadFormData } from '../schemas/lead.schema';

export const leadsApi = {
  getLeads: async (filters: LeadQueryFilters): Promise<PaginatedApiResponse<Lead>> => {
    const response = await api.get<PaginatedApiResponse<Lead>>('/leads', { params: filters });
    return response.data;
  },

  getLeadById: async (id: string): Promise<Lead> => {
    const response = await api.get<ApiSuccessResponse<Lead>>(`/leads/${id}`);
    return response.data.data;
  },

  createLead: async (data: LeadFormData): Promise<Lead> => {
    const response = await api.post<ApiSuccessResponse<Lead>>('/leads', data);
    return response.data.data;
  },

  updateLead: async ({ id, data }: { id: string; data: Partial<LeadFormData> }): Promise<Lead> => {
    const response = await api.put<ApiSuccessResponse<Lead>>(`/leads/${id}`, data);
    return response.data.data;
  },

  deleteLead: async (id: string): Promise<void> => {
    await api.delete(`/leads/${id}`);
  },

  exportCsv: async (filters: Omit<LeadQueryFilters, 'page' | 'limit'>): Promise<Blob> => {
    const response = await api.get('/leads/export/csv', {
      params: filters,
      responseType: 'blob', // Important for file download
    });
    return response.data;
  },
};
