import api from "@/api/apiConfig";
import type { CheckoutSessionResponse, PortalSessionResponse } from "../types";

export const subscriptionApi = {
  createCheckoutSession: async (): Promise<CheckoutSessionResponse> => {
    const response = await api.post<CheckoutSessionResponse>("/subscriptions/checkout");
    return response.data;
  },

  createPortalSession: async (): Promise<PortalSessionResponse> => {
    const response = await api.post<PortalSessionResponse>("/subscriptions/portal");
    return response.data;
  },
};
