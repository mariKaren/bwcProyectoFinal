export default function Footer() {
    return (
        <footer className="bg-beige border border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-2 text-center text-sm text-gray-600">
                <nav className="m-2 mb-4 md:text-base">
                    <a href="/" className="mx-4 hover:underline">Inicio</a>
                    <a href="/sobre-nosotros" className="mx-4 hover:underline">Sobre Nosotros</a>
                    <a href="/contacto" className="mx-4 hover:underline">Contacto</a>
                </nav>
                <p>© {new Date().getFullYear()} Book Worms Club. Karen Belen Mari.</p>
            </div>
        </footer>
    );
}