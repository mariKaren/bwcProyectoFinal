import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AdminPanel from "../../../pages/admin/AdminPanel";

test("muestra los botones del panel admin", () => {
    render(
        <MemoryRouter>
        <AdminPanel />
        </MemoryRouter>
    );

    expect(screen.getByText("Crear Libro")).toBeInTheDocument();
    expect(screen.getByText("Editar o Eliminar Libros")).toBeInTheDocument();
    expect(screen.getByText("Crear Autor")).toBeInTheDocument();
});