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
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [hasUserReviewed, setHasUserReviewed] = useState(false);

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

        //ESTABLECER QUE NO REALICE LA PETICION SI ISAUTENTICATED ES FALSE
        // para tarer las reseñas
        api.get(`/books/${id}/reviews`)
        .then((res) => {
            const reviewsData = res.data.data;
            setReviews(reviewsData);
            
            if (isAuthenticated && user) {
            const alreadyReviewed = reviewsData.some((r: Review) => r.user_id === user.id);
            setHasUserReviewed(alreadyReviewed);
            }
        })
        .catch((err) => {
            console.error("Error al cargar reseñas", err);
        });
        console.log(id)
        api.get(`/wishlist`)
            .then((res) => {
                console.log(res)
                const found = res.data.data.some((item: any) => item.book_id == id);//ya que viene de qp
                setIsInWishlist(found);
            })
            .catch((err) => {
                console.error("Error al verificar wishlist:", err);
            });
    }, [id]);
    
    if (isLoading || loading) return <div>Cargando...</div>;//carga del auth o de los datos del libro
    if (!book) return <div>Libro no encontrado</div>;

    const isUser = isAuthenticated && user?.role === "user";

    const handleDeleteReview = async (reviewId: number) => {//opcion de eliminar reseña
        try {
        await api.delete(`/reviews/${reviewId}`);
        setReviews((prevReviews) => prevReviews.filter((r) => r.id !== reviewId));
        setHasUserReviewed(false);
        } catch (error) {
        console.error("Error al eliminar la reseña:", error);}
    };

    const handleAddToWishlist = async () => {
    try {
        const res = await api.post('/wishlist', { book_id: book.id });
        alert("Libro agregado a tu wishlist");
        setIsInWishlist(true);
    } catch (err: any) {
        console.error(err);
        alert("Error al agregar a wishlist");
    }
    };

    const handleRemoveFromWishlist = ()=> {
    api
        .delete(`/wishlist/${id}`)
        .then(() => {
        console.log("Libro eliminado de wishlist ✅");
        setIsInWishlist(false);
        })
        .catch((error) => {
        console.error("Error al eliminar de wishlist:", error);
        });
    }
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
            { !isAuthenticated ? (
                <p className="text-gray-500">Debe iniciar sesión para ver las reseñas</p>
            ):(
            <>
            {reviews.length > 0 ? (
            <ul className="space-y-2">
                {reviews.map((r) => (
                <li key={r.id} className="border p-2 rounded">
                <strong>{r.user?.name}</strong>: {r.description}
                <div className="text-sm text-gray-500">Rating: {r.rating}/5</div>

                {/* Si el usuario autenticado realizo la reseña o es admin puede eliminarla */}
                {(user?.id === r.user_id || isAdmin) && (
                <div className="mt-4 mb-2 space-x-2">
                    <button
                    onClick={() => handleDeleteReview(r.id)}
                    className="bg-red-600 text-beige hover:bg-red-700 px-4 py-1"
                    >
                    Eliminar reseña
                    </button>
                </div>
                )}
                </li>
                ))}
            </ul>
            ) : (
            <p className="text-gray-500">Aún no hay reseñas.</p>
            )}
            </>
            )}
        </div>

        <div className="mt-6">
            {isUser && (
            <>
                {isInWishlist ? (
                <button onClick={handleRemoveFromWishlist} className="bg-red-600 text-white px-4 py-2 rounded">
                    Eliminar de Wishlist
                </button>
                ) : (
                <button onClick={handleAddToWishlist} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Agregar a Wishlist
                </button>
                )}
                <button
                onClick={() => {/* lógica para dejar reseña */}}
                className={`px-4 py-2 rounded text-white ${
                hasUserReviewed ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={hasUserReviewed}>
                {hasUserReviewed ? "Libro ya reseñado" : "Escribir Reseña"}
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