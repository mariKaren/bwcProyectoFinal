import type { Author } from "../types/author";
import { genres } from "../types/genres";
import type { NavigateFunction } from "react-router";

interface BookFormProps {
    formData: {
        title: string;
        author_id: string;
        genre: string;
        publication_date: string;
        description: string;
    };
    authors: Author[];
    errors: { [key: string]: string };
    error: string | null;
    isLoadingAuthors: boolean;
    isSubmitting: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    fetchAuthors: () => void;
    coverSection: JSX.Element;
    navigate: NavigateFunction;
    id?: string; // Opcional para BookEdit
    isEditMode: boolean;
}

export default function BookForm({
  formData,
  authors,
  errors,
  error,
  isLoadingAuthors,
  isSubmitting,
  handleChange,
  handleSubmit,
  fetchAuthors,
  coverSection,
  navigate,
  id,
  isEditMode
}: BookFormProps) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-red text-center mb-4">
        {isEditMode ? "Editar Libro" : "Crear Libro"}
      </h2>
      {error && <p className="text-red-500 text-center bg-beige text-md mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium mb-2">Título</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.title && <p className="text-red-500 text-sm mb-\/
4">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="author" className="block font-medium mb-2">Autor</label>
          <div className="flex gap-2 items-center">
            <select
              id="author"
              name="author_id"
              value={formData.author_id}
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
            value={formData.genre}
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
            value={formData.publication_date}
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
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>

        {coverSection}

        <div className="flex flex-wrap justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(id ? `/libros/${id}` : "/admin")}
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
            {isSubmitting ? "Procesando..." : isEditMode ? "Guardar Cambios" : "Crear Libro"}
          </button>
        </div>
      </form>
    </div>
  );
}