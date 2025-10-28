import { authApi } from "../api/authApi";
import type { LoginRequest, LoginResponse, User } from "../types";
import { storage } from "@/core/storage";

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const data = { email, password };
    const apiResponse = await authApi.login(data);

    storage.set("token", apiResponse.idToken);
    storage.set("accessToken", apiResponse.accessToken);
    storage.set("refreshToken", apiResponse.refreshToken);

    try {
      const user = await authApi.getMe();
      storage.set("user", user);

      return {
        user,
        token: apiResponse.idToken,
      };
    } catch (error) {
      const basicUser: User = {
        userId: email,
        name: email.split("@")[0],
        email: email,
        id: email,
      };
      storage.set("user", basicUser);

      return {
        user: basicUser,
        token: apiResponse.idToken,
      };
    }
  },

  logout: (): void => {
    storage.remove("token");
    storage.remove("accessToken");
    storage.remove("refreshToken");
    storage.remove("user");
  },

  getMe: async (): Promise<User> => {
    const user = await authApi.getMe();
    storage.set("user", user);
    return user;
  },

  isAuthenticated: (): boolean => {
    return !!storage.get<string>("token");
  },

  getCurrentUser: (): User | null => {
    return storage.get<User>("user");
  },
};
