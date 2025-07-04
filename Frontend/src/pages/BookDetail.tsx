import { useParams } from "react-router";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/useAuth";
import type { Book } from "../types/Book";
import type { Review } from "../types/Review";

export function BookDetail() {
    const { id } = useParams();
    const { user, isAuthenticated, loading,isAdmin } = useAuth();

    const [book, setBook] = useState<Book | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get(`/books/${id}`)
        .then((res) => {
            const raw = res.data.data;
            const bookData: Book = {
                id: raw.id,
                title: raw.title,
                author: raw.author.name,
                cover: raw.cover || "/src/assets/portada.jpg",
                genre: raw.genre,
                description: raw.description,
                published_date: raw.publication_date,
            };
            setBook(bookData);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error("Error al cargar el libro", err);
            setIsLoading(false);
        });

        // Si querés traer también reseñas:
        api.get(`/reviews`)
        .then((res) => {
            const allReviews: Review[] = res.data.data;
            const filtered = allReviews.filter((r) => r.book_id === Number(id));
            console.log(filtered)
            setReviews(filtered);
            })
        .catch((err) => console.error("Error al cargar reseñas", err));
    }, [id]);

    if (isLoading || loading) return <div>Cargando...</div>;//carga del auth o de los datos del libro
    if (!book) return <div>Libro no encontrado</div>;

    const isUser = isAuthenticated && user?.role === "user";

    return (
        <div className="p-6">
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

        <hr className="my-6" />

        <div>
            <h3 className="text-xl font-semibold mb-2">Reseñas</h3>
            {reviews.length > 0 ? (
            <ul className="space-y-2">
                {reviews.map((r) => (
                <li key={r.id} className="border p-2 rounded">
                    {r.description}
                </li>
                ))}
            </ul>
            ) : (
            <p className="text-gray-500">Aún no hay reseñas.</p>
            )}
        </div>

        <div className="mt-6">
            {isUser && (
            <>
                <button
                onClick={() => {/* lógica para wishlist */}}
                className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                >
                Agregar a Wishlist
                </button>
                <button
                onClick={() => {/* lógica para dejar reseña */}}
                className="bg-green-600 text-white px-4 py-2 rounded"
                >
                Escribir Reseña
                </button>
            </>
            )}

            {isAdmin && (
            <>
                <button
                onClick={() => {/* lógica editar */}}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                Editar Libro
                </button>
                <button
                onClick={() => {/* lógica eliminar */}}
                className="bg-red-600 text-white px-4 py-2 rounded"
                >
                Eliminar Libro
                </button>
            </>
            )}
        </div>
        </div>
    );
}