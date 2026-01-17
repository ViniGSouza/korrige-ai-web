import { api, type ApiResponse } from "@/api";
import type { CheckoutSessionResponse, PortalSessionResponse } from "../types";

export const subscriptionApi = {
  createCheckoutSession: async (): Promise<CheckoutSessionResponse> => {
    const response = await api.post<ApiResponse<CheckoutSessionResponse>>("/subscriptions/checkout");
    return response.data.data;
  },

  createPortalSession: async (): Promise<PortalSessionResponse> => {
    const response = await api.post<ApiResponse<PortalSessionResponse>>("/subscriptions/portal");
    return response.data.data;
  },
};
