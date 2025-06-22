<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    // Verifica que un usuario pueda registrarse correctamente con datos válidos
    public function test_user_can_register_successfully()
    {
        $payload = [
            'name' => 'Nuevo Usuario',
            'email' => 'nuevo@correo.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'status',
                    'message',
                    'data' => ['id', 'name', 'email'],
                    'token'
                ]);

        $this->assertDatabaseHas('users', ['email' => 'nuevo@correo.com']);
    }

    // Verifica que el registro falle al proporcionar datos inválidos
    public function test_user_registration_fails_with_invalid_data()
    {
        $payload = [
            'name' => '',
            'email' => 'no-es-email',
            'password' => '123',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    // Verifica que un usuario pueda iniciar sesión con credenciales válidas
    public function test_user_can_login_with_valid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@correo.com',
            'password' => Hash::make('password123')
        ]);

        $payload = [
            'email' => 'test@correo.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/login', $payload);

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'status',
                    'message',
                    'data' => ['id', 'name', 'email'],
                    'token'
                ]);
    }

    // Verifica que el inicio de sesión falle al proporcionar credenciales incorrectas
    public function test_login_fails_with_invalid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'fail@correo.com',
            'password' => Hash::make('correctpass')
        ]);

        $payload = [
            'email' => 'fail@correo.com',
            'password' => 'wrongpass',
        ];

        $response = $this->postJson('/api/login', $payload);

        $response->assertStatus(401)
                ->assertJsonFragment(['message' => 'Invalid credentials']);
    }

    // Verifica que el inicio de sesión falle al enviar datos inválidos
    public function test_login_fails_with_invalid_input()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'bad',
            'password' => '',
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email', 'password']);
    }

    // Verifica que un usuario autenticado pueda cerrar sesión correctamente
    public function test_authenticated_user_can_logout()
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token"
        ])->postJson('/api/logout');

        $response->assertStatus(200)
                ->assertJsonFragment(['message' => 'Logged out successfully']);
    }

    // Verifica que un usuario no autenticado no pueda acceder a rutas protegidas
    public function test_unauthenticated_user_cannot_access_protected_routes()
    {
        $response = $this->postJson('/api/logout');

        $response->assertStatus(401)
                ->assertJsonFragment(['message' => 'Unauthenticated.']);
    }

    // Verifica que un usuario sin rol admin no pueda acceder a rutas restringidas para administradores
    public function test_user_with_no_admin_role_cannot_access_admin_routes()
    {
        $user = User::factory()->create(['role' => 'user']);
        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token"
        ])->postJson('/api/authors', [
            'name' => 'No deberia crearse',
        ]);

        $response->assertStatus(403)
                ->assertJsonFragment(['message' => 'Unauthorized']);
    }
}