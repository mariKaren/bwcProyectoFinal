import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router";

export function useAuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});//errores propios del formulario
    const [generalError, setGeneralError] = useState("");//errores del backend, como mail ya existente o credenciales invalidas
    const navigate = useNavigate();
    const { login, register } = useAuth();

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Correo electrónico inválido";
        }

        if (!password) {
        newErrors.password = "La contraseña es obligatoria";
        } else if (!isLogin && password.length < 8) {
        newErrors.password = "Debe tener al menos 8 caracteres";
        }

        if (!isLogin && !name.trim()) {
        newErrors.name = "El nombre es obligatorio";
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setGeneralError("");
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
        if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
            navigate("/wishlist");
        } catch (error: any) {
            if (error.response?.status === 401) {
                setGeneralError("Correo o contraseña incorrectos.");
            } else if (error.response?.status === 422) {
                setGeneralError("Datos inválidos. Verificá el formulario.");
            } else {
                setGeneralError("Ocurrió un error inesperado.");
            }
            console.error("Error de autenticación", error);
        }
    };

    return {
        isLogin,
        setIsLogin,
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        errors,
        setErrors,
        generalError,
        setGeneralError,
        handleSubmit,
    };
}