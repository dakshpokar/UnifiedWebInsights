import apiClient from '../client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  login: (data: LoginRequest) => 
    apiClient.post<AuthResponse>('/auth/login', data),
  
  signup: (data: {firstName: string, lastName: string, email: string, password: string}) => 
    apiClient.post<AuthResponse>('/auth/signup', data),
  
  logout: () => apiClient.post('/auth/logout'),
};