<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Book;
use App\Models\Author;
use App\Models\User;
use App\Models\FeaturedBook;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FeaturedBookTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_featured_books_with_author()
    {
        $author = Author::factory()->create();
        $book1 = Book::factory()->create(['author_id' => $author->id]);
        $book2 = Book::factory()->create(['author_id' => $author->id]);

        FeaturedBook::create(['book_id' => $book1->id, 'position' => 0]);
        FeaturedBook::create(['book_id' => $book2->id, 'position' => 1]);

        $response = $this->getJson('/api/featured-books');

        $response->assertStatus(200)
                    ->assertJsonStructure([
                        'status',
                        'data' => [
                            '*' => [
                                'id',
                                'title',
                                'genre',
                                'publication_date',
                                'description',
                                'author' => ['id', 'name']
                            ]
                        ]
                    ]);

        $data = $response->json('data');
        $this->assertCount(2, $data);
        $this->assertEquals($book1->id, $data[0]['id']);
        $this->assertEquals($book2->id, $data[1]['id']);
        $this->assertEquals($author->name, $data[0]['author']['name']);
    }

    public function test_admin_can_add_a_featured_book()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $book = Book::factory()->create();
        FeaturedBook::create(['book_id' => Book::factory()->create()->id, 'position' => 0]);

        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/featured-books', [
            'book_id' => $book->id,
        ]);

        $response->assertStatus(201)
                ->assertJsonFragment([
                    'status' => 'success',
                    'message' => 'Libro añadido a destacados correctamente.',
                ])
                ->assertJsonStructure([
                    'status',
                    'message',
                    'data' => [
                        'book_id',
                        'position',
                        'book' => ['id', 'title', 'author' => ['id', 'name']]
                    ]
                ]);

        $this->assertDatabaseHas('featured_books', [
            'book_id' => $book->id,
            'position' => 1, 
        ]);
    }
    public function test_cannot_add_already_featured_book()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $book = Book::factory()->create();
        FeaturedBook::create(['book_id' => $book->id, 'position' => 0]);

        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/featured-books', [
            'book_id' => $book->id,
        ]);

        $response->assertStatus(409)
                ->assertJsonFragment([
                    'status' => 'error',
                    'message' => 'El libro ya está en la lista de destacados.',
                ]);
    }

    public function test_validation_fails_for_invalid_book_id()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/featured-books', [
            'book_id' => 999,
        ]);

        $response->assertStatus(422)
                ->assertJsonStructure([
                    'status',
                    'errors' => ['book_id']
                ]);
    }
    public function test_admin_can_remove_a_featured_book()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $book1 = Book::factory()->create();
        $book2 = Book::factory()->create();
        FeaturedBook::create(['book_id' => $book1->id, 'position' => 0]);
        FeaturedBook::create(['book_id' => $book2->id, 'position' => 1]);

        $response = $this->actingAs($admin, 'sanctum')->deleteJson("/api/featured-books/{$book1->id}");

        $response->assertStatus(200)
                ->assertJsonFragment([
                    'status' => 'success',
                    'message' => 'Libro eliminado de destacados correctamente.',
                ]);

        $this->assertDatabaseMissing('featured_books', ['book_id' => $book1->id]);
        $this->assertDatabaseHas('featured_books', ['book_id' => $book2->id, 'position' => 0]);
    }

    public function test_cannot_remove_non_featured_book()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $book = Book::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')->deleteJson("/api/featured-books/{$book->id}");

        $response->assertStatus(404)
                ->assertJsonFragment([
                    'status' => 'error',
                    'message' => 'El libro no está en la lista de destacados.',
                ]);
    }
}