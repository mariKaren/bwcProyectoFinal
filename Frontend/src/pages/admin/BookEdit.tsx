import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "../../services/api";
import type { Author } from "../../types/author";
import { toast } from "react-toastify";
import BookForm from "../../components/BookForm";

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

    const fetchAuthors = async () => {
        try {
        const response = await api.get("/authors");
        setAuthors(response.data.data);
        setError(null);
        } catch {
        setError("No se pudieron cargar los autores. Intenta de nuevo.");
        }
    };

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
        setSaving(true);

        const newErrors: { [key: string]: string } = {};
        const today = new Date().toISOString().split("T")[0];
        if (!bookData.title.trim()) newErrors.title = "El título es obligatorio";
        if (!bookData.author_id) newErrors.author_id = "Debes seleccionar un autor";
        if (!bookData.publication_date) newErrors.publication_date = "La fecha de publicación es obligatoria";
        if (bookData.publication_date > today) newErrors.publication_date = "La fecha no puede ser futura";
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
        toast.success("¡Libro actualizado correctamente!");
        setTimeout(() => navigate(`/libros/${id}`), 1000);
        } catch (error: any) {
        setError("Error al actualizar el libro");
        toast.error("Ocurrió un error. Inténtelo de nuevo.");
        } finally {
        setSaving(false);
        }
    };

    if (loading) return <div>Cargando datos...</div>;

    const coverSection = (
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
    );

    return (
        <BookForm
        formData={bookData}
        authors={authors}
        errors={errors}
        error={error}
        isLoadingAuthors={false}
        isSubmitting={saving}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        fetchAuthors={fetchAuthors}
        coverSection={coverSection}
        navigate={navigate}
        id={id}
        isEditMode={true} 
        />
    );
}