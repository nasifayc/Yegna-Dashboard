import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  console.log(`Is Authenticated: ${isAuthenticated}`);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
