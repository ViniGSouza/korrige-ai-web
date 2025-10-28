import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { PageLoader } from "@/shared/components";

type AppRouteObject = RouteObject;

const EssaysListPage = lazy(() =>
  import("../pages").then((module) => ({ default: module.EssaysListPage }))
);
const NewEssayPage = lazy(() =>
  import("../pages").then((module) => ({ default: module.NewEssayPage }))
);
const EssayDetailPage = lazy(() =>
  import("../pages").then((module) => ({ default: module.EssayDetailPage }))
);

export const essaysRoutes: AppRouteObject[] = [
  {
    path: "essays",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <EssaysListPage />
          </Suspense>
        ),
      },
      {
        path: "new",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NewEssayPage />
          </Suspense>
        ),
      },
      {
        path: ":essayId",
        element: (
          <Suspense fallback={<PageLoader />}>
            <EssayDetailPage />
          </Suspense>
        ),
      },
    ],
  },
];
