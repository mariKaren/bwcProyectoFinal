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
    
    //verificar que el usuario pueda agregar un libro a la lista de deseos
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

    //Verificar que no se pueda agregar el mismo libro dos veces
    public function test_user_cannot_add_same_book_twice()
    {
        $user = User::factory()->create();
        $book = Book::factory()->create();

        // Primer agregado
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

    //verificar que puedan ver las listas de deseos que hicieron
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

    //verificar que puedan eliminar libros
    public function test_user_can_remove_book_from_wishlist()
    {
        $user = User::factory()->create();
        $book = Book::factory()->create();

        // Crear relación en la base
        Wishlist::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        // Ejecutar DELETE
        $response = $this->actingAs($user)->deleteJson("/api/wishlist/{$book->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('wishlists', [
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);
    }
    
    //verificar que no puedan acceder sin estar autentificados
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
