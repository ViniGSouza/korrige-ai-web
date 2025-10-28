import { lazy, Suspense } from "react";
import type { AppRouteObject } from "@/shared/types";
import { PageLoader } from "@/shared/components";

const DashboardPage = lazy(() =>
  import("../pages").then((module) => ({ default: module.DashboardPage }))
);

export const dashboardRoutes: AppRouteObject[] = [
  {
    path: "dashboard",
    element: (
      <Suspense fallback={<PageLoader />}>
        <DashboardPage />
      </Suspense>
    ),
    handle: {
      title: "Dashboard",
      breadcrumb: "Início",
      icon: "LayoutDashboard",
    },
  },
];
