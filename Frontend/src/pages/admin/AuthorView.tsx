import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import type { Author } from "../../types/author";
import { toast } from "react-toastify";

export default function AuthorView() {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAuthors = async () => {
        setIsLoading(true);
        try {
            const response = await api.get("/authors");
            setAuthors(response.data.data);
            setError(null);
        } catch {
            setError("No se pudieron cargar los autores. Intenta de nuevo.");
            toast.error("Error al cargar los autores");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    const handleDelete = async (id: number) => {
        try {
        await api.delete(`/authors/${id}`);
        setAuthors(authors.filter((author) => author.id !== id));
        toast.success("¡Autor eliminado correctamente!");
        } catch (error: any) {
            if (error.response?.status === 422) {
            const errorMessage = "No se puede eliminar un autor con libros asociados.";
            setError(errorMessage);
            toast.error(errorMessage);
            } else if (error.response?.status === 404) {
                setError("Autor no encontrado.");
                toast.error("Autor no encontrado.");
            } else {
                setError("Error al eliminar el autor");
                toast.error("Ocurrió un error al eliminar. Inténtalo de nuevo.");
            }
        }
    };

    if (isLoading) return <div className="text-center p-4">Cargando autores...</div>;

    if (authors.length === 0) return <div className="text-center p-4">No hay autores disponibles.</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-red text-center mb-6">
                Lista de Autores
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {authors.map((author) => (
                <div
                    key={author.id}
                    className="border border-gray-400 rounded p-4 bg-beige shadow hover:shadow-lg transition"
                >
                    <h3 className="text-lg font-medium text-center mb-4">{author.name}</h3>
                    <div className="flex justify-center gap-4 text-white">
                        <button
                            onClick={() => navigate(`/admin/autores/editar/${author.id}`)}
                            className="bg-orange px-4 py-2 rounded hover:bg-orange-dark"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDelete(author.id)}
                            className="bg-red px-4 py-2 rounded hover:bg-red-dark"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}