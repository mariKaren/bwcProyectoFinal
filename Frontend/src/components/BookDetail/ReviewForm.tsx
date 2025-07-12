interface ReviewFormProps {
    showReviewForm: boolean;
    reviewDescription: string;
    reviewRating: number;
    setReviewDescription: (value: string) => void;
    setReviewRating: (value: number) => void;
    handleSubmitReview: () => void;
    formErrors?: { [key: string]: string };
}

export const ReviewForm = ({
    showReviewForm,
    reviewDescription,
    reviewRating,
    setReviewDescription,
    setReviewRating,
    handleSubmitReview,
    formErrors
    }: ReviewFormProps) => {
    if (!showReviewForm) return null;

    return (
        <div className="mt-6 border border-gray-400 p-4 rounded max-w-xl">
            <h4 className="text-lg text-brown font-semibold mb-3">Tu Reseña</h4>
            <textarea
                value={reviewDescription}
                onChange={(e) => setReviewDescription(e.target.value)}
                placeholder="Escribe tu reseña..."
                className="w-full p-2 border rounded mb-2 resize-none"
                rows={4}
            />
            {formErrors?.reviewDescription && (
                <p className="text-red-500 text-sm mb-2">{formErrors.reviewDescription}</p>
            )}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray mb-3">
                Calificación (1 a 5)
                </label>
                <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="p-2 border rounded"
                >
                {[1, 2, 3, 4, 5].map((val) => (
                    <option key={val} value={val}>
                    {val}
                    </option>
                ))}
                </select>
                {formErrors?.reviewRating && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.reviewRating}</p>
                )}
            </div>
            <div className="text-center">
                <button
                onClick={handleSubmitReview}
                className="bg-orange hover:bg-orange-dark text-white px-6 py-2 rounded"
                >
                    Enviar Reseña
                </button>
            </div>
            
        </div>
    );
}