import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../services/api"; // Es la instancia configurada con axios
import type { ReactNode } from "react";
import type { User } from "../types/User";

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);

    const isAuthenticated = !!user;
    const isAdmin = user?.role === "admin";

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            // Verificar el token con el backend
            console.log("Usuario actualizado:", user, isAuthenticated, isAdmin);
            //////////////////////77
            verifyToken();
        }
    }, []);

    const verifyToken = async () => {
        try {
            const response = await api.get("/user"); // Endpoint para obtener el usuario autenticado
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
            console.error("Token no válido, cerrando sesión");
            logout();
        }
    };

    const login = async (email: string, password: string) => {
        const response = await api.post("/login", { email, password });
        const { data, token } = response.data;
        setUser(data);
        console.log("Usuario actualizado en AuthProvider:", user, isAuthenticated, isAdmin);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", token);
    };

    const register = async (name: string, email: string, password: string) => {
        const response = await api.post("/register", { name, email, password });
        const { data, token } = response.data;
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", token);
    };

    const logout = () => {
        api.post("/logout").catch((error) => console.error("Error al cerrar sesión", error));
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, login, register, logout, isAuthenticated, isAdmin }}
        >
            {children}
        </AuthContext.Provider>
    );
};