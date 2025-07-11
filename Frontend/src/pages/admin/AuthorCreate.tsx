import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import type { AuthorForm } from "../../types/author";


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

export default function AuthorCreate() {
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

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post("/authors", form);
                setForm({
                    name: "",
                    nationality: "",
                    birth_date: "",
                    birth_city: "",
                    description: "",
            });
            if (window.confirm("Autor creado correctamente. ¿Deseas cerrar esta pestaña?")) {
                window.close();
            } else {
                navigate("/admin");
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setError("Error al crear el autor");
            }
        } finally {
        setIsSubmitting(false);
        }
    };

    const fields: (keyof AuthorForm)[] = ["name", "nationality", "birth_date", "birth_city", "description"];

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-red text-center mb-4">Crear Autor</h2>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {fields.map((field) => (
                <div key={field}>
                    <label htmlFor={field} className="block font-medium capitalize mb-2">{fieldLabels[field]}</label>
                    {field === "description" ? (
                    <textarea
                        id={field}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 resize-none"
                        rows={3}
                        placeholder="Ingresa una breve descripción del autor"
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
                <div className="text-center">
                    <button type="submit" disabled={isSubmitting}
                    className={`bg-orange text-white px-6 py-2 font-semibold rounded hover:bg-orange-dark ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    >
                    {isSubmitting ? "Creando..." : "Crear Autor"}
                    </button>
                </div>
                
            </form>
        </div>
    );
}