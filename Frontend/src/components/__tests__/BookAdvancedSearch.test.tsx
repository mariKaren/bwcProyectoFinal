import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { useBookSearch } from '../../hooks/useBookSearch';
import AdvancedSearch from '../../pages/AdvancedSearch';
import api from '../../services/api';
import { vi } from 'vitest';

vi.mock('../../services/api', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('Hook useBookSearch', () => {
  const librosMock = [
    { id: 1, title: 'Libro A', author: {name:'Autor A'} },
    { id: 2, title: 'Libro B', author: {name:'Autor B'} },
  ];

  const paginacionMock = {
    current_page: 1,
    last_page: 2,
    per_page: 10,
    total: 20,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('carga libros al montar el hook', async () => {
    (api.get as any).mockResolvedValueOnce({
      data: {
        data: librosMock,
        pagination: paginacionMock,
      },
    });

    const { result } = renderHook(() => useBookSearch());

    await waitFor(() => {
      expect(result.current.books).toEqual(librosMock);
    });

    expect(api.get).toHaveBeenCalledWith('/books', { params: { page: 1 } });
  });

  it('permite buscar libros por título y autor', async () => {
    (api.get as any).mockResolvedValue({
      data: {
        data: librosMock,
        pagination: paginacionMock,
      },
    });

    const { result } = renderHook(() => useBookSearch());

    act(() => {
      result.current.setTitle('Libro A');
      result.current.setAuthor('Autor A');
    });

    await act(async () => {
      const eventoFalso = { preventDefault: vi.fn() } as any;
      result.current.handleSearch(eventoFalso);
    });

    await waitFor(() => {
      expect(result.current.books).toEqual(librosMock);
    });

    expect(api.get).toHaveBeenCalledWith('/books', {
      params: { page: 1, title: 'Libro A', author: 'Autor A' },
    });
  });

  it('permite cargar más libros', async () => {
    (api.get as any).mockResolvedValue({
      data: {
        data: librosMock,
        pagination: paginacionMock,
      },
    });

    const { result } = renderHook(() => useBookSearch());

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      result.current.handleLoadMore();
    });

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/books', {
        params: { page: 2 },
      });
    });
  });

  it('permite ver todos los libros reseteando filtros', async () => {
    const mockedResponse = {
      data: {
        data: [{ id: 1, title: 'Libro General' }],
        pagination: {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: 1,
        },
      },
    };

    (api.get as any).mockResolvedValue(mockedResponse);

    const { result } = renderHook(() => useBookSearch());

    act(() => {
      result.current.setTitle('algo');
      result.current.setAuthor('otro');
    });

    act(() => {
      result.current.handleViewAll();
    });

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/books', {
        params: { page: 1 },
      });

      expect(result.current.title).toBe('');
      expect(result.current.author).toBe('');
    });
  });
});

describe('Componente AdvancedSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('llama a la API con filtros al hacer clic en Buscar', async () => {
    (api.get as any).mockResolvedValueOnce({
      data: {
        data: [],
        pagination: {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: 0,
        },
      },
    });

    render(
  <MemoryRouter>
    <AdvancedSearch />
  </MemoryRouter>
);

    fireEvent.change(screen.getByPlaceholderText('Buscar por título...'), {
      target: { value: 'Harry' },
    });

    fireEvent.change(screen.getByPlaceholderText('Buscar por autor...'), {
      target: { value: 'Rowling' },
    });

    fireEvent.click(screen.getByText('Buscar'));

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/books', {
        params: { page: 1, title: 'Harry', author: 'Rowling' },
      });
    });
  });

  it('llama a la API sin filtros al hacer clic en Ver todos', async () => {
    (api.get as any).mockResolvedValueOnce({
      data: {
        data: [],
        pagination: {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: 0,
        },
      },
    });

     render(
    <MemoryRouter>
      <AdvancedSearch />
    </MemoryRouter>
  );

    fireEvent.click(screen.getByText('Ver todos'));

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/books', {
        params: { page: 1 },
      });
    });
  });
});