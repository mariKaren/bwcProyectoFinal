import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../services/api"; // Es la instancia configurada con axios
import type { ReactNode } from "react";
import type { User } from "../types/user";

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); 

    const isAuthenticated = !!user;
    const isAdmin = user?.role === "admin";
    
    const updateAuthData = (response: any, token: string) => {
        if (!response?.data || !token || response.status !== "success") {
            throw new Error("Respuesta de autenticación inválida");
        }
        setUser(response.data)
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", token);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            verifyToken();
        } else {
            setLoading(false); // no hay necesidad de verificar si no hay token
        }
    }, []);

    const verifyToken = async () => {
        try {
            const response = await api.get("/user"); // endpoint para obtener el usuario autenticado
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("token", localStorage.getItem("token") || "");
        } catch (error) {
            console.error("Token no válido, cerrando sesión");
            logout();
        }finally {
            setLoading(false); // marca la carga como completa
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await api.post("/login", { email, password });
            updateAuthData(response.data, response.data.token);
        } catch (error) {
            console.error("Error en login", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        setLoading(true);
        try {
            const response = await api.post("/register", { name, email, password });
            updateAuthData(response.data, response.data.token);
        } catch (error) {
            console.error("Error en registro", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        api.post("/logout").catch((error) => console.error("Error al cerrar sesión", error));
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, login, register, logout, isAuthenticated, isAdmin,loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};