import { useState, useEffect } from "react";
import api from "../services/api";
import type { Book } from "../types/book";

type Pagination = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export const useBookSearch = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    const fetchBooks = async (
        newPage = 1,
        reset = false,
        searchParams = { title: "", author: "" }
    ) => {
        try {
            setIsLoading(true);
            const params: { page: number; title?: string; author?: string } = { page: newPage };
            if (searchParams.title) params.title = searchParams.title;
            if (searchParams.author) params.author = searchParams.author;

            const response = await api.get("/books", { params });
            const newBooks = response.data.data;

            // Filtrar duplicados por id, es unicamente por precaucion
            const uniqueBooks = reset
                ? newBooks
                : [...books, ...newBooks].filter(
                    (book, index, self) => index === self.findIndex((b) => b.id === book.id)
                );
            setBooks(uniqueBooks);
            setPagination(response.data.pagination);
            setPage(newPage);
        } catch (error) {
        console.error("Error fetching books:", error);
        } finally {
        setIsLoading(false);
        }
    };

    const handleViewAll = () => {
        setTitle("");
        setAuthor("");
        fetchBooks(1, true, { title: "", author: "" });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchBooks(1, true, { title, author });
    };

    const handleLoadMore = () => {
        if (pagination && page < pagination.last_page) {
        fetchBooks(page + 1, false, { title, author });
        }
    };

    // Cargar libros iniciales
    useEffect(() => {
        fetchBooks(1, true);
    }, []);

    return {
        title,
        setTitle,
        author,
        setAuthor,
        books,
        page,
        setPage,
        isLoading,
        pagination,
        handleSearch,
        handleViewAll,
        handleLoadMore,
    };
};