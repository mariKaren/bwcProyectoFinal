interface WishlistButtonProps {
    isInWishlist: boolean;
    handleAddToWishlist: () => void;
    handleRemoveFromWishlist: () => void;
}

export const WishlistButton = ({
    isInWishlist,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    }: WishlistButtonProps) => {
        return isInWishlist ? (
            <button
            onClick={handleRemoveFromWishlist}
            className="bg-red-600 text-white px-4 py-2 rounded"
            >
                Eliminar de Wishlist
            </button>
        ) : (
            <button
            onClick={handleAddToWishlist}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Agregar a Wishlist
            </button>
        );
};