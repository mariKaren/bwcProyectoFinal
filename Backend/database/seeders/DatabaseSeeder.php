<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Author;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Karen',
            'email' => 'Karen@example.com',
            'password'=>Hash::make('1234'),
            'role'=>'admin'
        ]);
        User::create([
            'name' => 'Juan',
            'email' => 'Juan@example.com',
            'password'=>Hash::make('1234'),
            'role'=>'user'
        ]);
        Author::factory(5)->create();
        Book::factory(10)->create();
    }
}
