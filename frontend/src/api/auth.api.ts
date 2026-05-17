import api from './axios';
import { AuthResponse } from '../types/auth.types';
import { LoginFormData, RegisterFormData } from '../schemas/auth.schema';
import { ApiSuccessResponse } from '../types/api.types';

export const authApi = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post<ApiSuccessResponse<AuthResponse>>('/auth/login', data);
    return response.data.data;
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await api.post<ApiSuccessResponse<AuthResponse>>('/auth/register', data);
    return response.data.data;
  },
};
