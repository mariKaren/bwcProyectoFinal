<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Book;
use App\Models\Author;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BookTest extends TestCase
{
    use RefreshDatabase;

    //Verifica que cualquier usuario pueda obtener el listado de libros
    public function test_can_list_books()
    {
        Book::factory()->count(3)->create();

        $response = $this->getJson('/api/books');

        $response->assertStatus(200)
                ->assertJsonStructure(['status', 'data']);
    }

    //Verifica que se pueda acceder a los detalles de un libro específico
    public function test_can_show_a_book()
    {
        $book = Book::factory()->create();

        $response = $this->getJson("/api/books/{$book->id}");

        $response->assertStatus(200)
                ->assertJsonFragment(['id' => $book->id]);
    }

    //Verifica que se pueda acceder a los detalles de un libro específico
    public function test_admin_can_create_book()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $author = Author::factory()->create();

        $payload = [
            'title' => 'Nuevo libro',
            'author_id' => $author->id,
            'genre' => 'Ficción',
            'publication_date' => now()->format('Y-m-d'),
            'description' => 'Una descripción del libro',
        ];

        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/books', $payload);

        $response->assertStatus(201)
                ->assertJsonFragment(['title' => 'Nuevo libro']);

        $this->assertDatabaseHas('books', ['title' => 'Nuevo libro']);
    }

    //Verifica que un usuario sin rol admin no pueda crear un libro
    public function test_non_admin_cannot_create_book()
    {
        $user = User::factory()->create(['role' => 'user']);
        $author = Author::factory()->create();

        $payload = [
            'title' => 'Intento fallido',
            'author_id' => $author->id,
            'publication_date' => now()->format('Y-m-d'),
        ];

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/books', $payload);

        $response->assertStatus(403); // Middleware bloquea por rol
    }

    //Verifica que un usuario con rol admin pueda actualizar un libro existente
    public function test_admin_can_update_book()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $book = Book::factory()->create();

        $update = ['title' => 'Título actualizado'];

        $response = $this->actingAs($admin, 'sanctum')
                        ->putJson("/api/books/{$book->id}", $update);

        $response->assertStatus(200)
                ->assertJsonFragment(['title' => 'Título actualizado']);

        $this->assertDatabaseHas('books', ['id' => $book->id, 'title' => 'Título actualizado']);
    }

    // Verifica que un usuario con rol admin pueda eliminar un libro
    public function test_admin_can_delete_book()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $book = Book::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')
                        ->deleteJson("/api/books/{$book->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('books', ['id' => $book->id]);
    }
}
