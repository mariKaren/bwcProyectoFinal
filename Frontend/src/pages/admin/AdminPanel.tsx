import { Link } from 'react-router';

export function AdminPanel() {
    return (
        <div className="p-4 space-y-9 text-center">
            <h1 className="text-2xl font-bold text-red">Panel de Administración</h1>
            <div className="space-x-6 text-white font-semibold">
                <Link to="/admin/libros/crear" className="bg-green px-4 py-2 rounded hover:bg-green">
                Crear Libro
                </Link>
                <Link to="/libros/busqueda" className="bg-orange px-4 py-2 rounded hover:bg-orange-dark">
                Editar o Eliminar Libros
                </Link>
                <Link to="/admin/autores/crear" className="bg-green px-4 py-2 rounded hover:bg-green">
                Crear Autor
                </Link>
            </div>
        </div>
    );
}