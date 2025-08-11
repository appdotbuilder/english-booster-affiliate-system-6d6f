<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Program>
 */
class ProgramFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(3, true);
        
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'category' => fake()->randomElement(['online', 'offline_pare', 'group', 'branch']),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 100000, 5000000),
            'commission_percentage' => fake()->randomFloat(2, 5, 30),
            'is_active' => fake()->boolean(90),
        ];
    }

    /**
     * Indicate that the program should be active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }
}