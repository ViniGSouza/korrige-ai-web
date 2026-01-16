import { useMutation } from "@tanstack/react-query";
import { subscriptionApi } from "../api";
import { toast } from "@/shared/lib/toast";

export function usePortal() {
  return useMutation({
    mutationFn: subscriptionApi.createPortalSession,
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: () => {
      toast.error("Erro ao abrir portal. Tente novamente.");
    },
  });
}
