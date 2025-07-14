import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import type { Book } from "../types/book";
import { toast } from 'react-toastify';

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

    const [booksCache, setBooksCache] = useState<{ [key: string]: Book[] }>({});
    const lastSearchRef = useRef({ title: "", author: "" });

    const buildCacheKey = (page: number, searchParams: { title: string; author: string }) => {
        return `${page}_${searchParams.title.trim().toLowerCase()}_${searchParams.author.trim().toLowerCase()}`;
    };

    const fetchBooks = async (
        newPage = 1,
        reset = false,
        searchParams = { title: "", author: "" }
    ) => {
        const normalizedParams = {
            title: searchParams.title.trim().toLowerCase(),
            author: searchParams.author.trim().toLowerCase(),
        };
        const cacheKey = buildCacheKey(newPage, normalizedParams);

        const isSameSearch =
        normalizedParams.title === lastSearchRef.current.title.trim().toLowerCase() &&
        normalizedParams.author === lastSearchRef.current.author.trim().toLowerCase();

        if (!reset && booksCache[cacheKey] && isSameSearch) {
            setBooks((prevBooks) => [
                ...prevBooks,
                ...booksCache[cacheKey].filter((book) => !prevBooks.some((b) => b.id === book.id)),
            ]);
            setPage(newPage);
            return;
        }

        lastSearchRef.current = { ...searchParams };

        try {
            setIsLoading(true);
            const params: { page: number; title?: string; author?: string } = { page: newPage };
            if (searchParams.title) params.title = searchParams.title;
            if (searchParams.author) params.author = searchParams.author;
            const response = await api.get("/books", { params });
            const newBooks = response.data.data;

            setBooksCache((prevCache) => ({
                ...prevCache,
                [cacheKey]: newBooks,
            }));

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
        setBooksCache({});
        lastSearchRef.current = { title: "", author: "" };
        fetchBooks(1, true, { title: "", author: "" });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const normalizedTitle = title.trim().toLowerCase();
        const normalizedAuthor = author.trim().toLowerCase();
        const lastTitle = lastSearchRef.current.title.trim().toLowerCase();
        const lastAuthor = lastSearchRef.current.author.trim().toLowerCase();

        const isSameSearch = normalizedTitle === lastTitle && normalizedAuthor === lastAuthor;

        if (isSameSearch) {
        toast.info("Los parámetros de búsqueda no se modificaron")
        return;
        }

        setBooksCache({});
        fetchBooks(1, true, { title, author });
    };

    const handleLoadMore = () => {
        if (pagination && page < pagination.last_page) {
        fetchBooks(page + 1, false, { title, author });
        }
    };

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