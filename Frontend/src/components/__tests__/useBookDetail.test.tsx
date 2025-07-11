import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useBookDetail } from '../../hooks/useBookDetail';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../../context/useAuth';
import api from '../../services/api';

// Mock de dependencias
vi.mock('../../services/api');
vi.mock('react-router', () => ({
    useParams: vi.fn(),
    useNavigate: vi.fn(),
}));
vi.mock('../../context/useAuth', () => ({
    useAuth: vi.fn(),
}));

describe('useBookDetail', () => {
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

    const mockReviews = [
        { id: 1, user_id: 1, book_id: 1, description: 'Great book!', rating: 5, user: { id:1, name: 'User1',email:'user@example.com',role:'user'} },
    ];

    const mockUser = { id: 1, role: 'user', name: 'User1', email: 'user1@example.com' }; 

    beforeEach(() => {
        vi.clearAllMocks();
        (useParams as ReturnType<typeof vi.fn>).mockReturnValue({ id: '1' });
        (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(vi.fn());
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            user: mockUser,
            isAuthenticated: true,
            loading: false,
            isAdmin: false,
        });
        (api.get as ReturnType<typeof vi.fn>).mockImplementation((url) => {
            if (url === '/books/1') {
                return Promise.resolve({ data: { data: mockBook } });
            }
            if (url === '/books/1/reviews') {
                return Promise.resolve({ data: { data: mockReviews } });
            }
            if (url === '/wishlist') {
                return Promise.resolve({ data: { data: [] } });
            }
            return Promise.reject(new Error(`Not found: ${url}`));
        });
        (api.post as ReturnType<typeof vi.fn>).mockImplementation((url) => {
            if (url === '/wishlist') {
                return Promise.resolve({});
            }
            return Promise.reject(new Error(`Not found: ${url}`));
        });
    });

    it('carga el libro y las reseñas al montar el componente', async () => {
        const { result } = renderHook(() => useBookDetail());

        await waitFor(
        () => {
            console.log('isLoading:', result.current.isLoading, 'book:', result.current.book); // Depuración
            expect(result.current.isLoading).toBe(false);
        },
        { timeout: 2000 }
        );
        expect(result.current.book).toEqual(mockBook);
        expect(result.current.reviews).toEqual(mockReviews);
        expect(result.current.hasUserReviewed).toBe(true);
    });

    it('agrega un libro a la lista de deseos', async () => {
        const { result } = renderHook(() => useBookDetail());

        await waitFor(
        () => expect(result.current.isLoading).toBe(false),
        { timeout: 2000 }
        );
        await act(async () => {
        await result.current.handleAddToWishlist();
        });

        expect(result.current.isInWishlist).toBe(true);
        expect(result.current.message).toEqual({
        messageText: 'Libro agregado a tu wishlist',
        type: 'success',
        });
    });

    it('envía una reseña correctamente', async () => {
        const newReview = {
        id: 2,
        user_id: mockUser.id,
        book_id: mockBook.id,
        description: 'New review',
        rating: 4,
        user: { name: 'User1' },
        };

        vi.spyOn(api, 'post').mockImplementationOnce((url) => {
        console.log('Mock api.post called with URL:', url); // Depuración
        if (url === '/reviews') {
            return Promise.resolve({ data: { data: newReview } });
        }
        return Promise.reject(new Error(`Not found: ${url}`));
        });

        const { result } = renderHook(() => useBookDetail());

        await waitFor(
        () => expect(result.current.isLoading).toBe(false),
        { timeout: 2000 }
        );

        await act(async () => {
        result.current.setReviewDescription('New review');
        result.current.setReviewRating(4);
        });

        await act(async () => {
        await result.current.handleSubmitReview();
        });

        expect(api.post).toHaveBeenCalledWith('/reviews', {
        book_id: mockBook.id,
        description: 'New review',
        rating: 4,
        });

        expect(result.current.reviews).toContainEqual(newReview);
        expect(result.current.hasUserReviewed).toBe(true);
        expect(result.current.message).toEqual({
        messageText: '¡Gracias por tu reseña!',
        type: 'success',
        });
    });

});