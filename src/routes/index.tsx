import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRoute, PageLoader } from "@/shared/components";
import type { AppRouteObject } from "@/shared/types";
import { authRoutes } from "@/domain/auth/routes";
import { dashboardRoutes } from "@/domain/dashboard/routes";
import { essaysRoutes } from "@/domain/essays/routes";

const LandingPage = lazy(() =>
  import("@/pages/public/LandingPage").then((module) => ({
    default: module.LandingPage,
  }))
);
const AppLayout = lazy(() =>
  import("@/layouts").then((module) => ({ default: module.AppLayout }))
);

export const routes: AppRouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <LandingPage />
      </Suspense>
    ),
  },
  ...authRoutes,
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <AppLayout />
        </Suspense>
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
