import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../../services/api";
import type { AuthorForm } from "../../types/author";
import { toast } from "react-toastify";

type FormErrors = {
    [key in keyof AuthorForm]?: string;
};

const fieldLabels: Record<keyof AuthorForm, string> = {
    name: "Nombre",
    nationality: "Nacionalidad",
    birth_date: "Fecha de nacimiento",
    birth_city: "Ciudad de nacimiento",
    description: "Descripción",
};

export default function AuthorEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<AuthorForm>({
        name: "",
        nationality: "",
        birth_date: "",
        birth_city: "",
        description: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    function formatDate(dateStr: string): string {
        // Esperamos el formato "DD/MM/YYYY". El backend me lo devuelve en ese formato, pero para que el formulario lo incluya en sus datos es necesario transformar la fecha
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await api.get(`/authors/${id}`);
                const author = response.data.data;
                setForm({
                    name: author.name || "",
                    nationality: author.nationality || "",
                    birth_date: author.birth_date? formatDate(author.birth_date) : "" ,
                    birth_city: author.birth_city || "",
                    description: author.description || "",
                });
                setError(null);
            } catch {
                setError("No se pudo cargar el autor. Intenta de nuevo.");
                toast.error("Error al cargar el autor");
            } finally {
                setIsLoading(false);
            }
        };
        fetchAuthor();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name in form) {
        setForm({ ...form, [name as keyof AuthorForm]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setError(null);

        // Validación en el frontend
        const newErrors: FormErrors = {};
        if (!form.name) newErrors.name = "El nombre es obligatorio";
        const today = new Date().toISOString().split("T")[0];
        if (form.birth_date && form.birth_date > today) {
        newErrors.birth_date = "La fecha no puede ser futura";
        }

        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
        }

        setIsSubmitting(true);
        try {
            await api.post(`/authors/${id}?_method=PUT`, form);
            toast.success("¡Autor actualizado correctamente!");
            navigate("/admin");
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setError("Error al actualizar el autor");
                toast.error("Ocurrió un error. Inténtelo de nuevo.");
            }
        } finally {
        setIsSubmitting(false);
        }
    };

    const fields: (keyof AuthorForm)[] = ["name", "nationality", "birth_date", "birth_city", "description"];

    if (isLoading) return <div className="text-center p-4">Cargando autor...</div>;

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-red text-center mb-4">Editar Autor</h2>

            {error && <p className="text-red-500 text-center bg-beige text-md mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {fields.map((field) => (
                <div key={field}>
                    <label htmlFor={field} className="block font-medium capitalize mb-2">
                    {fieldLabels[field]}
                    </label>
                    {field === "description" ? (
                    <textarea
                        id={field}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 resize-none"
                        rows={3}
                        placeholder={`Ingresa ${fieldLabels[field].toLowerCase()}`}
                    />
                    ) : (
                    <input
                        id={field}
                        type={field === "birth_date" ? "date" : "text"}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        placeholder={`Ingresa ${fieldLabels[field].toLowerCase()}`}
                    />
                    )}
                    {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                </div>
                ))}
                <div className="flex flex-wrap justify-between gap-4">
                <button
                    type="button"
                    onClick={() => navigate("/admin/autores")}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-orange text-white px-6 py-2 font-semibold rounded hover:bg-orange-dark ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </button>
                </div>
            </form>
        </div>
    );
}