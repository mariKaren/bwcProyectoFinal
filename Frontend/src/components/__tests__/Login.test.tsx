import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Login } from "../../pages/Login";
import { useAuth } from "../../context/useAuth";
import { BrowserRouter } from "react-router";
import { vi } from "vitest";

// Mock del useAuth
vi.mock("../../context/useAuth", () => ({
    useAuth: vi.fn(),
}));

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("Login Component", () => {
    const mockLogin = vi.fn();
    const mockRegister = vi.fn();
    const mockLogout = vi.fn();
    const mockedUseAuth = useAuth as jest.Mock;

    const setup = (isAuthenticated = false, isAdmin = false, loading = false) => {
        mockedUseAuth.mockReturnValue({
        login: mockLogin,
        register: mockRegister,
        logout: mockLogout,
        isAuthenticated,
        isAdmin,
        user: isAuthenticated ? { role: isAdmin ? "admin" : "user" } : null,
        loading,
        });

        render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renderiza campos de login correctamente", () => {
        setup();
        expect(screen.getByPlaceholderText("Correo electrónico")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
        expect(screen.getByText(/¿No tenés cuenta\?/i)).toBeInTheDocument();
    });

    it("muestra formulario de registro al alternar", () => {
        setup();
        fireEvent.click(screen.getByRole("button", { name: /Registrate/i }));
        expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Registrarse/i })).toBeInTheDocument();
        expect(screen.getByText(/¿Ya tenés cuenta\?/i)).toBeInTheDocument();
    });

    it("limpia errores al alternar entre login y registro", async () => {
        setup();
        fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));
        await waitFor(() => {
        expect(screen.getByText("Correo electrónico inválido")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole("button", { name: /Registrate/i }));
        await waitFor(() => {
        expect(screen.queryByText("Correo electrónico inválido")).not.toBeInTheDocument();
        });
    });

    it("muestra errores de validación para campos vacíos en login", async () => {
        setup();
        fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));
        await waitFor(() => {
        expect(screen.getByText("Correo electrónico inválido")).toBeInTheDocument();
        expect(screen.getByText("La contraseña es obligatoria")).toBeInTheDocument();
        });
    });

    it("envía datos válidos para login", async () => {
        setup();
        fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
        target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
        target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));
        await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
        });
    });

    it("envía datos válidos para registro", async () => {
        setup();
        fireEvent.click(screen.getByRole("button", { name: /Registrate/i }));
        fireEvent.change(screen.getByPlaceholderText("Nombre"), {
        target: { value: "Juan" },
        });
        fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
        target: { value: "juan@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
        target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Registrarse/i }));
        await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith("Juan", "juan@example.com", "password123");
        });
    });

    it("muestra error de backend para login fallido (401)", async () => {
        mockLogin.mockRejectedValueOnce({
            response: { status: 401 },
        });
        setup();
        fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));
        await waitFor(
            () => {
            expect(screen.getByText(/Correo o contraseña incorrectos/i)).toBeInTheDocument();
            },
            { timeout: 2000 }
        );
    });

    it("muestra error de backend para registro fallido (422, email existente)", async () => {
        mockRegister.mockRejectedValueOnce({
            response: {
            status: 422,
            data: { errors: { email: ["The email has already been taken."] } },
            },
        });
        setup();
        fireEvent.click(screen.getByRole("button", { name: /Registrate/i }));
        await waitFor(() => {
            expect(screen.getByRole("heading", { name: /Registrarse/i })).toBeInTheDocument();
        });
        fireEvent.change(screen.getByPlaceholderText("Nombre"), {
            target: { value: "Juan" },
        });
        fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
            target: { value: "juan@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Registrarse/i }));
        await waitFor(
            () => {
            expect(screen.getByText(/El correo ya está registrado/i)).toBeInTheDocument();
            },
            { timeout: 2000 }
        );
    });

    it("muestra estado de carga durante login", async () => {
        setup(false, false, true);
        expect(screen.getByRole("button", { name: /Iniciando sesión.../i })).toBeInTheDocument();
    });
    
});