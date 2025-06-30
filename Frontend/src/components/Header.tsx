import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();

    const isLibrosActive = location.pathname.startsWith("/libros");

    return (
        <header className="shadow-md bg-beige">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">

                {/* Logo */}
                <Link to="/">
                    <img src="/src/assets/Book.png" alt="BWC logo" className="h-20 w-auto" />
                </Link>

                {/* Botón hamburguesa (solo mobile) */}
                <button className="md:hidden text-brown" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Nav */}
                <nav className={`${ menuOpen ? "block" : "hidden" } md:flex md:items-center absolute md:static top-24 left-0 w-full md:w-auto bg-beige z-10 px-6 md:px-0 lg:text-lg`}>
                    <ul className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 md:items-center text-brown w-full md:w-auto">

                        {/* Libros */}
                        <li className="w-full md:w-auto relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className={`w-full text-left font-semibold pr-2 py-1 md:pl-2 transition-all duration-300 ease-in-out md:inline-flex md:w-auto flex items-center ${
                                isLibrosActive ? "text-orange" : ""
                                }hover:border-b-2 hover:border-r-2 border-transparent hover:border-[var(--c-yellow)] hover:shadow-md`}
                            >
                                Libros
                            {/* SOLO flecha en mobile */}
                                <span className="md:hidden ml-2">
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${
                                        dropdownOpen ? "rotate-180" : ""
                                        }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </span>
                            </button>

                            {/* Dropdown desktop: solo si dropdownOpen */}
                            {dropdownOpen && (
                                <ul className="hidden md:block absolute left-0 mt-2 bg-white shadow-md rounded p-2 w-max z-20">
                                    <li>
                                        <NavLink
                                        to="/libros/avanzada"
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            setMenuOpen(false);
                                        }}
                                        className="block px-3 py-2 hover:bg-gray-100"
                                        >
                                        Búsqueda avanzada
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                        to="/libros/genero"
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            setMenuOpen(false);
                                        }}
                                        className="block px-3 py-2 hover:bg-gray-100"
                                        >
                                        Búsqueda por género
                                        </NavLink>
                                    </li>
                                </ul>
                            )}

                            {/* Dropdown mobile: dropdown abierto en el flujo normal */}
                            {dropdownOpen && (
                                <ul className="flex flex-col pl-4 mt-1 gap-2 border-l-2 border-orange-500 md:hidden w-full">
                                <li>
                                    <NavLink
                                    to="/libros/avanzada"
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        setMenuOpen(false);
                                    }}
                                    className="block text-brown hover:text-orange w-full"
                                    >
                                    Búsqueda avanzada
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                    to="/libros/genero"
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        setMenuOpen(false);
                                    }}
                                    className="block text-brown hover:text-orange w-full"
                                    >
                                    Búsqueda por género
                                    </NavLink>
                                </li>
                                </ul>
                            )}
                        </li>

                        {/* Quienes somos */}
                        <li className="w-full md:w-auto">
                            <NavLink
                                to="/quienes-somos"
                                className={({ isActive }) =>`pr-2 py-1 md:pl-2 transition-all duration-300 ease-in-out 
                                ${isActive ? "text-orange font-semibold " : ""}hover:border-b-2 hover:border-r-2 border-transparent hover:border-[var(--c-yellow)] hover:shadow-md`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Quiénes somos
                            </NavLink>
                        </li>

                        {/* Contacto */}
                        <li className="w-full md:w-auto">
                            <NavLink
                                to="/contacto"
                                className={({ isActive }) =>`pr-2 py-1 md:pl-2 transition-all duration-300 ease-in-out 
                                ${isActive ? "text-orange font-semibold " : ""}hover:border-b-2 hover:border-r-2 border-transparent hover:border-[var(--c-yellow)] hover:shadow-md`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Contacto
                            </NavLink>
                        </li>

                        {/* Mi cuenta */}
                        <li className="w-full md:w-auto">
                            <NavLink
                                to="/login"
                                className="bg-orange text-white px-4 py-1.5 rounded hover:bg-yellow text-center inline-block mb-4 md:mb-0"
                                onClick={() => setMenuOpen(false)}
                            >
                                Mi cuenta
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}