import { Link } from 'react-router';

export default function AdminPanel() {
    return (
        <div className="p-4 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-red font-text mb-8">Panel de Administración</h1>
            <div className="flex justify-center flex-wrap gap-x-9 gap-y-6 text-white font-semibold">
                <Link to="/admin/libros/crear" className="bg-green px-4 py-2 rounded hover:bg-green">
                Crear Libro
                </Link>
                <Link to="/libros/busqueda" className="bg-orange px-4 py-2 rounded hover:bg-orange-dark">
                Editar o Eliminar Libros
                </Link>
                <Link to="/admin/autores/crear" className="bg-green px-4 py-2 rounded hover:bg-green">
                Crear Autor
                </Link>
                <Link to="/admin/autores" className="bg-orange px-4 py-2 rounded hover:bg-orange-dark">
                Editar o Eliminar Autores
                </Link>
            </div>
        </div>
    );
}