<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Book;
use App\Models\Author;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthorTest extends TestCase
{
    use RefreshDatabase;

    //verificar que admin pueda crear un autor
    public function test_admin_can_create_author()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $payload = [
            'name' => 'Gabriel García Márquez',
            'nationality' => 'Colombiano',
            'birth_date' => '1927-03-06',
            'birth_city' => 'Aracataca',
            'description' => 'Autor de Cien Años de Soledad',
        ];

        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/authors', $payload);

        $response->assertStatus(201)
                ->assertJsonFragment(['name' => 'Gabriel García Márquez']);

        $this->assertDatabaseHas('authors', ['name' => 'Gabriel García Márquez']);
    }

    //verificar que user no pueda crear un autor
    public function test_non_admin_cannot_create_author()
    {
        $user = User::factory()->create(['role' => 'user']);

        $payload = [
            'name' => 'Autora inválida',
            'birth_date' => '1990-01-01',
        ];

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/authors', $payload);

        $response->assertStatus(403);
    }

    //verificar que admin pueda actualizar un autor
    public function test_admin_can_update_author()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $author = Author::factory()->create([
            'name' => 'Isabel Allende',
        ]);

        $update = ['name' => 'Isabel A. Allende'];

        $response = $this->actingAs($admin, 'sanctum')->putJson("/api/authors/{$author->id}", $update);

        $response->assertStatus(200)
                ->assertJsonFragment(['name' => 'Isabel A. Allende']);

        $this->assertDatabaseHas('authors', ['id' => $author->id, 'name' => 'Isabel A. Allende']);
    }

    //verificar que admin pueda eliminar un autor sin libros asociados 
    public function test_admin_can_delete_author_without_books()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $author = Author::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')->deleteJson("/api/authors/{$author->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('authors', ['id' => $author->id]);
    }

    //verificar que un admin no pueda eliminar un autor con libros asociados
    public function test_admin_cannot_delete_author_with_books()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $author = Author::factory()->create();
        Book::factory()->create(['author_id' => $author->id]);

        $response = $this->actingAs($admin, 'sanctum')->deleteJson("/api/authors/{$author->id}");

        $response->assertStatus(422)
                ->assertJsonFragment([
                    'error' => 'It is not possible to delete an author who has books associated with them.'
                ]);

        $this->assertDatabaseHas('authors', ['id' => $author->id]);
    }

    //verificar que user no pueda eliminar ni actualizar un autor
    public function test_non_admin_cannot_update_or_delete_author()
    {
        $user = User::factory()->create(['role' => 'user']);
        $author = Author::factory()->create();

        $updateResponse = $this->actingAs($user, 'sanctum')->putJson("/api/authors/{$author->id}", ['name' => 'Cambio']);

        $updateResponse->assertStatus(403);

        $deleteResponse = $this->actingAs($user, 'sanctum')->deleteJson("/api/authors/{$author->id}");

        $deleteResponse->assertStatus(403);
    }
}
