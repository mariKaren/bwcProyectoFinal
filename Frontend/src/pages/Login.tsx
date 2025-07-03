import { useState } from "react";
import { login } from "../services/auth";

export function Login (){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const data = await login({ email, password });
        console.log("Login exitoso", data);
        // Redirigir o cambiar estado global
        } catch (error) {
        console.error("Error en login", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
        />
        <button type="submit">Iniciar sesión</button>
        </form>
    );
};
