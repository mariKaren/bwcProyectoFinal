import type { Book } from "../../types/book";

export function BookInfo({ book }: { book: Book }) {
    return (
        <div className="flex flex-col sm:flex-row gap-10 items-center rounded-xl p-6 bg-beige shadow-sm">
            <img
                src={book.cover? `http://localhost:8000/storage/${book.cover}`: "/imgDefecto.png"}
                alt={`Portada de ${book.title}`}
                className="w-60 min-h-[11rem] max-h-[21rem] h-auto rounded-lg"
            />
            <div className="flex-1 pl-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-brown font-bold font-text mb-5">{book.title}</h2>
                <p className="text-xl text-gray-700 ">{book.author.name}</p>
                <p className="text-md text-gray mt-4">
                    <span className="font-medium">Género:</span> {(book.genre ? book.genre.charAt(0).toUpperCase() + book.genre.slice(1) : "Desconocido")}
                </p>
                <p className="mt-3 text-md text-gray">
                    <span className="font-medium">Fecha de publicación:</span> {book.publication_date || "N/A"}
                </p>
                {book.description && (
                    <p className="mt-3 text-gray">
                        <span className="font-medium ">Descripción:</span> {book.description}
                    </p>
                )}
            </div>
        </div>
    );
}
//muestra los datos del libro