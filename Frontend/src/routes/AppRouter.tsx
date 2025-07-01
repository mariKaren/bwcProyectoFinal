import { Routes, Route } from "react-router";
import Layout from "../layout/Layout";

import Home from "../pages/Home";
import {About} from "../pages/About";
import {Contact} from "../pages/Contact";
import {Wishlist} from "../pages/Wishlist";
import {Login} from "../pages/Login";
import {Genres} from "../pages/Genres";
import {AdvancedSearch} from "../pages/AdvancedSearch.tsx";
/* import {AdminPanel} from "../pages/AdminPanel"; */

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/quienes-somos" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/libros/genero" element={<Genres />} />
                <Route path="/libros/busqueda" element={<AdvancedSearch />} />
                {/* <Route path="/admin" element={<AdminPanel />} /> */}
            </Route>

            {/* Login y registro fuera del layout */}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/registro" element={<Register />} /> */}
        </Routes>
        
    );
}