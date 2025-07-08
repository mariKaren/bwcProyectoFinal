import { useAuthForm } from "../hooks/useAuthForm";

export function Login() {
    const {
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
    handleSubmit,} =useAuthForm();
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white px-8 py-16 mx-6 m-x-450-sm  rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-center text-brown mb-6">
                {isLogin ? "Iniciar sesión" : "Registrarse"}
            </h2>
                {generalError && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm mb-4">
                        {generalError}
                    </div>
                )}
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setErrors((prev) => ({ ...prev, name: "" }));
                                setGeneralError("");
                            }}
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-700"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                        )}
                    </div>
                )}
                <div>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((prev) => ({ ...prev, email: "" }));
                            setGeneralError("");
                        }}
                        className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-700"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                    )}
                    </div>
                <div>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors((prev) => ({ ...prev, password: "" }));
                            setGeneralError("");
                        }}
                        className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-700"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                    )}
                    </div>
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
                    onClick={() => {
                            setIsLogin(!isLogin);
                            setErrors({});
                            setGeneralError("");
                        }}
                    className="text-red hover:underline font-medium"
                >
                    {isLogin ? "Registrate" : "Iniciá sesión"}
                </button>
            </p>
        </div>
        </div>
    );
}