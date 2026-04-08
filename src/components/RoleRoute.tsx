import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  allowedRoles: string[];
}

export const RoleRoute = ({ allowedRoles }: Props) => {
  const { role } = useAuth();

  if (!allowedRoles.includes(role || "")) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};