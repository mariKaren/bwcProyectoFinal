import { useAuth } from "../context/useAuth";

import { Navigate } from "react-router";

export const Genres = () => {
    const { isAuthenticated, isAdmin } = useAuth();

    console.log("Estado en Genres:", { isAuthenticated, isAdmin });
    if (!isAuthenticated) {
        return <Navigate to="/login" />; // Redirige al login si no está autenticado
    }

    if (!isAdmin) {
        return <p>No autorizado: No eres admin</p>;
    }
    
    return <div>Contenido exclusivo para admins</div>;
};