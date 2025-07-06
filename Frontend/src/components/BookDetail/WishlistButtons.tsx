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
            className="bg-red hover:bg-red-dark text-white px-4 py-2 rounded transition duration-300 mr-3"
            >
                Eliminar de Wishlist
            </button>
        ) : (
            <button
            onClick={handleAddToWishlist}
            className="bg-orange text-white hover:bg-orange-dark px-4 py-2 rounded transition duration-300 mr-3"
            >
                Agregar a Wishlist
            </button>
        );
};