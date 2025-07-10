import { useBookSearch } from "../hooks/useBookSearch";
import BookGrid from "../components/BookGrid";

const AdvancedSearch = () => {
    const {
        title,
        setTitle,
        author,
        setAuthor,
        books,
        page,
        isLoading,
        pagination,
        handleSearch,
        handleViewAll,
        handleLoadMore,
    } = useBookSearch();

    return (
        <div className="p-4">
        <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full mx-5 sm:mx-0 sm:flex-1">
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
            </div>
            <div className="w-full mx-5 sm:mx-0 sm:flex-1">
                <input
                    type="text"
                    placeholder="Buscar por autor..."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
            </div>
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-orange text-white px-4 py-2 rounded hover:bg-orange-dark flex items-center gap-2"
                >
                    <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                    </svg>
                    Buscar
                </button>
                <button
                    type="button"
                    onClick={handleViewAll}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Ver todos
                </button>
            </div>
        </form>

        {/* Grilla de libros */}
        <BookGrid books={books} isLoading={isLoading} />

        {/* Botón de cargar más */}
        {pagination && page < pagination.last_page && (
            <div className="mt-6 text-center">
                <button
                    onClick={handleLoadMore}
                    className="bg-orange text-white px-4 py-2 rounded hover:bg-orange-dark"
                    disabled={isLoading}
                >
                    {isLoading ? "Cargando..." : "Cargar más"}
                </button>
            </div>
        )}
        </div>
    );
};

export default AdvancedSearch;