import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { describe, test, beforeEach, vi } from "vitest";
import  Wishlist from "../../pages/Wishlist";
import { useAuth } from "../../context/useAuth";
import api from "../../services/api";

// Definir tipo para el contexto de autenticación
type AuthContextType = {
    isAuthenticated: boolean;
    isAdmin: boolean;
    loading: boolean;
    user: { id: number; name: string; role: string; email: string } | null;
    login: () => void;
    register: () => void;
    logout: () => void;
};

// Mockea el módulo de useAuth
vi.mock("../../context/useAuth", () => ({
    useAuth: vi.fn<() => AuthContextType>(),
}));

// Mockea el módulo api
vi.mock("../../services/api", () => ({
    default: {
        get: vi.fn<() => Promise<any>>(),
    },
}));

// Mockea BookGrid para simplificar el render
vi.mock("../../components/BookGrid", () => ({
    default: ({ books, isLoading }: { books: any[]; isLoading: boolean }) => (
        <div>
        {isLoading ? (
            <div>Loading Books...</div>
        ) : (
            <div>
            {books.map((book) => (
                <div key={book.id}>{book.title}</div>
            ))}
            </div>
        )}
        </div>
    ),
}));

describe("Wishlist", () => {
    beforeEach(() => {
        vi.mocked(useAuth).mockReset();
        vi.mocked(api.get).mockReset();
    });

    test("muestra mensaje de carga si loading es true", () => {
            vi.mocked(useAuth).mockReturnValue({
            isAuthenticated: false,
            isAdmin: false,
            loading: true,
            user: null,
            login: vi.fn(),
            register: vi.fn(),
            logout: vi.fn(),
        });

        render(
        <MemoryRouter initialEntries={["/wishlist"]}>
            <Wishlist />
        </MemoryRouter>
        );

        expect(screen.getByText("Cargando...")).toBeInTheDocument();
    });

    test("redirige a login si no está autenticado", () => {
        vi.mocked(useAuth).mockReturnValue({
            isAuthenticated: false,
            isAdmin: false,
            loading: false,
            user: null,
            login: vi.fn(),
            register: vi.fn(),
            logout: vi.fn(),
        });

        render(
        <MemoryRouter initialEntries={["/wishlist"]}>
            <Routes>
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<div>Login</div>} />
            </Routes>
        </MemoryRouter>
        );

        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    test("muestra mensaje para administradores", () => {
        vi.mocked(useAuth).mockReturnValue({
            isAuthenticated: true,
            isAdmin: true,
            loading: false,
            user: { id: 1, name: "Admin", role: "admin", email: "admin@example.com" },
            login: vi.fn(),
            register: vi.fn(),
            logout: vi.fn(),
        });

        render(
        <MemoryRouter initialEntries={["/wishlist"]}>
            <Wishlist />
        </MemoryRouter>
        );

        expect(screen.getByText("Sos admin, ¿para qué querés una wishlist?")).toBeInTheDocument();
    });

    test("muestra la wishlist para usuarios regulares", async () => {
        vi.mocked(useAuth).mockReturnValue({
            isAuthenticated: true,
            isAdmin: false,
            loading: false,
            user: { id: 1, name: "User", role: "user", email: "user@example.com" },
            login: vi.fn(),
            register: vi.fn(),
            logout: vi.fn(),
        });

        vi.mocked(api.get).mockResolvedValue({
            data: {
                data: [
                { book: { id: 1, title: "Book 1", author: { name: "Author 1" }, cover: "/cover1.jpg" } },
                { book: { id: 2, title: "Book 2", author: { name: "Author 2" }, cover: "/cover2.jpg" } },
                ],
            },
        });

        render(
        <MemoryRouter initialEntries={["/wishlist"]}>
            <Wishlist />
        </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Mi Wishlist")).toBeInTheDocument();
            expect(screen.getByText("Book 1")).toBeInTheDocument();
            expect(screen.getByText("Book 2")).toBeInTheDocument();
        });
    });

    test("maneja errores en la solicitud de la wishlist", async () => {
        vi.mocked(useAuth).mockReturnValue({
            isAuthenticated: true,
            isAdmin: false,
            loading: false,
            user: { id: 1, name: "User", role: "user", email: "user@example.com" },
            login: vi.fn(),
            register: vi.fn(),
            logout: vi.fn(),
        });

        vi.mocked(api.get).mockRejectedValue(new Error("Error al cargar wishlist"));

        render(
        <MemoryRouter initialEntries={["/wishlist"]}>
            <Wishlist />
        </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Mi Wishlist")).toBeInTheDocument();
            expect(screen.queryByText("Book 1")).not.toBeInTheDocument();
        });
    });
});