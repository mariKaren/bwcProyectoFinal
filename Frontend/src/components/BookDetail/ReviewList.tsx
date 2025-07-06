import type { Review } from "../../types/review";
import type { User } from "../../types/user";

interface ReviewListProps {
    reviews: Review[];
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: User | null;
    handleDeleteReview: (reviewId: number) => void;
}

export const ReviewList = ({
    reviews,
    isAuthenticated,
    isAdmin,
    user,
    handleDeleteReview,
    }: ReviewListProps) => {
    if (!isAuthenticated) {
        return <p className="text-gray-500">Debe iniciar sesión para ver las reseñas</p>;
    }

    return (
        <div>
        <h3 className="text-xl font-semibold mb-2">Reseñas</h3>
        {reviews.length > 0 ? (
            <ul className="space-y-2">
            {reviews.map((r) => (
                <li key={r.id} className="border p-2 rounded">
                <strong>{r.user?.name}</strong>: {r.description}
                <div className="text-sm text-gray-500">Rating: {r.rating}/5</div>
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
        </div>
    );
};