<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Book;
use App\Models\Review;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReviewTest extends TestCase
{
    use RefreshDatabase;

    // Verifica que un usuario autenticado pueda crear una reseña para un libro
    public function test_user_can_create_review()
    {
        $user = User::factory()->create();
        $book = Book::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/reviews', [
            'book_id' => $book->id,
            'description' => 'Gran libro',
            'rating' => 5,
        ]);

        $response->assertStatus(201)
                ->assertJsonFragment(['message' => 'Review created successfully']);

        $this->assertDatabaseHas('reviews', [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'rating' => 5,
        ]);
    }

    // Verifica que un usuario no pueda crear más de una reseña para el mismo libro
    public function test_user_cannot_review_same_book_twice()
    {
        $user = User::factory()->create();
        $book = Book::factory()->create();

        Review::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'description' => 'Primera review',
            'rating' => 4,
        ]);

        $response = $this->actingAs($user)->postJson('/api/reviews', [
            'book_id' => $book->id,
            'description' => 'Segunda review',
            'rating' => 3,
        ]);

        $response->assertStatus(403)
                ->assertJsonFragment(['message' => 'You have already reviewed this book']);
    }

    //Verifica que un usuario pueda actualizar su propia reseña
    public function test_user_can_update_own_review()
    {
        $user = User::factory()->create();
        $book = Book::factory()->create();

        $review = Review::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'description' => 'Texto viejo',
            'rating' => 3,
        ]);

        $response = $this->actingAs($user)->putJson("/api/reviews/{$review->id}", [
            'description' => 'Reseña actualizada',
            'rating' => 4,
        ]);

        $response->assertStatus(200)
                ->assertJsonFragment(['message' => 'Review updated successfully']);

        $this->assertDatabaseHas('reviews', [
            'id' => $review->id,
            'description' => 'Reseña actualizada',
            'rating' => 4,
        ]);
    }

    // Verifica que un usuario pueda eliminar su propia reseña
    public function test_user_can_delete_own_review()
    {
        $user = User::factory()->create();
        $book = Book::factory()->create();

        $review = Review::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'description' => 'Eliminar esto',
            'rating' => 2,
        ]);

        $response = $this->actingAs($user)->deleteJson("/api/reviews/{$review->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('reviews', ['id' => $review->id]);
    }

    //Verifica que un usuario no autenticado no pueda crear una reseña
    public function test_guest_cannot_create_review()
        {
            $book = Book::factory()->create();

            $response = $this->postJson('/api/reviews', [
                'book_id' => $book->id,
                'description' => 'No debería poder crearla',
                'rating' => 4,
            ]);

            $response->assertStatus(401); // no autenticado
        }

}
