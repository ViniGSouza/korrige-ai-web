import type { AppRouteObject } from "@/shared/types";
import { LoginPage, SignUpPage, ConfirmSignUpPage } from "../pages";
import { Navigate } from "react-router-dom";

export const authRoutes: AppRouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/confirm-sign-up",
    element: <ConfirmSignUpPage />,
  },
];
