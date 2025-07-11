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
        return <p className="text-gray mt-7">Debe iniciar sesión para ver las reseñas</p>;
    }

    return (
        <div className="mt-7">
            <h3 className="text-2xl text-brown font-semibold mb-3">Reseñas</h3>
            {reviews.length > 0 ? (
                <ul className="space-y-2">
                {reviews.map((r) => (
                    <li key={r.id} className="border border-gray-400 p-2 rounded">
                        <p><strong>{r.user?.name}</strong>: {r.description}</p>
                        <div className="text-sm text-gray mt-1">
                            <p> Rating: {r.rating}/5</p>
                        </div>
                        {(user?.id === r.user_id || isAdmin) && (
                                <div className="mt-3 mb-2 space-x-2">
                                <button
                                    onClick={() => handleDeleteReview(r.id)}
                                    className="bg-red text-beige hover:bg-red-dark px-4 py-1"
                                >
                                    Eliminar reseña
                                </button>
                            </div>
                        )}
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-gray">Aún no hay reseñas.</p>
            )}
        </div>
    );
};