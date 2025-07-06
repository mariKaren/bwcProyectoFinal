import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { genres} from "../types/genres";
import api from "../services/api";

type Author = {
    id: number;
    name: string;
};

export function BookEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [bookData, setBookData] = useState({
        title: "",
        author_id: "",
        genre: "",
        publication_date: "",
        description: "",
    });

    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    function formatDate(dateStr: string): string {
  // Esperamos el formato "DD/MM/YYYY"
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    // Obtener datos del libro
    useEffect(() => {
        const fetchData = async () => {
        try {
            const [bookRes, authorsRes] = await Promise.all([
            api.get(`/books/${id}`),
            api.get("/authors"),
            ]);
            console.log(bookRes)
            const book = bookRes.data.data;
            const authorsList = authorsRes.data.data;

            setBookData({
            title: book.title || "",
            author_id: String(book.author.id) || "",
            genre: book.genre || "",
            publication_date: formatDate(book.publication_date) || "",
            description: book.description || "",
            });

            setAuthors(authorsList);
        } catch (err) {
            alert("Error al cargar datos");
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setBookData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
        await api.put(`/books/${id}`, bookData);
        alert("Libro actualizado correctamente");
        navigate(`/libros/${id}`);
        } catch (error) {
        console.error(error);
        alert("Error al actualizar el libro");
        } finally {
        setSaving(false);
        }
    };

    if (loading) return <div>Cargando datos...</div>;

    return (
        <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Editar Libro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label>Título</label>
            <input
                type="text"
                name="title"
                value={bookData.title}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            />
            </div>

            <div>
            <label>Autor</label>
            <select
                name="author_id"
                value={bookData.author_id}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            >
                <option value="">Seleccione un autor</option>
                {authors.map((author) => (
                <option key={author.id} value={author.id}>
                    {author.name}
                </option>
                ))}
            </select>
            </div>

            <div>
            <label>Género</label>
            <select
                name="genre"
                value={bookData.genre}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            >
                <option value="">Seleccione un género</option>
                {genres.map((g) => (
                <option key={g.id} value={g.id}>
                    {g.name}
                </option>
                ))}
            </select>
            </div>

            <div>
            <label>Fecha de publicación</label>
            <input
                type="date"
                name="publication_date"
                value={bookData.publication_date}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            />
            </div>

            <div>
            <label>Descripción</label>
            <textarea
                name="description"
                value={bookData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows={4}
            />
            </div>

            <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            >
            {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button
                type="button"
                onClick={() => navigate(`/libros/${id}`)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
                Cancelar
            </button>
        </form>
        </div>
    );
}