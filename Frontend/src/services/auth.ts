import api from "./api";

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export const login = async (payload: LoginPayload) => {
    const response = await api.post("/login", payload);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
};

export const register = async (payload: RegisterPayload) => {
    const response = await api.post("/register", payload);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
};

export const logout = async () => {
    await api.post("/logout");
    localStorage.removeItem("token");
};