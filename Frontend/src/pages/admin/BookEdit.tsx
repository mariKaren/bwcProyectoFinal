import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { genres} from "../../types/genres";
import api from "../../services/api";
import type { Author } from "../../types/author";
import { toast } from 'react-toastify';

export default function BookEdit() {
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [currentCover, setCurrentCover] = useState<string | null>(null);

    function formatDate(dateStr: string): string {
    // Esperamos el formato "DD/MM/YYYY". El backend me lo devuelve en ese formato, pero para que el formulario lo incluya en sus datos es necesario transformar la fecha
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
                console.log(book.cover)
                setCurrentCover(book.cover ? `http://localhost:8000/storage/${book.cover}` : null); 
                setAuthors(authorsList);
                setErrors({});
            } catch {
                setError("Error al cargar datos");
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setCoverFile(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setErrors({});
        // Validaciones
        const newErrors: { [key: string]: string } = {};
        const today = new Date().toISOString().split("T")[0];
        if (!bookData.title.trim()) newErrors.title="El título es obligatorio";
        if (!bookData.author_id) newErrors.author_id= "Debes seleccionar un autor";
        if (!bookData.publication_date) newErrors.publication_date = "La fecha de publicación es obligatoria";
         if (bookData.publication_date > today) newErrors.publication_date="La fecha no puede ser futura";
        if (!bookData.genre) newErrors.genre = "Debes seleccionar un género";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSaving(false);
            return;
        }

        const formData = new FormData();
        for (const key in bookData) {
            if (bookData[key as keyof typeof bookData]) {
                formData.append(key, bookData[key as keyof typeof bookData]);
            }
        }
        if (coverFile) {
            formData.append("cover", coverFile);
        }

        try {
            await api.post(`/books/${id}?_method=PUT`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("¡Libro actualizado correctamente!")
            setTimeout(() => navigate(`/libros/${id}`), 1000);
        } catch (error:any) {
             console.error(error.response?.data); 
            setError("Error al actualizar el libro");
            toast.error("Ocurrió un error. Inténtelo de nuevo.")
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Cargando datos...</div>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-red text-center mb-4">Editar Libro</h2>
            {error && <p className="text-red-500 text-center bg-beige text-md mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-medium mb-2">Título</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={bookData.title}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                    {errors.title && <p className="text-red-500 text-sm mb-4">{errors.title}</p>}
                </div>

                <div>
                    <label htmlFor="author" className="block font-medium mb-2">Autor</label>
                    <select
                        id="author"
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
                    {errors.author_id && <p className="text-red-500 text-sm mb-4">{errors.author_id}</p>}
                </div>

                <div>
                    <label htmlFor="genre" className="block font-medium mb-2">Género</label>
                    <select
                        id="genre"
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
                    {errors.genre && <p className="text-red-500 text-sm mb-4">{errors.genre}</p>}
                </div>

                <div>
                    <label htmlFor="publication_date" className="block font-medium mb-2">Fecha de publicación</label>
                    <input
                        id="publication_date"
                        type="date"
                        name="publication_date"
                        value={bookData.publication_date}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
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
                        value={bookData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        rows={4}
                    />
                </div>

                <div>
                    <label htmlFor="cover" className="block font-medium mb-2">Portada</label>
                    
                    {currentCover && !previewUrl && (
                        <div className="mb-2">
                            <p className="text-sm text-gray-600">Portada actual:</p>
                            <img src={currentCover} alt="Portada actual" className="h-32 object-cover border rounded" />
                        </div>
                    )}

                    {previewUrl && (
                        <div className="mb-2">
                            <p className="text-sm text-gray-600">Nueva portada:</p>
                            <img src={previewUrl} alt="Vista previa" className="h-32 object-cover border rounded" />
                        </div>
                    )}

                    <input
                        type="file"
                        id="cover"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                
                <div className="flex flex-wrap justify-between gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(`/libros/${id}`)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                    type="submit"
                    disabled={saving}
                    className={`bg-orange text-white px-6 py-2 font-semibold rounded hover:bg-orange-dark ${
                        saving ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    >
                    {saving ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
                
            </form>
        </div>
    );
}