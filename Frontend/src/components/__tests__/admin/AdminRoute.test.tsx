import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { AdminRoute } from "../../../routes/AdminRoute";
import { useAuth } from "../../../context/useAuth";
import { vi } from "vitest";

vi.mock("../../../context/useAuth", () => ({
    useAuth: vi.fn(),
}));

const DummyAdmin = () => <div>Contenido Admin</div>;

describe("AdminRoute", () => {
    beforeEach(() => {
        // Limpia los mocks antes de cada test
        vi.mocked(useAuth).mockReset();
    });

    test("redirige si no es admin", () => {
        // Configura el mock para un usuario autenticado pero no administrador
        vi.mocked(useAuth).mockReturnValue({
        isAuthenticated: true,
        isAdmin: false,
        loading: false,
        user: null, // Simula la propiedad user
        login: vi.fn(), // Simula la función login
        register: vi.fn(), // Simula la función register
        logout: vi.fn(), // Simula la función logout
        });

        render(
        <MemoryRouter initialEntries={["/admin"]}>
            <Routes>
            <Route path="/admin" element={<AdminRoute />}>
                <Route index element={<DummyAdmin />} />
            </Route>
            <Route path="/" element={<div>Home</div>} />
            </Routes>
        </MemoryRouter>
        );

        expect(screen.getByText("Home")).toBeInTheDocument();
    });

    test("muestra admin si está autenticado y es admin", () => {
        // Configura el mock para un usuario autenticado y administrador
        vi.mocked(useAuth).mockReturnValue({
        isAuthenticated: true,
        isAdmin: true,
        loading: false,
        user: null, 
        login: vi.fn(), 
        register: vi.fn(), 
        logout: vi.fn(),
        });

        render(
        <MemoryRouter initialEntries={["/admin"]}>
            <Routes>
            <Route path="/admin" element={<AdminRoute />}>
                <Route index element={<DummyAdmin />} />
            </Route>
            </Routes>
        </MemoryRouter>
        );

        expect(screen.getByText("Contenido Admin")).toBeInTheDocument();
    });

    test("muestra mensaje de carga si loading es true", () => {
        // Configura el mock para un estado de carga
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
        <MemoryRouter initialEntries={["/admin"]}>
            <Routes>
            <Route path="/admin" element={<AdminRoute />}>
                <Route index element={<DummyAdmin />} />
            </Route>
            </Routes>
        </MemoryRouter>
        );

        expect(screen.getByText("Verificando permisos...")).toBeInTheDocument();
    });

    test("redirige a login si no está autenticado", () => {
        // Configura el mock para un usuario no autenticado
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
        <MemoryRouter initialEntries={["/admin"]}>
            <Routes>
            <Route path="/admin" element={<AdminRoute />}>
                <Route index element={<DummyAdmin />} />
            </Route>
            <Route path="/login" element={<div>Login</div>} />
            </Routes>
        </MemoryRouter>
        );

        expect(screen.getByText("Login")).toBeInTheDocument();
    });
});