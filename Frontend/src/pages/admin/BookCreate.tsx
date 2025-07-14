import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import type { Author } from "../../types/author";
import { toast } from "react-toastify";
import BookForm from "../../components/BookForm";

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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string | null>(null);
    const [isLoadingAuthors, setIsLoadingAuthors] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [coverFile, setCoverFile] = useState<File | null>(null);

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

        const newErrors: { [key: string]: string } = {};
        const today = new Date().toISOString().split("T")[0];
        if (!form.title) newErrors.title = "El título es obligatorio";
        if (!form.author_id) newErrors.author_id = "Debes seleccionar un autor";
        if (!form.publication_date) newErrors.publication_date = "La fecha de publicación es obligatoria";
        if (form.publication_date > today) newErrors.publication_date = "La fecha no puede ser futura";
        if (!form.genre) newErrors.genre = "Debes seleccionar un género";

        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
        }

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => formData.append(key, value));
        if (coverFile) formData.append("cover", coverFile);

        try {
        await api.post("/books", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("¡Libro creado correctamente!");
        navigate("/admin");
        } catch (error: any) {
        if (error.response?.status === 422) {
            setErrors(error.response.data.errors);
        } else {
            setError("Error al crear el libro");
            toast.error("Ocurrió un error. Inténtelo de nuevo.");
        }
        } finally {
        setIsSubmitting(false);
        }
    };

    const coverSection = (
        <div>
        <label htmlFor="cover" className="block font-medium mb-2">Portada</label>
        <input
            type="file"
            id="cover"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            className="w-full border rounded px-3 py-2"
        />
        {errors.cover && <p className="text-red-500 text-sm mb-4">{errors.cover}</p>}
        </div>
    );

    return (
        <BookForm
        formData={form}
        authors={authors}
        errors={errors}
        error={error}
        isLoadingAuthors={isLoadingAuthors}
        isSubmitting={isSubmitting}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        fetchAuthors={fetchAuthors}
        coverSection={coverSection}
        navigate={navigate}
        isEditMode={false}
        />
    );
}