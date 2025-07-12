import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import type { Author } from "../../types/author";
import { genres } from "../../types/genres";
import { toast } from 'react-toastify';

export default function BookCreate() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        author_id: "",
        genre: "",
        publication_date: "",
        description: "",
    });
    const [authors, setAuthors] = useState<Author[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});//errores relacionados con campos de este formulario
    const [error, setError] = useState<string | null>(null);//error relacionado con la carga de autores y con la creacion del libro
    const [isLoadingAuthors, setIsLoadingAuthors] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchAuthors = async () => {
        setIsLoadingAuthors(true);
        try {
            const response = await api.get("/authors");
            setAuthors(response.data.data);
            setError(null);
        } catch {
            setError("No se pudieron cargar los autores. Intenta de nuevo.");
        } finally {
            setIsLoadingAuthors(false);
        }
    };
    useEffect(() => {
        fetchAuthors();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);
        // Validación en el frontend
        const newErrors: { [key: string]: string } = {};
        if (!form.title) newErrors.title = "El título es obligatorio";
        if (!form.author_id) newErrors.author_id = "Debes seleccionar un autor";
        if (!form.publication_date) newErrors.publication_date = "La fecha de publicación es obligatoria";
        if (!form.genre) newErrors.genre = "Debes seleccionar un género";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            await api.post("/books", form);
            toast.success("¡Libro creado correctamente!")
            navigate("/admin");
        } catch (error:any) {
            if (error.response?.status === 422) {
            setErrors(error.response.data.errors);
            } else {
            setError("Error al crear el libro");
            toast.error("Ocurrió un error. Inténtelo de nuevo.")
            }
        }finally{
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-red text-center mb-4">Crear Libro</h2>
            {error && <p className="text-red-500 text-center bg-beige text-md mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-medium mb-2">Título</label>
                    <input
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.title && <p className="text-red-500 text-sm mb-4">{errors.title}</p>}
                </div>

                <div>
                    <label htmlFor="author" className="block font-medium mb-2">Autor</label>
                    <div className="flex gap-2 items-center">
                        <select
                        id="author"
                        name="author_id"
                        value={form.author_id}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        >
                            <option value="">-- Selecciona un autor --</option>
                            {authors.length > 0 ? (
                                authors.map((author) => (
                                    <option key={author.id} value={author.id}>
                                    {author.name}
                                    </option>
                                ))
                                ) : (
                                <option value="">No hay autores disponibles</option>
                                )}
                        </select>
                        <button
                        type="button"
                        onClick={() => window.open("/admin/autores/crear", "_blank")}
                        className="text-orange border hover:bg-beige px-2 py-1 rounded text-sm"
                        >
                            Crear nuevo autor
                        </button>
                        <button
                            type="button"
                            onClick={fetchAuthors}
                            disabled={isLoadingAuthors}
                            className={`text-sm text-green-700 border px-2 py-1 rounded hover:bg-green-100 ${
                                isLoadingAuthors ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            >
                            {isLoadingAuthors ? "Cargando..." : "Recargar autores"}
                        </button>
                    </div>
                    {errors.author_id && <p className="text-red-500 text-sm mb-4">{errors.author_id}</p>}
                </div>

                <div>
                    <label htmlFor="genre" className="block font-medium mb-2">Género</label>
                    <select
                        id="genre"
                        name="genre"
                        value={form.genre}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">-- Selecciona un género --</option>
                        {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                        ))}
                    </select>
                    {errors.genre && <p className="text-red-500 text-sm mb-4">{errors.genre}</p>}
                </div>

                <div>
                    <label htmlFor="publication_date" className="block font-medium mb-2">Fecha de publicación</label>
                    <input
                        id="publication_date"
                        type="date"
                        name="publication_date"
                        value={form.publication_date}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.publication_date && (
                        <p className="text-red-500 text-sm mb-4">{errors.publication_date}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="description" className="block font-medium mb-2">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        rows={4}
                    />
                </div>

                <div className="text-center">
                    <button type="submit" disabled={isSubmitting}
                    className={`bg-orange text-white px-6 py-2 font-semibold rounded hover:bg-orange-dark ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    >
                    {isSubmitting ? "Creando..." : "Crear Libro"}
                    </button>
                </div>
            </form>
        </div>
    );
}