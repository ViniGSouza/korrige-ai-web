import { Navigate, useLocation } from "react-router-dom";
import { storage } from "@/core/storage";
import { useAuthUser } from "@/domain/auth/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = storage.get<string>("token");
  const user = storage.get("user");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (token && user) {
    return <>{children}</>;
  }

  const { isLoading, error } = useAuthUser();

  if (error) {
    storage.remove("token");
    storage.remove("accessToken");
    storage.remove("refreshToken");
    storage.remove("user");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user && isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return <>{children}</>;
};
