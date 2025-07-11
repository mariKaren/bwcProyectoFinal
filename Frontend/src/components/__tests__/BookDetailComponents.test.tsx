import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookInfo } from '../BookDetail/BookInfo';
import { ReviewForm } from '../BookDetail/ReviewForm';
import { ReviewList } from '../BookDetail/ReviewList';
import { WishlistButton } from '../BookDetail/WishlistButtons';

describe('Componentes de BookDetail', () => {
  // Mock de datos para BookInfo
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

  // Mock de datos para ReviewList
  const mockReviews = [
    {
        id: 1,
        user_id: 1,
        book_id: 1, 
        description: 'Great book!',
        rating: 5,
        user:
            { id: 1,
            name: 'User1', 
            role: 'user',
            email: 'user1@example.com'
        }, 
    },
    ];

  // Mock de props para ReviewForm
  const mockReviewFormProps = {
    showReviewForm: true,
    reviewDescription: '',
    reviewRating: 5,
    setReviewDescription: vi.fn(),
    setReviewRating: vi.fn(),
    handleSubmitReview: vi.fn(),
  };

  // Mock de props para ReviewList
  const mockReviewListProps = {
    reviews: mockReviews,
    isAuthenticated: true,
    isAdmin: false,
    user: { id: 1, role: 'user', name: 'User1',email: 'user1@example.com', },
    handleDeleteReview: vi.fn(),
  };

  const mockHandleDelete = vi.fn();

  // Mock de props para WishlistButton
  const mockWishlistButtonProps = {
    isInWishlist: false,
    handleAddToWishlist: vi.fn(),
    handleRemoveFromWishlist: vi.fn(),
  };

  describe('BookInfo', () => {
    it('renderiza la información del libro correctamente', () => {
      render(<BookInfo book={mockBook} />);
      expect(screen.getByText('Test Book')).toBeInTheDocument();
      expect(screen.getByText('Author Name')).toBeInTheDocument();
      expect(screen.getByText('Fiction')).toBeInTheDocument();
      expect(screen.getByText('2023-01-01')).toBeInTheDocument();
      expect(screen.getByText('A test book description')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', '/cover.jpg');
    });

    it('usa la portada por defecto cuando no hay portada', () => {
      const bookWithoutCover = { ...mockBook, cover: undefined };
      render(<BookInfo book={bookWithoutCover} />);
      expect(screen.getByRole('img')).toHaveAttribute('src', '/src/assets/portada.jpg');
    });
  });

  describe('ReviewForm', () => {
    it('se renderiza cuando showReviewForm es verdadero', () => {
      render(<ReviewForm {...mockReviewFormProps} />);
      expect(screen.getByText('Tu Reseña')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Escribe tu reseña...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Enviar Reseña' })).toBeInTheDocument();
    });

    it('actualiza la descripción y el rating, y envía el formulario', () => {
      render(<ReviewForm {...mockReviewFormProps} />);
      const textarea = screen.getByPlaceholderText('Escribe tu reseña...');
      const select = screen.getByRole('combobox');
      const submitButton = screen.getByRole('button', { name: 'Enviar Reseña' });

      fireEvent.change(textarea, { target: { value: 'Great book!' } });
      fireEvent.change(select, { target: { value: '4' } });
      fireEvent.click(submitButton);

      expect(mockReviewFormProps.setReviewDescription).toHaveBeenCalledWith('Great book!');
      expect(mockReviewFormProps.setReviewRating).toHaveBeenCalledWith(4);
      expect(mockReviewFormProps.handleSubmitReview).toHaveBeenCalled();
    });
  });

  describe('ReviewList', () => {
    it('renderiza las reseñas cuando el usuario está autenticado', () => {
      render(<ReviewList {...mockReviewListProps} />);
      expect(screen.getByText('Reseñas')).toBeInTheDocument();
      expect(screen.getByText((_, element) =>
        element?.textContent === 'User1: Great book!'
      )).toBeInTheDocument();
      expect(screen.getByText('Rating: 5/5')).toBeInTheDocument();
      expect(screen.getByText('User1')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Eliminar reseña' })).toBeInTheDocument();
    });

    it('muestra mensaje cuando el usuario no está autenticado', () => {
      render(<ReviewList {...mockReviewListProps} isAuthenticated={false} />);
      expect(screen.getByText('Debe iniciar sesión para ver las reseñas')).toBeInTheDocument();
      expect(screen.queryByText((_, element) => 
        element?.textContent?.includes('Great book!') ?? false
      )).not.toBeInTheDocument();
    });

    it('muestra botón de eliminar si el usuario es admin', () => {
      render(
        <ReviewList
          reviews={mockReviews}
          isAuthenticated={true}
          isAdmin={true}
          user={{ id: 99, name: 'Admin', role: 'admin',email:'admin@example.com' }}
          handleDeleteReview={mockHandleDelete}
        />
      );

      expect(screen.getByText('Eliminar reseña')).toBeInTheDocument();
    });

    it('muestra botón de eliminar si la reseña pertenece al usuario', () => {
      render(
        <ReviewList
          reviews={mockReviews}
          isAuthenticated={true}
          isAdmin={false}
          user={{ id: 1, role: 'user', name: 'User1',email: 'user1@example.com', }}
          handleDeleteReview={mockHandleDelete}
        />
      );

      expect(screen.getByText('Eliminar reseña')).toBeInTheDocument();
    });

    it('no muestra botón de eliminar si no es admin ni autor', () => {
      render(
        <ReviewList
          reviews={mockReviews}
          isAuthenticated={true}
          isAdmin={false}
          user={{ id: 999, name: 'Otro', role: 'user',email:'admin@example.com' }}
          handleDeleteReview={mockHandleDelete}
        />
      );

      expect(screen.queryByText('Eliminar reseña')).not.toBeInTheDocument();
    });
  });

  describe('WishlistButton', () => {
    it('renderiza el botón de agregar a la lista de deseos cuando no está en la lista', () => {
      render(<WishlistButton {...mockWishlistButtonProps} />);
      const addButton = screen.getByRole('button', { name: 'Agregar a Wishlist' });
      expect(addButton).toBeInTheDocument();
      fireEvent.click(addButton);
      expect(mockWishlistButtonProps.handleAddToWishlist).toHaveBeenCalled();
    });

    it('renderiza el botón de eliminar de la lista de deseos cuando está en la lista', () => {
      render(<WishlistButton {...mockWishlistButtonProps} isInWishlist={true} />);
      const removeButton = screen.getByRole('button', { name: 'Eliminar de Wishlist' });
      expect(removeButton).toBeInTheDocument();
      fireEvent.click(removeButton);
      expect(mockWishlistButtonProps.handleRemoveFromWishlist).toHaveBeenCalled();
    });
  });
});