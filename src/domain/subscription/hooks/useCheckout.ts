import { useMutation } from "@tanstack/react-query";
import { subscriptionApi } from "../api";
import { toast } from "@/shared/lib/toast";

export function useCheckout() {
  return useMutation({
    mutationFn: subscriptionApi.createCheckoutSession,
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: () => {
      toast.error("Erro ao iniciar checkout. Tente novamente.");
    },
  });
}
