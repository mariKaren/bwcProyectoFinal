import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { genres} from "../types/genres";
import api from "../services/api";
import { Message } from "../components/Message";
import type { MessageState } from "../types/message";

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
    const [message, setMessage] = useState<MessageState | null>(null);

    // Función para mostrar mensajes
    const showMessage = (messageText:string,type:MessageState['type']) => {
        setMessage({ messageText, type });
        setTimeout(() => setMessage(null), 3000); // Auto-cerrar después de 3s
    };

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
            } catch {
                showMessage("Error al cargar datos", "error");
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
        // Validaciones
        if (!bookData.title.trim()) {
        showMessage("El título es obligatorio", "error");
        return;
        }
        if (!bookData.author_id) {
        showMessage("Debe seleccionar un autor", "error");
        return;
        }
        if (!bookData.publication_date) {
        showMessage("La fecha de publicación es obligatoria", "error");
        return;
        }
        setSaving(true);

        try {
            await api.put(`/books/${id}`, bookData);
            showMessage("Libro actualizado correctamente", "success");
            console.log(message)
            setTimeout(() => navigate(`/libros/${id}`), 1000);
        } catch (error) {
            showMessage("Error al actualizar el libro", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Cargando datos...</div>;

    return (
        <div className="pt-5 max-w-lg mx-auto">
            <h2 className="text-2xl text-brown text-center font-bold mb-5">Editar Libro</h2>
            {message && (
                <Message
                messageText={message.messageText}
                type={message.type}
                onClose={() => setMessage(null)}
                />
            )}
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
                
                <div className="flex flex-wrap justify-between gap-4">
                    <button
                    type="submit"
                    disabled={saving}
                    className="bg-green hover:bg-green text-white px-4 py-2 rounded"
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
                </div>
                
            </form>
        </div>
    );
}