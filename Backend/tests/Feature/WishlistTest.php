<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Book;
use App\Models\Wishlist;
use Illuminate\Foundation\Testing\RefreshDatabase;

class WishlistTest extends TestCase
{
    use RefreshDatabase;
    
    //Verifica que un usuario pueda agregar un libro a su lista de deseos
    public function test_user_can_add_book_to_wishlist()
    {
        $user = User::factory()->create();
        $book = Book::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/wishlist', [
            'book_id' => $book->id,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('wishlists', [
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);
    }

    //Verifica que no se pueda agregar el mismo libro dos veces a la lista de deseos
    public function test_user_cannot_add_same_book_twice()
    {
        $user = User::factory()->create();
        $book = Book::factory()->create();

        // Primer intento
        $this->actingAs($user)->postJson('/api/wishlist', [
            'book_id' => $book->id,
        ]);

        // Segundo intento
        $response = $this->actingAs($user)->postJson('/api/wishlist', [
            'book_id' => $book->id,
        ]);

        $response->assertStatus(409);
        $response->assertJson([
            'status' => 'error',
            'message' => 'Book already in wishlist',
        ]);
    }

    //Verifica que un usuario pueda ver su propia lista de deseos
    public function test_user_can_view_their_wishlist()
    {
        $user = User::factory()->create();
        $book = Book::factory()->create();

        Wishlist::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        $response = $this->actingAs($user)->getJson('/api/wishlist');

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'book_id' => $book->id,
        ]);
    }

    //Verifica que un usuario pueda eliminar un libro de su lista de deseos
    public function test_user_can_remove_book_from_wishlist()
    {
        $user = User::factory()->create();
        $book = Book::factory()->create();

        Wishlist::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        $response = $this->actingAs($user)->deleteJson("/api/wishlist/{$book->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('wishlists', [
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);
    }
    
    // Verifica que los usuarios no autenticados no puedan acceder a las rutas de la lista de deseos
    public function test_guest_cannot_access_wishlist_routes()
    {
        $book = Book::factory()->create();

        // GET
        $this->getJson('/api/wishlist')
            ->assertStatus(401);

        // POST
        $this->postJson('/api/wishlist', [
            'book_id' => $book->id,
        ])->assertStatus(401);

        // DELETE
        $this->deleteJson("/api/wishlist/{$book->id}")
            ->assertStatus(401);
    }
}
