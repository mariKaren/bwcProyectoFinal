import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../services/api";
import { useAuth } from "../context/useAuth";
import type { Book } from "../types/book";
import type { Review } from "../types/review";
import { toast } from 'react-toastify';

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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (!id) {
            toast.error("ID de libro inválido");
            navigate("/libros/busqueda");
            return;
        }
        setErrors({});
        setIsLoading(true);
        // Fetch del libro
        api
        .get(`/books/${id}`)
            .then((res) => {
                const raw = res.data.data;
                const bookData: Book = {
                    id: raw.id,
                    title: raw.title,
                    author: raw.author,
                    author_id:raw.author_id,
                    cover: raw.cover,
                    genre: raw.genre,
                    description: raw.description,
                    publication_date: raw.publication_date,
                };
                setBook(bookData);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                toast.error("Libro no encontrado");
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
                    if (user) {
                        const alreadyReviewed = reviewsData.some((r: Review) => r.user_id === user.id);
                        setHasUserReviewed(alreadyReviewed);
                    }
                })
                .catch(() => {
                    setErrors((prev) => ({
                        ...prev,
                        reviews: "Error al cargar reseñas",
                }));})

            // Wishlist
            if (user) {
                api.get(`/wishlist`)
                .then((res) => {
                    const found = res.data.data.some((item: any) => item.book_id == id);
                    setIsInWishlist(found);
                })
                .catch(() => {
                    setErrors((prev) => ({
                        ...prev,
                        wishlist: "Error al verificar wishlist",
                    }));
                });
            }
            
        };
    }, [id, isAuthenticated, user]);

    //Funcion para eliminar reseñas
    const handleDeleteReview = async (reviewId: number) => {
        try {
            await api.delete(`/reviews/${reviewId}`);
            setReviews((prevReviews) => prevReviews.filter((r) => r.id !== reviewId));
            setHasUserReviewed(false);
            toast.success("¡Reseña eliminada correctamente!")
        } catch {
            toast.error("Error al eliminar la reseña. Inténtelo de nuevo.")
        }
    }

    //Funcion para agregar a la lista de deseos
    const handleAddToWishlist = async () => {
        try {
            await api.post("/wishlist", { book_id: book?.id });
            setIsInWishlist(true);
            toast.success("¡Libro agregado a tu wishlist!")
        } catch {
            toast.error("Error al agregar a wishlist")
        }
    };

    //Funcion para eliminar de la lista de deseos
    const handleRemoveFromWishlist = async () => {
        try {
            await api.delete(`/wishlist/${id}`);
            setIsInWishlist(false);
            toast.success("¡Libro eliminado de wishlist!")
        } catch {
            toast.error("Error al eliminar de wishlist")
        }
    };

    //Funcion para enviar una reseña
    const handleSubmitReview = async () => {
        const newErrors: { [key: string]: string } = {};
        if (!reviewDescription.trim()) {
            newErrors.reviewDescription = "La reseña es obligatoria.";
        }
        if (reviewRating < 1 || reviewRating > 5) {
            newErrors.reviewRating = "Selecciona un rating válido (1-5).";
        }
        if (Object.keys(newErrors).length > 0) {
            setFormErrors(newErrors);
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
            setFormErrors({});
            toast.success("¡Gracias por tu reseña!")
        } catch {
            toast.error("Error al enviar la reseña.Inténtelo de nuevo")
        }
    };

    //Funcion para eliminar un libro
    const handleDeleteBook = async () => {
        try {
            await api.delete(`/books/${book?.id}`);
            toast.success("¡Libro eliminado correctamente!")
            setTimeout(() => navigate(`/libros/busqueda`), 1000);
        } catch(error:any) {
            const errorMessage = error.response?.data?.message || "Error al eliminar el libro. Inténtelo de nuevo";
            toast.error(errorMessage);
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
        errors,
        formErrors,
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