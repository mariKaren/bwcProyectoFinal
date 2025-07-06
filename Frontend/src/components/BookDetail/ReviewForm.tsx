interface ReviewFormProps {
    showReviewForm: boolean;
    reviewDescription: string;
    reviewRating: number;
    setReviewDescription: (value: string) => void;
    setReviewRating: (value: number) => void;
    handleSubmitReview: () => void;
}

export const ReviewForm = ({
    showReviewForm,
    reviewDescription,
    reviewRating,
    setReviewDescription,
    setReviewRating,
    handleSubmitReview,
    }: ReviewFormProps) => {
    if (!showReviewForm) return null;

    return (
        <div className="mt-4 border p-4 rounded bg-gray-50 max-w-xl">
            <h4 className="text-lg font-semibold mb-2">Tu Reseña</h4>
            <textarea
                value={reviewDescription}
                onChange={(e) => setReviewDescription(e.target.value)}
                placeholder="Escribe tu reseña..."
                className="w-full p-2 border rounded mb-2"
                rows={4}
            />
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
            </div>
            <button
                onClick={handleSubmitReview}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Enviar Reseña
            </button>
        </div>
    );
}