import { useNavigate } from "react-router";

interface NotFoundProps {
    message?: string;
}

export default function NotFound({ message = "Página no encontrada" }: NotFoundProps) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-beige p-4">
            <div className="max-w-md mx-auto text-center space-y-6">
                <h1 className="text-4xl font-bold text-red">Error 404</h1>
                <p className="text-lg text-gray-600">{message}</p>
                <button
                onClick={() => navigate("/libros/busqueda")}
                className="bg-orange text-white px-6 py-3 rounded font-semibold hover:bg-orange-dark"
                >
                Volver a busqueda
                </button>
            </div>
        </div>
    );
}