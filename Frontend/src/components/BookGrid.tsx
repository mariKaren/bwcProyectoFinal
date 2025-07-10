import { Link } from "react-router";
import type { Book } from "../types/book";


type Props = {
    books: Book[];
    isLoading?: boolean;
};

const BookGrid = ({ books,isLoading = false }: Props) => {
    const gridColsClass = `grid-cols-1 cols-between-450-sm sm:grid-cols-3 md:grid-cols-4`;

    return (
        <div>
        {isLoading ? (
            <div className={`grid ${gridColsClass} gap-6`}>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded h-64 animate-pulse" />
            ))}
            </div>
        ) : books.length === 0 ? (
            <p className="text-gray-500">No se encontraron resultados.</p>
        ) : (
            <div className={`grid ${gridColsClass} gap-6`}>
            {books.map((book) => (
                <Link
                to={`/libros/${book.id}`}
                key={book.id}
                className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                <img
                    src={book.cover || "/src/assets/portada.jpg"}
                    alt={`Portada de ${book.title}`}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="font-semibold text-lg">{book.title}</h3>
                    <p className="text-gray-600">{book.author.name}</p>
                </div>
                </Link>
            ))}
            </div>
        )}
        </div>
    );
};

export default BookGrid;