import { useBookDetail } from "../hooks/useBookDetail";
import { BookInfo } from "../components/BookDetail/BookInfo";
import { ReviewList } from "../components/BookDetail/ReviewList";
import { ReviewForm } from "../components/BookDetail/ReviewForm";
import { WishlistButton } from "../components/BookDetail/WishlistButtons";

export function BookDetail() {
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
    console.log(user)
    return (
        <div className="p-6">
            <BookInfo book={book} />
            <hr className="my-6" />
            <ReviewList
                reviews={reviews}
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                user={user}
                handleDeleteReview={handleDeleteReview}
            />
            <div className="mt-6">
                {isUser && (
                <>
                    <WishlistButton
                    isInWishlist={isInWishlist}
                    handleAddToWishlist={handleAddToWishlist}
                    handleRemoveFromWishlist={handleRemoveFromWishlist}
                    />
                    {!hasUserReviewed ? (
                    <>
                        <button
                        onClick={() => setShowReviewForm((prev) => !prev)}
                        className="bg-green-600 text-white px-4 py-2 rounded ml-2"
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
                    onClick={() => navigate(`/libros/${book?.id}/edit`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    >
                    Editar Libro
                    </button>
                    <button
                    onClick={handleDeleteBook}
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
