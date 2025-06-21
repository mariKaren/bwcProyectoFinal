<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Author>
 */
class AuthorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'nationality' => $this->faker->country(),
            'birth_date' => $this->faker->date('Y-m-d', '2000-01-01'),
            'birth_city' => $this->faker->city(),
            'description' => $this->faker->paragraph(),
        ];
    }
}
