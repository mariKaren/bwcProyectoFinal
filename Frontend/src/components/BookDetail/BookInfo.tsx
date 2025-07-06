import type { Book } from "../../types/book";

export function BookInfo({ book }: { book: Book }) {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <img
                src={book.cover || "/images/placeholder.jpg"}
                alt={book.title}
                className="w-48 h-auto rounded shadow"
            />
            <div>
                <h2 className="text-3xl font-bold">{book.title}</h2>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-gray-600">Género: {book.genre || "Desconocido"}</p>
                <p className="text-gray-600">Publicado: {book.published_date || "N/A"}</p>
                {book.description && (
                <p className="mt-4 text-gray-700">{book.description}</p>
                )}
            </div>
        </div>
    );
}
//muestra los datos del libro