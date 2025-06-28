import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
    return (
        <>
        <Header />
        <main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-8">
            <Outlet />
        </main>
        <Footer />
        </>
    );
}