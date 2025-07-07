import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../services/api";
import { useAuth } from "../context/useAuth";
import type { Book } from "../types/book";
import type { Review } from "../types/review";
import type { MessageState } from "../types/message";

export const useBookDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { user, isAuthenticated, loading, isAdmin } = useAuth();
    const navigate = useNavigate();

    const [book, setBook] = useState<Book | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [hasUserReviewed, setHasUserReviewed] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewDescription, setReviewDescription] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [message, setMessage] = useState<MessageState | null>(null);

    // Función para mostrar los mensajes
    const showMessage = (messageText: string,type:MessageState['type'] ) => {
        setMessage({ messageText, type });
        setTimeout(() => setMessage(null), 3000);
    };

    useEffect(() => {
        if (!id) {
            showMessage("ID de libro inválido", "error");
            navigate("/libros/busqueda");
            return;
        }
        // Fetch del libro
        api
        .get(`/books/${id}`)
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
            .catch(() => {
                showMessage("Libro no encontrado", "error");
                setIsLoading(false);
                setTimeout(() => navigate(`/libros/busqueda`), 2000);
            }
        );
            

        // Fetch de reseñas y wishlist si está autenticado
        if (isAuthenticated) {
        // Reseñas
            api
                .get(`/books/${id}/reviews`)
                .then((res) => {
                const reviewsData = res.data.data;
                setReviews(reviewsData);
                if (isAuthenticated && user) {
                    const alreadyReviewed = reviewsData.some((r: Review) => r.user_id === user.id);
                    setHasUserReviewed(alreadyReviewed);
                }
                })
                .catch(() => showMessage("Error al cargar reseñas", "error"));

            // Wishlist
            api
                .get(`/wishlist`)
                .then((res) => {
                const found = res.data.data.some((item: any) => item.book_id == id);
                setIsInWishlist(found);
                })
                .catch(() => showMessage("Error al verificar wishlist", "error"));
        }
    }, [id, isAuthenticated, user]);

    //Funcion para eliminar reseñas
    const handleDeleteReview = async (reviewId: number) => {
        try {
            await api.delete(`/reviews/${reviewId}`);
            setReviews((prevReviews) => prevReviews.filter((r) => r.id !== reviewId));
            setHasUserReviewed(false);
            showMessage("Reseña eliminada correctamente", "success");
        } catch {
            showMessage("Error al eliminar la reseña", "error");
        }
    }

    //Funcion para agregar a la lista de deseos
    const handleAddToWishlist = async () => {
        try {
            await api.post("/wishlist", { book_id: book?.id });
            setIsInWishlist(true);
            showMessage("Libro agregado a tu wishlist", "success");
        } catch {
            showMessage("Error al agregar a wishlist", "error");
        }
    };

    const handleRemoveFromWishlist = async () => {
        try {
            await api.delete(`/wishlist/${id}`);
            setIsInWishlist(false);
            showMessage("Libro eliminado de wishlist", "success");
        } catch {
            showMessage("Error al eliminar de wishlist", "error");
        }
    };

    const handleSubmitReview = async () => {
        if (!reviewDescription.trim()) {
            showMessage("La reseña es obligatoria", "error");
            return;
        }
        if (reviewRating < 1 || reviewRating > 5) {
            showMessage("Selecciona un rating válido (1-5)", "error");
            return;
        }
        try {
            const res = await api.post("/reviews", {
                book_id: book?.id,
                description: reviewDescription,
                rating: reviewRating,
            });
            setReviews((prev) => [...prev, res.data.data]);
            setHasUserReviewed(true);
            setShowReviewForm(false);
            setReviewDescription("");
            setReviewRating(5);
            showMessage("¡Gracias por tu reseña!", "success");
        } catch {
            showMessage("Error al enviar la reseña", "error");
        }
    };

    const handleDeleteBook = async () => {
        try {
            await api.delete(`/books/${book?.id}`);
            showMessage("Libro eliminado exitosamente", "success");
            setTimeout(() => navigate(`/libros/busqueda`), 1000);
        } catch {
            showMessage("Error al eliminar el libro", "error");
        }
    };

    return {
        book,
        reviews,
        isLoading,
        isInWishlist,
        hasUserReviewed,
        showReviewForm,
        reviewDescription,
        reviewRating,
        isAuthenticated,
        isAdmin,
        user,
        loading,
        message,
        setMessage,
        setShowReviewForm,
        setReviewDescription,
        setReviewRating,
        handleDeleteReview,
        handleAddToWishlist,
        handleRemoveFromWishlist,
        handleSubmitReview,
        handleDeleteBook,
        navigate,
    };
};
//tiene como objetivo encapsular la logica de negocio