
import { NavLink} from "react-router";
import { useState,useEffect } from "react";
import BookGrid from "../components/BookGrid";
import type { Book } from "../types/book";
import api from "../services/api";


export default function Home(){
    const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchFeaturedBooks = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/featured-books");
            console.log(response.data.data)
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
        <div className="space-y-12">
        {/* Portada */}
            <section className="relative text-beige bg-brown rounded-lg overflow-hidden h-64 flex items-center justify-center px-6">
                <img src="src/assets/portada.jpg" alt="Portada Biblioteca" className="absolute inset-0 object-cover w-full h-full opacity-35"/>
                <div className="relative z-10 text-center max-w-3xl">
                    <h1 className="text-2xl md:text-4xl font-bold mb-5 drop-shadow-lg">
                        Descubre tu próximo gran libro
                    </h1>
                    <NavLink to="/libros/busqueda" className="bg-beige text-brown font-semibold px-6 py-2 rounded-md hover:bg-yellow transition inline-block">
                        Explorar ahora
                    </NavLink>
                </div>
            </section>

            {/* Destacados */}
            <section className="mb-8">
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
            </section>

        </div>
    );
}