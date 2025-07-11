import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BookDetail } from '../../pages/BookDetail';
import { useBookDetail } from '../../hooks/useBookDetail';

// Mock del hook useBookDetail
vi.mock('../../hooks/useBookDetail');

describe('BookDetail', () => {
    const mockBook = {
        id: 1,
        title: 'Test Book',
        author: { id: 1, name: 'Author Name' }, 
        author_id: 1,
        cover: '/cover.jpg',
        genre: 'Fiction',
        description: 'A test book description',
        publication_date: '2023-01-01',
    };

    const baseMock = {
        book: mockBook,
        reviews: [],
        isLoading: false,
        loading: false,
        isInWishlist: false,
        hasUserReviewed: false,
        showReviewForm: false,
        reviewDescription: '',
        reviewRating: 5,
        isAuthenticated: true,
        isAdmin: false,
        user: { id: 1, role: 'user', name: 'User1', email: 'user1@example.com' },
        message: null,
        setMessage: vi.fn(),
        setShowReviewForm: vi.fn(),
        setReviewDescription: vi.fn(),
        setReviewRating: vi.fn(),
        handleDeleteReview: vi.fn(),
        handleAddToWishlist: vi.fn(),
        handleRemoveFromWishlist: vi.fn(),
        handleSubmitReview: vi.fn(),
        handleDeleteBook: vi.fn(),
        navigate: vi.fn(),
    };

    beforeEach(() => {
        vi.mocked(useBookDetail).mockReturnValue(baseMock);
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it('muestra el estado de carga', () => {
        vi.mocked(useBookDetail).mockReturnValueOnce({ ...baseMock, isLoading: true });
        render(<BookDetail />);
        expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });

    it('muestra mensaje de libro no encontrado', () => {
        vi.mocked(useBookDetail).mockReturnValueOnce({ ...baseMock, book: null });
        render(<BookDetail />);
        expect(screen.getByText('Libro no encontrado')).toBeInTheDocument();
    });

    it('renderiza la información del libro y botones para usuario', () => {
        render(<BookDetail />);
        expect(screen.getByText('Test Book')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Agregar a Wishlist' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Escribir Reseña' })).toBeInTheDocument();
    });

    it('muestra botones de administrador', () => {
        vi.mocked(useBookDetail).mockReturnValueOnce({
        ...baseMock,
        isAdmin: true,
        user: { id: 1, role: 'admin', name: 'User1', email: 'user1@example.com' },
        });
        render(<BookDetail />);
        expect(screen.getByRole('button', { name: 'Editar Libro' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Eliminar Libro' })).toBeInTheDocument();
    });

    it('activa/desactiva el formulario de reseñas al hacer clic', () => {
        const mockSetShowReviewForm = vi.fn();
        vi.mocked(useBookDetail).mockReturnValueOnce({
        ...baseMock,
        setShowReviewForm: mockSetShowReviewForm,
        });

        render(<BookDetail />);
        const reviewButton = screen.getByRole('button', { name: 'Escribir Reseña' });
        fireEvent.click(reviewButton);

        expect(mockSetShowReviewForm).toHaveBeenCalledWith(expect.any(Function));
    });
});