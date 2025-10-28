import { lazy, Suspense } from "react";
import type { AppRouteObject } from "@/shared/types";
import { Navigate } from "react-router-dom";
import { PageLoader } from "@/shared/components";

const LoginPage = lazy(() =>
  import("../pages").then((module) => ({ default: module.LoginPage }))
);
const SignUpPage = lazy(() =>
  import("../pages").then((module) => ({ default: module.SignUpPage }))
);
const ConfirmSignUpPage = lazy(() =>
  import("../pages").then((module) => ({ default: module.ConfirmSignUpPage }))
);

export const authRoutes: AppRouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Suspense fallback={<PageLoader />}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: "/confirm-sign-up",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ConfirmSignUpPage />
      </Suspense>
    ),
  },
];
