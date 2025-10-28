import { api, type ApiResponse } from "@/api";
import type {
  LoginRequest,
  CognitoLoginResponse,
  User,
  ConfirmSignUpRequest,
  ConfirmSignUpResponse,
  SignUpRequest,
  SignUpResponse,
} from "../types";

export const authApi = {
  signUp: async (data: SignUpRequest): Promise<ApiResponse<SignUpResponse>> => {
    const response = await api.post<ApiResponse<SignUpResponse>>(
      "/auth/sign-up",
      data
    );
    const { data: signUpResponse } = response;
    return signUpResponse;
  },

  login: async (
    data: LoginRequest
  ): Promise<ApiResponse<CognitoLoginResponse>> => {
    const response = await api.post<ApiResponse<CognitoLoginResponse>>(
      "/auth/sign-in",
      data
    );
    const { data: loginResponse } = response;
    return loginResponse;
  },

  confirmSignUp: async (
    data: ConfirmSignUpRequest
  ): Promise<ApiResponse<ConfirmSignUpResponse>> => {
    const response = await api.post<ApiResponse<ConfirmSignUpResponse>>(
      "/auth/confirm-sign-up",
      data
    );
    const { data: confirmSignUpResponse } = response;
    return confirmSignUpResponse;
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>("/users/profile");
    const { data: user } = response;
    return user;
  },
};
