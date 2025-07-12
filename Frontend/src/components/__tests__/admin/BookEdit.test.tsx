import { render, screen} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import BookEdit from "../../../pages/admin/BookEdit";
import api from "../../../services/api";

vi.mock("../../../services/api");

describe("BookEdit", () => {
  beforeEach(() => {
    vi.mocked(api.get).mockImplementation((url: string) => {
      console.log("api.get llamado con:", url);
      if (url.includes("/books/1")) {
        return Promise.resolve({
          data: {
            data: {
              title: "Original",
              author: { id: 1, name: "Autor" },
              genre: "ficcion",
              publication_date: "01/01/2000",
              description: "desc",
            },
          },
        });
      }
      if (url === "/authors") {
        return Promise.resolve({ data: { data: [{ id: 1, name: "Autor" }] } });
      }
      return Promise.reject(new Error(`No encontrado: ${url}`));
    });
  });
  
  afterEach(() => {
    vi.clearAllMocks(); 
  });


  it("carga y muestra los datos del libro", async () => {
    render(
      <MemoryRouter initialEntries={["/libros/1/editar"]}>
        <Routes>
          <Route path="/libros/:id/editar" element={<BookEdit />} />
        </Routes>
      </MemoryRouter>
    );

    // Esperar a que aparezca el input de título
    const titleInput = await screen.findByDisplayValue("Original");
    expect(titleInput).toBeInTheDocument();

    // Verificar el select de autor
    const authorSelect = screen.getByRole("combobox", { name: /autor/i });
    expect(authorSelect).toHaveValue("1");

    // Verificar la fecha de publicación
    const dateInput = screen.getByLabelText(/fecha de publicación/i);
    expect(dateInput).toHaveValue("2000-01-01");

    // Verificar otros campos
    const genreSelect = screen.getByRole("combobox", { name: /género/i });
    expect(genreSelect).toHaveValue("ficcion");

    const descriptionTextarea = screen.getByLabelText(/descripción/i);
    expect(descriptionTextarea).toHaveValue("desc");

  });
});