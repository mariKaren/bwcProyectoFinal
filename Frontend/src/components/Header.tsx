import { Link, NavLink} from "react-router";


export default function Header() {
    return (
        <header className="shadow-md bg-beige">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
                {/* Logo */}
                <Link to="/">
                    <img src="/src/assets/Book.png" alt="BWC logo" className="h-20 w-auto"/>
                </Link>

                {/* Nav */}
                <nav>
                    <ul className="flex gap-6 items-center text-brown">
                        <li>
                            <NavLink to="/quienes-somos" className={({ isActive }) => isActive ? "text-orange font-semibold" : ""}>
                                Quiénes somos
                            </NavLink>
                        </li>
                        <li>
                        </li>
                        <li>
                            <NavLink
                                to="/contacto"
                                className={({ isActive }) =>
                                isActive ? "text-orange font-semibold" : ""
                                }
                            >
                                Contacto
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/login"
                                className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600"
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
