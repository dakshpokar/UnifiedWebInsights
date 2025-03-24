import apiClient from '../client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User
}

export const authService = {
  login: (data: LoginRequest) => 
    apiClient.post<AuthResponse>('/auth/login', data),
  
  signup: (data: {firstName: string, lastName: string, email: string, password: string}) => 
    apiClient.post<AuthResponse>('/auth/signup', data),
  
  logout: () => apiClient.post('/auth/logout'),
};