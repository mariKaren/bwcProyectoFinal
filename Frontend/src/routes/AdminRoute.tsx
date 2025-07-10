import { useAuth } from "../context/useAuth";
import { Navigate, Outlet } from "react-router";

export const AdminRoute = () => {
    const { isAuthenticated, isAdmin,loading } = useAuth();//loading para esperar la respuesta de la autentificacion
    if (loading) {
        return <p className="text-center mt-10 text-gray">Verificando permisos...</p>;
    }
    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    if(!loading && !isAdmin) return <Navigate to="/" replace />;

    return <Outlet />;
};