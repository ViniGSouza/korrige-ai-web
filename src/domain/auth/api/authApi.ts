import { api } from "@/api";
import type {
  LoginRequest,
  LoginResponse,
  CognitoLoginResponse,
  User,
  ConfirmSignUpRequest,
  ConfirmSignUpResponse,
  SignUpRequest,
  SignUpResponse,
} from "../types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const authApi = {
  signUp: async (data: SignUpRequest): Promise<SignUpResponse> => {
    const response = await api.post<ApiResponse<SignUpResponse>>(
      "/auth/sign-up",
      data
    );
    return response.data;
  },

  login: async (data: LoginRequest): Promise<CognitoLoginResponse> => {
    const response = await api.post<ApiResponse<CognitoLoginResponse>>(
      "/auth/sign-in",
      data
    );
    return response.data;
  },

  confirmSignUp: async (
    data: ConfirmSignUpRequest
  ): Promise<ConfirmSignUpResponse> => {
    const response = await api.post<ApiResponse<ConfirmSignUpResponse>>(
      "/auth/confirm-sign-up",
      data
    );
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>("/users/profile");
    return response.data;
  },
};
