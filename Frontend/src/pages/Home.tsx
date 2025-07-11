
import { NavLink} from "react-router";
import FeaturedBooks from "../components/FeaturedBooks";

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
            <section className="mb-8">
                <FeaturedBooks />
            </section>

        </div>
    );
}