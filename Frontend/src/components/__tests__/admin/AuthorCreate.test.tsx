import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AuthorCreate from "../../../pages/admin/AuthorCreate";
import { vi } from "vitest";
import api from "../../../services/api";

// Configura el mock del módulo api
vi.mock("../../../services/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("AuthorCreate", () => {
  beforeEach(() => {
    vi.mocked(api.post).mockReset(); // Limpia el mock antes de cada test
    vi.mocked(api.post).mockResolvedValueOnce({
      data: {
        status: "success",
        message: "Author created successfully",
        data: { id: 1, name: "Gabriel García Márquez" },
      },
    });
  });

  test("crea un autor exitosamente", async () => {
    render(
      <MemoryRouter>
        <AuthorCreate />
      </MemoryRouter>
    );

    // Simula el cambio en el campo de nombre
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Gabriel García Márquez" },
    });

    // Simula el clic en el botón
    fireEvent.click(screen.getByRole("button", { name: /crear autor/i }));

    // Verifica que se llamó a api.post con los datos correctos
    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith(
        "/authors",
        expect.objectContaining({
          name: "Gabriel García Márquez",
        })
      )
    );
  });
});