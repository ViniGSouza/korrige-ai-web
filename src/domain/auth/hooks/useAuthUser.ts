import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { storage } from "@/core";
import type { User } from "../types";

const AUTH_USER_KEY = ["auth", "me"];

export const useAuthUser = () => {
  const token = storage.get("token");
  const cachedUser = storage.get<User>("user");

  return useQuery<User, Error>({
    queryKey: AUTH_USER_KEY,
    queryFn: () => authService.getMe(),
    retry: false,
    enabled: !!token,
    initialData: cachedUser ?? undefined,
    staleTime: 5 * 60 * 1000, // Considera dados válidos por 5 minutos
    refetchOnWindowFocus: false,
  });
};
