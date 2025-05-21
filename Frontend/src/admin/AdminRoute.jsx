import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

function AdminRoute() {
    const [adminToken] = useLocalStorage("admin_token", null);
    const isLoggedIn = Boolean(adminToken);

    return isLoggedIn ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

export default AdminRoute;
