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

        await user.clear(screen.getByLabelText(/título/i));
        await user.type(screen.getByLabelText(/título/i), "Cien Años de Soledad");
        await user.selectOptions(screen.getByLabelText(/autor/i), "1");
        await user.selectOptions(screen.getByLabelText(/género/i), "ficcion");
        await user.clear(screen.getByLabelText(/fecha de publicación/i));
        await user.type(screen.getByLabelText(/fecha de publicación/i), "1967-05-30");

         // Simular carga de archivo
        const file = new File(["dummy content"], "portada.jpg", { type: "image/jpeg" });
        const fileInput = screen.getByLabelText(/portada/i);
        await user.upload(fileInput, file);

         // Simular clic en el botón de envío
        await user.click(screen.getByRole("button", { name: /crear libro/i }));
        
        // Extraer el FormData que se usó
        const formDataArg = vi.mocked(api.post).mock.calls[0][1] as FormData;

        // Verificar que sea un FormData
        expect(formDataArg).toBeInstanceOf(FormData);

        // Validar contenido del FormData
        const entries: Record<string, any> = {};
        formDataArg.forEach((value, key) => {
        entries[key] = value;
        });

        expect(entries.title).toBe("Cien Años de Soledad");
        expect(entries.author_id).toBe("1");
        expect(entries.genre).toBe("ficcion");
        expect(entries.publication_date).toBe("1967-05-30");
        expect(entries.description).toBe(""); 
        expect(entries.cover).toBe(file); 
    });
});