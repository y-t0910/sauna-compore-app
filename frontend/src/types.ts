export interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface Sauna {
  id: number;
  name: string;
  location: string;
}

export interface LogoutResponse {
  message: string;
}
export interface DeleteAccountRequest {
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export interface DeleteAccountResponse {
  success: boolean;
  message: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserResponse {
  success: boolean;
  user?: User;
  message?: string;
}