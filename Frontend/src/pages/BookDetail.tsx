import { useBookDetail } from "../hooks/useBookDetail";
import { BookInfo } from "../components/BookDetail/BookInfo";
import { ReviewList } from "../components/BookDetail/ReviewList";
import { ReviewForm } from "../components/BookDetail/ReviewForm";
import { WishlistButton } from "../components/BookDetail/WishlistButtons";

export default function BookDetail() {
    const {
        book,
        reviews,
        isLoading,
        loading,
        isInWishlist,
        hasUserReviewed,
        showReviewForm,
        reviewDescription,
        reviewRating,
        isAuthenticated,
        isAdmin,
        user,
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
    } = useBookDetail();

    if (isLoading || loading) return <div>Cargando...</div>;
    if (!book) return <div>Libro no encontrado</div>;

    const isUser = isAuthenticated && user?.role === "user";

    return (
        <div className="pt-6">
            <BookInfo book={book} />

            <ReviewList
                reviews={reviews}
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                user={user}
                handleDeleteReview={handleDeleteReview}
            />
            <div className="mt-6">
                {errors.reviews && (
                    <p className="text-red-500 bg-beige text-sm mt-2">{errors.reviews}</p>
                )}
                {isUser && (
                <>
                    {errors.wishlist && (
                    <p className="text-red-500 bg-beige text-sm mt-2">{errors.wishlist}</p>
                    )}
                    <WishlistButton
                    isInWishlist={isInWishlist}
                    handleAddToWishlist={handleAddToWishlist}
                    handleRemoveFromWishlist={handleRemoveFromWishlist}
                    />
                    {!hasUserReviewed ? (
                    <>
                        <button
                        onClick={() => setShowReviewForm((prev) => !prev)}
                        className="bg-green hover:bg-green text-white px-4 py-2 rounded mt-4"
                        >
                        {showReviewForm ? "Cancelar Reseña" : "Escribir Reseña"}
                        </button>
                        <ReviewForm
                        showReviewForm={showReviewForm}
                        reviewDescription={reviewDescription}
                        reviewRating={reviewRating}
                        setReviewDescription={setReviewDescription}
                        setReviewRating={setReviewRating}
                        handleSubmitReview={handleSubmitReview}
                        formErrors={formErrors}
                        />
                    </>
                    ) : (
                    <button
                        disabled
                        className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed ml-2"
                    >
                        Libro ya reseñado
                    </button>
                    )}
                </>
                )}
                {isAdmin && (
                <>
                    <button
                    onClick={() => navigate(`/admin/libros/${book?.id}/editar`)}
                    className="bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded mr-2"
                    >
                    Editar Libro
                    </button>
                    <button
                    onClick={handleDeleteBook}
                    className="bg-red hover:bg-red-dark text-white px-4 py-2 rounded"
                    >
                    Eliminar Libro
                    </button>
                </>
                )}
            </div>
        </div>
    );
}
