import { authApi } from "../api/authApi";
import type { LoginResponse, User } from "../types";
import { storage } from "@/core/storage";

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const data = { email, password };
    const apiResponse = await authApi.login(data);

    if (!apiResponse || !apiResponse.data) {
      console.error("Resposta inválida da API:", apiResponse);
      throw new Error("Resposta inválida do servidor");
    }

    const { idToken, accessToken, refreshToken } = apiResponse.data;

    if (!idToken || !accessToken || !refreshToken) {
      console.error("Tokens ausentes na resposta:", apiResponse.data);
      throw new Error("Tokens de autenticação não recebidos");
    }

    storage.set("token", idToken);
    storage.set("accessToken", accessToken);
    storage.set("refreshToken", refreshToken);

    try {
      const userResponse = await authApi.getMe();
      const user = userResponse.data;
      storage.set("user", user);

      return {
        user,
        token: idToken,
      };
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      const basicUser: User = {
        userId: email,
        name: email.split("@")[0],
        email: email,
        id: email,
      };
      storage.set("user", basicUser);

      return {
        user: basicUser,
        token: idToken,
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
    const userResponse = await authApi.getMe();
    const user = userResponse.data;
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
