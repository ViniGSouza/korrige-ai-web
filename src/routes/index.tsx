import { Navigate } from "react-router-dom";
import { AppLayout } from "@/layouts";
import { ProtectedRoute } from "@/shared/components";
import type { AppRouteObject } from "@/shared/types";
import { authRoutes } from "@/domain/auth/routes";
import { dashboardRoutes } from "@/domain/dashboard/routes";
import { essaysRoutes } from "@/domain/essays/routes";
import { LandingPage } from "@/pages/public/LandingPage";

export const routes: AppRouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
  ...authRoutes,
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      ...dashboardRoutes,
      ...essaysRoutes,
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
];
