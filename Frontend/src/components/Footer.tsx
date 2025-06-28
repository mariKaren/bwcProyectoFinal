export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Biblioteca Virtual. Todos los derechos reservados. | 
            <a href="/contacto" className="ml-1 text-blue-500 hover:underline">Contacto</a>
        </div>
        </footer>
    );
}