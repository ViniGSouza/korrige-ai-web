import type { AppRouteObject } from "@/shared/types";
import { PricingPage } from "../pages";

export const subscriptionRoutes: AppRouteObject[] = [
  {
    path: "/pricing",
    element: <PricingPage />,
  },
];
