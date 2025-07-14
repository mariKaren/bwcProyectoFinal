import { Routes, Route } from "react-router";
import Layout from "../layout/Layout";
import AdminRoute from "./AdminRoute"; 

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Wishlist from "../pages/Wishlist";
import Login from "../pages/Login";
import AdvancedSearch from "../pages/AdvancedSearch.tsx";
import BookDetail from "../pages/BookDetail.tsx";
import BookEdit from "../pages/admin/BookEdit.tsx";
import AdminPanel from "../pages/admin/AdminPanel.tsx";
import BookCreate from "../pages/admin/BookCreate.tsx";
import AuthorCreate from "../pages/admin/AuthorCreate.tsx";
import AuthorView from "../pages/admin/AuthorView.tsx";
import AuthorEdit from "../pages/admin/AuthorEdit.tsx";
import NotFound from "../pages/NotFound.tsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/sobre-nosotros" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/libros/busqueda" element={<AdvancedSearch />} />
                <Route path="/libros/:id" element={<BookDetail/>} />
                {/* Rutas protegidas admin */}
                <Route path="/admin" element={<AdminRoute />}>
                    <Route index element={<AdminPanel />} />
                    <Route path="libros/:id/editar" element={<BookEdit />} />
                    <Route path="libros/crear" element={<BookCreate />} />
                    <Route path="autores/crear" element={<AuthorCreate />} />
                    <Route path="autores" element={<AuthorView />} />
                    <Route path="autores/editar/:id" element={<AuthorEdit />} />
                </Route>
            </Route>

            {/* Login y registro fuera del layout */}
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
        
    );
}