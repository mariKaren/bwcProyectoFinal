import type { Book } from "../../types/book";

export function BookInfo({ book }: { book: Book }) {
    return (
        <div className="flex flex-col sm:flex-row gap-9 items-center rounded-xl p-6 bg-beige shadow-sm">
            <img
                src={book.cover || "/images/placeholder.jpg"}
                alt={book.title}
                className="w-60 min-h-[11rem] h-auto rounded-lg"
            />
            <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-brown font-bold">{book.title}</h2>
                <p className="text-lg text-gray-700 mt-2">{book.author}</p>
                <p className="text-sm text-gray mt-3">
                    <span className="font-medium">Género:</span> {book.genre || "Desconocido"}
                </p>
                <p className="text-sm text-gray mt-2">
                    <span className="font-medium">Publicado:</span> {book.published_date || "N/A"}
                </p>
                {book.description && (
                <p className="mt-4 text-gray-700">{book.description}</p>
                )}
            </div>
        </div>
    );
}
//muestra los datos del libro