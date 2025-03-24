import { AuthResponse, LoginRequest, RegisterRequest } from '../../types/auth.types';
import apiClient from '../client';

export const authService = {
  login: (data: LoginRequest) => 
    apiClient.post<AuthResponse>('/auth/login', data),
  
  register: (data: RegisterRequest) => 
    apiClient.post<AuthResponse>('/auth/register', data),
  
  logout: () => apiClient.post('/auth/logout'),
};