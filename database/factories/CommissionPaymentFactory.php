<?php

namespace Database\Factories;

use App\Models\Affiliate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommissionPayment>
 */
class CommissionPaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['pending', 'paid', 'failed']);
        
        return [
            'affiliate_id' => Affiliate::factory(),
            'amount' => fake()->randomFloat(2, 50000, 2000000),
            'status' => $status,
            'payment_method' => fake()->randomElement(['bank_transfer', 'cash', 'other']),
            'payment_details' => fake()->optional()->paragraph(),
            'notes' => fake()->optional()->paragraph(),
            'paid_at' => $status === 'paid' ? fake()->dateTimeBetween('-6 months', 'now') : null,
            'paid_by' => $status === 'paid' ? User::factory() : null,
        ];
    }

    /**
     * Indicate that the payment should be paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'paid_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'paid_by' => User::factory(),
        ]);
    }
}