import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookCreate from "../../../pages/admin/BookCreate";
import { MemoryRouter } from "react-router";
import api from "../../../services/api";
import { vi } from "vitest";

vi.mock("../../../services/api");

describe("BookCreate", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Simular respuesta del endpoint de autores
        vi.mocked(api.get).mockResolvedValueOnce({
        data: { data: [{ id: 1, name: "Autor 1" }] },
        });
        // Simular respuesta exitosa al crear libro
        vi.mocked(api.post).mockResolvedValueOnce({});
    });

    test("crea un libro exitosamente", async () => {
        const user = userEvent.setup();

        render(
        <MemoryRouter>
            <BookCreate />
        </MemoryRouter>
        );

        // Esperar a que los autores se carguen
        await waitFor(() => {
        expect(screen.getByText("Autor 1")).toBeInTheDocument();
        });

        // Interacciones del usuario
        await user.clear(screen.getByLabelText(/título/i));
        await user.type(screen.getByLabelText(/título/i), "Cien Años de Soledad");
        await user.selectOptions(screen.getByLabelText(/autor/i), "1");
        await user.selectOptions(screen.getByLabelText(/género/i), "ficcion");
        await user.clear(screen.getByLabelText(/fecha de publicación/i));
        await user.type(screen.getByLabelText(/fecha de publicación/i), "1967-05-30");

        // Simular clic en el botón de envío
        await user.click(screen.getByRole("button", { name: /crear libro/i }));

        // Verificar que se hizo el POST con los datos correctos
        await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith(
            "/books",
            expect.objectContaining({
            title: "Cien Años de Soledad",
            author_id: "1", // author_id se envía como string desde el formulario
            genre: "ficcion",
            publication_date: "1967-05-30",
            description: "", // description es opcional y está vacío
            })
        );
        });
    });
});