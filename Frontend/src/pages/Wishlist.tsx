import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate, useLocation } from "react-router";
import BookGrid from "../components/BookGrid";
import type { Book } from "../types/book";
import api from "../services/api";

export function Wishlist() {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Redirige si no está autenticado
    useEffect(() => {
        if (!loading && !isAuthenticated) {//loading lo que hace es esperar la respuesta de la autentificacion
            navigate("/login", { state: { from: location.pathname } });
        }
    }, [isAuthenticated, loading, navigate, location]);

    // Carga la wishlist del usuario
    useEffect(() => {
    if (!loading && isAuthenticated && user?.role === "user") {
        api.get("/wishlist") 
        .then((res) => {
            const booksData: Book[] = res.data.data.map((item: any) => ({
            id: item.book.id,
            title: item.book.title,
            author: item.book.author.name,
            cover: item.book.cover||"/src/assets/portada.jpg",
            }));
            setBooks(booksData);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error("Error al cargar wishlist:", err);
            setIsLoading(false);
        });
    } else if (!loading && isAuthenticated && user?.role === "admin") {
        setIsLoading(false);
    }
    }, [isAuthenticated, user, loading]);
        

    // Mostrar loader hasta que el auth esté cargado
    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    if (user?.role === "admin") {
        return (
            <div className="p-4 text-center bg-beige text-red">
                Sos admin, ¿para qué querés una wishlist?
            </div>
        );
    }

    return (
        <div className="p-4 pt-0">
            <h1 className="text-2xl sm:text-3xl text-center text-red font-bold mb-8">Mi Wishlist</h1>
            <BookGrid books={books} isLoading={isLoading} />
        </div>
    );
}