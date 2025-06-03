import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.id_rol)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}
