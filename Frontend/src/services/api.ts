import axios from "axios";

// Instancia base de Axios
const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Interceptor para agregar token si existe
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        switch (status) {
        case 401:
            console.warn("No autorizado, cerrando sesión");
            localStorage.removeItem("token");
            break;
        case 403:
            console.warn("Prohibido, sin permisos");
            break;
        case 404:
            console.warn("Recurso no encontrado");
            break;
        case 500:
            console.error("Error interno del servidor");
            break;
        default:
            console.error("Error desconocido", error);
        }

        return Promise.reject(error);
    }
);

export default api;