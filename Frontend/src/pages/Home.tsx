
import { NavLink} from "react-router";
import BookGrid from "../components/BookGrid";
import GenreLinks from "../components/GenreLinks";

// Por ahora libros destacados hardcodeados
const featuredBooks = [
    {
        id: "1",
        title: "El Quijote",
        author: "Miguel de Cervantes",
        cover: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
    },
    {
        id: "2",
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        cover: "https://covers.openlibrary.org/b/id/8231851-L.jpg",
    },
    {
        id: "3",
        title: "La Sombra del Viento",
        author: "Carlos Ruiz Zafón",
        cover: "https://covers.openlibrary.org/b/id/8225636-L.jpg",
    },
    {
        id: "4",
        title: "La Sombra del Viento",
        author: "Carlos Ruiz Zafón",
        cover: "https://covers.openlibrary.org/b/id/8225636-L.jpg",
    },
];

export default function Home(){
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
            <section>
                <h2 className="text-2xl font-semibold mb-6">Libros Destacados</h2>
                <BookGrid books={featuredBooks} />
            </section>

            {/* Géneros */}
            <section>
                <h2 className="text-2xl font-semibold mb-6">Explorar por Géneros</h2>
                <GenreLinks variant="link" />
        </section>
        </div>
    );
}