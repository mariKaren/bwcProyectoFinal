import { useState, useEffect } from "react";
import BookGrid from "./BookGrid";
import type { Book } from "../types/book";
import { NavLink } from "react-router";
import api from "../services/api";

export default function FeaturedBooks() {
    const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchFeaturedBooks = async () => {
            try {
                setIsLoading(true);
                const response = await api.get("/featured-books");
                setFeaturedBooks(response.data.data);
            } catch (error) {
                console.error("Error fetching featured books:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeaturedBooks();
    }, []);

    return (
        <>
            <h2 className="text-2xl md:text-3xl text-center text-red font-bold mb-10 drop-shadow-sm">Libros Destacados</h2>
            <BookGrid books={featuredBooks} isLoading={isLoading} />
            <div className="text-right"> 
                    <NavLink
                        to="/libros/busqueda"
                        className="mt-6 inline-block bg-orange text-white font-semibold px-8 py-2 rounded-md hover:bg-orange-dark transition"
                        >
                        Ver más
                    </NavLink>
            </div>
        </>
    );
}