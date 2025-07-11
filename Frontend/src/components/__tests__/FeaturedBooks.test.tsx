import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import FeaturedBooks from "../FeaturedBooks";
import api from "../../services/api";
import { vi, describe, test, beforeEach } from "vitest";

// Mock api
vi.mock("../../services/api", () => ({
    default: {
        get: vi.fn(),
    },
}));

// Mock BookGrid
vi.mock("../BookGrid", () => ({
    default: ({ books, isLoading }: { books: any[]; isLoading: boolean }) => (
        <div>
        {isLoading ? (
            <div>Loading Books...</div>
        ) : (
            books.map((book) => <div key={book.id}>{book.title}</div>)
        )}
        </div>
    ),
}));

describe("FeaturedBooks", () => {
    beforeEach(() => {
        vi.mocked(api.get).mockReset();
    });

    test("muestra mensaje de carga mientras se carga", async () => {
        vi.mocked(api.get).mockResolvedValue({
        data: { data: [] },
        });

        render(
        <MemoryRouter>
            <FeaturedBooks />
        </MemoryRouter>
        );

        expect(screen.getByText(/loading books/i)).toBeInTheDocument();

        await waitFor(() => {
        expect(screen.queryByText(/loading books/i)).not.toBeInTheDocument();
        });
    });

    test("muestra libros cuando la API responde", async () => {
        vi.mocked(api.get).mockResolvedValue({
        data: {
            data: [
            { id: 1, title: "Libro 1", author: { name: "Autor 1" }, cover: "/img1.jpg" },
            { id: 2, title: "Libro 2", author: { name: "Autor 2" }, cover: "/img2.jpg" },
            ],
        },
        });

        render(
        <MemoryRouter>
            <FeaturedBooks />
        </MemoryRouter>
        );

        await waitFor(() => {
        expect(screen.getByText("Libro 1")).toBeInTheDocument();
        expect(screen.getByText("Libro 2")).toBeInTheDocument();
        });
    });

    test("muestra el link 'Ver más'", async () => {
        vi.mocked(api.get).mockResolvedValue({ data: { data: [] } });

        render(
        <MemoryRouter>
            <FeaturedBooks />
        </MemoryRouter>
        );

        await waitFor(() => {
        const link = screen.getByText("Ver más");
        expect(link).toHaveAttribute("href", "/libros/busqueda");
        });
    });

    test("maneja errores sin romper", async () => {
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        vi.mocked(api.get).mockRejectedValue(new Error("Error al cargar"));

        render(
        <MemoryRouter>
            <FeaturedBooks />
        </MemoryRouter>
        );

        await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
            "Error fetching featured books:",
            expect.any(Error)
        );
        });

        consoleSpy.mockRestore();
    });
});