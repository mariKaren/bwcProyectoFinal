import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../services/api";
import { useAuth } from "../context/useAuth";
import type { Book } from "../types/book";
import type { Review } from "../types/review";

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

    useEffect(() => {
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
        .catch((err) => {
            console.error("Error al cargar el libro", err);
            setIsLoading(false);
        });

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
                .catch((err) => {
                console.error("Error al cargar reseñas", err);
                });

            // Wishlist
            api
                .get(`/wishlist`)
                .then((res) => {
                const found = res.data.data.some((item: any) => item.book_id == id);
                setIsInWishlist(found);
                })
                .catch((err) => {
                console.error("Error al verificar wishlist:", err);
                });
        }
    }, [id, isAuthenticated, user]);

    const handleDeleteReview = async (reviewId: number) => {
        try {
        await api.delete(`/reviews/${reviewId}`);
        setReviews((prevReviews) => prevReviews.filter((r) => r.id !== reviewId));
        setHasUserReviewed(false);
        } catch (error) {
        console.error("Error al eliminar la reseña:", error);
        }
    };

    const handleAddToWishlist = async () => {
        try {
        await api.post("/wishlist", { book_id: book?.id });
        alert("Libro agregado a tu wishlist");
        setIsInWishlist(true);
        } catch (err: any) {
        console.error(err);
    alert("Error al agregar a wishlist");
        }
    };

    const handleRemoveFromWishlist = async () => {
        try {
        await api.delete(`/wishlist/${id}`);
        console.log("Libro eliminado de wishlist ✅");
        setIsInWishlist(false);
        } catch (error) {
        console.error("Error al eliminar de wishlist:", error);
        }
    };

    const handleSubmitReview = async () => {
        if (!reviewDescription || reviewRating < 1 || reviewRating > 5) {
        alert("Por favor escribe una descripción y selecciona un rating válido.");
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
        alert("¡Gracias por tu reseña!");
        } catch (err) {
        console.error("Error al enviar reseña:", err);
        alert("Hubo un problema al enviar la reseña.");
        }
    };

    const handleDeleteBook = async () => {
        if (!confirm("¿Seguro que quieres eliminar este libro? Esta acción no se puede deshacer.")) {
        return;
        }

        try {
        await api.delete(`/books/${book?.id}`);
        alert("Libro eliminado exitosamente.");
        navigate("/libros/busqueda");
        } catch (error) {
        console.error("Error al eliminar el libro:", error);
        alert("Hubo un problema al eliminar el libro.");
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