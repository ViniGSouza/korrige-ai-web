import { api } from "@/api";
import type {
  LoginRequest,
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
    const { data: signUpResponse } = response.data;
    return signUpResponse;
  },

  login: async (data: LoginRequest): Promise<CognitoLoginResponse> => {
    const response = await api.post<ApiResponse<CognitoLoginResponse>>(
      "/auth/sign-in",
      data
    );
    const { data: loginResponse } = response.data;
    return loginResponse;
  },

  confirmSignUp: async (
    data: ConfirmSignUpRequest
  ): Promise<ConfirmSignUpResponse> => {
    const response = await api.post<ApiResponse<ConfirmSignUpResponse>>(
      "/auth/confirm-sign-up",
      data
    );
    const { data: confirmSignUpResponse } = response.data;
    return confirmSignUpResponse;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>("/users/profile");
    const { data: user } = response.data;
    return user;
  },
};
