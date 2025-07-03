import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router";

export function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const { login, register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        if (isLogin) {
            await login(email, password);
        } else {
            await register(name, email, password);
        }
        navigate("/libros/genero");
        } catch (error) {
        console.error("Error de autenticación", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white px-8 py-16 mx-6 m-x-450-sm  rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-center text-brown mb-6">
                {isLogin ? "Iniciar sesión" : "Registrarse"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-950"
                    />
                )}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-950"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-950"

                />
                <button
                    type="submit"
                    className="w-full bg-orange text-white py-2 rounded-lg hover:bg-yellow hover:text-red font-semibold transition-colors duration-400"
                >
                    {isLogin ? "Entrar" : "Registrarse"}
                </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                {isLogin ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}{" "}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-red hover:underline font-medium"
                >
                    {isLogin ? "Registrate" : "Iniciá sesión"}
                </button>
            </p>
        </div>
        </div>
    );
}