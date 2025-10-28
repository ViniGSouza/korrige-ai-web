import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import type { ConfirmSignUpRequest } from "../types";

export const useConfirmSignUp = () => {
  return useMutation({
    mutationFn: (data: ConfirmSignUpRequest) => authApi.confirmSignUp(data),
  });
};
