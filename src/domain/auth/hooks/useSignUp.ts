import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import type { SignUpRequest } from "../types";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpRequest) => authApi.signUp(data),
  });
};
