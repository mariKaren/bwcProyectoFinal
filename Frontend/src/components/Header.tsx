import { useState } from "react";
import { Link, NavLink, useLocation,useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/useAuth";

export default function Header() {
    const { isAuthenticated, logout,isAdmin } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Función para manejar el logout y redirigir
    const handleLogout = () => {
        logout();
        setAccountDropdownOpen(false);
        setMenuOpen(false);
        navigate("/libros/busqueda");
    };

    return (
        <header className="shadow-md bg-beige">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">

                {/* Logo */}
                <Link to="/" aria-label="Ir a la página de inicio">
                    <img src="/src/assets/Book.png" alt="Logo de la libreria" className="h-15 lg:h-20 w-auto" />
                </Link>

                {/* Botón hamburguesa (solo mobile) */}
                <button className="md:hidden text-brown" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Nav */}
                <nav className={`${ menuOpen ? "block" : "hidden" } md:flex md:items-center absolute md:static top-24 left-0 w-full md:w-auto bg-beige z-20 px-6 md:px-0 lg:text-lg`}>
                    <ul className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 md:items-center text-brown w-full md:w-auto">

                        {/* Libros */}
                        <li className="w-full md:w-auto">
                            <NavLink
                                to="/libros/busqueda"
                                className={({ isActive }) =>`pr-2 py-1 md:pl-2 transition-all duration-200 font-semibold 
                                ${isActive ? "text-orange " : ""} hover:text-red`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Libros
                            </NavLink>
                        </li>
                        
                        {/* Sobre nosotros */}
                        <li className="w-full md:w-auto">
                            <NavLink
                                to="/sobre-nosotros"
                                className={({ isActive }) =>`pr-2 py-1 md:pl-2 transition-all duration-200 
                                ${isActive ? "text-orange font-semibold " : ""} hover:text-red`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Sobre nosotros
                            </NavLink>
                        </li>

                        {/* Contacto */}
                        <li className="w-full md:w-auto">
                            <NavLink
                                to="/contacto"
                                className={({ isActive }) =>`pr-2 py-1 md:pl-2 transition-all duration-200  
                                ${isActive ? "text-orange font-semibold" : ""} hover:text-red`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Contacto
                            </NavLink>
                        </li>

                        {/* Mi cuenta */}
                        <li className="w-full md:w-auto relative">
                            {isAuthenticated ? (
                                <div>
                                    <button
                                        onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                                        className={`text-beige rounded mb-3 md:mb-0 font-semibold px-4 py-1.5 transition-all duration-300 ease-in-out md:inline-flex md:w-auto flex items-center ${
                                        location.pathname === "/wishlist" ? "bg-orange-dark font-semibold" : "bg-orange"
                                        } hover:bg-orange-dark hover:shadow-md`}
                                        aria-label="Abrir menú de cuenta"
                                    >
                                        Mi cuenta
                                        {/* Solo en mobile */}
                                        <span className="md:hidden ml-2">
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${
                                                accountDropdownOpen ? "rotate-180" : ""
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
                                    {/* Dropdown desktop */}
                                    {accountDropdownOpen && (
                                        <ul className="hidden md:block text-center absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-md rounded w-max z-20 p-1 md:w-35">
                                            {/* Diferenciacion de admin a user */}
                                            {isAdmin ? (
                                                <li>
                                                <NavLink
                                                    to="/admin"
                                                    onClick={() => {
                                                    setAccountDropdownOpen(false);
                                                    setMenuOpen(false);
                                                    }}
                                                    className="block px-3 py-2 text-brown hover:bg-gray-100 hover:text-orange transition-all duration-300"
                                                >
                                                    Panel Admin
                                                </NavLink>
                                                </li>
                                            ) : (
                                                <li>
                                                <NavLink
                                                    to="/wishlist"
                                                    onClick={() => {
                                                    setAccountDropdownOpen(false);
                                                    setMenuOpen(false);
                                                    }}
                                                    className="block px-3 py-2 text-brown hover:bg-gray-100 hover:text-orange transition-all duration-300"
                                                >
                                                    Wishlist
                                                </NavLink>
                                                </li>
                                            )}
                                            <li>
                                                <button
                                                onClick={handleLogout}
                                                className="block px-3 py-2 text-brown hover:bg-gray-100 hover:text-orange transition-all duration-300 w-full"
                                                >
                                                Logout
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                    {/* Dropdown mobile */}
                                    {accountDropdownOpen && (
                                        <ul className="flex flex-col pl-4 mt-1 mb-4 gap-2 border-l-2 border-orange-500 md:hidden w-full">
                                            {isAdmin ? (
                                                <li>
                                                <NavLink
                                                    to="/admin"
                                                    onClick={() => {
                                                    setAccountDropdownOpen(false);
                                                    setMenuOpen(false);
                                                    }}
                                                    className="block text-brown hover:text-orange transition-all duration-300"
                                                >
                                                    Panel Admin
                                                </NavLink>
                                                </li>
                                            ) : (
                                                <li>
                                                <NavLink
                                                    to="/wishlist"
                                                    onClick={() => {
                                                    setAccountDropdownOpen(false);
                                                    setMenuOpen(false);
                                                    }}
                                                    className="block text-brown hover:text-orange transition-all duration-300"
                                                >
                                                    Wishlist
                                                </NavLink>
                                                </li>
                                            )}
                                        </ul>
                                    )}
                                    </div>
                                ) : (
                                <NavLink
                                to="/login"
                                className="bg-orange text-white px-4 py-1.5 rounded transition-all duration-300 hover:bg-orange-dark hover:shadow-md text-center inline-block mb-4 md:mb-0"
                                onClick={() => setMenuOpen(false)}
                                >
                                    Mi cuenta
                                </NavLink>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}