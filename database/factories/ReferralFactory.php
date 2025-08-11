<?php

namespace Database\Factories;

use App\Models\Affiliate;
use App\Models\Program;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Referral>
 */
class ReferralFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $programPrice = fake()->randomFloat(2, 100000, 5000000);
        $commissionPercentage = fake()->randomFloat(2, 5, 30);
        $commissionAmount = ($programPrice * $commissionPercentage) / 100;
        
        return [
            'affiliate_id' => Affiliate::factory(),
            'program_id' => Program::factory(),
            'student_name' => fake()->name(),
            'student_email' => fake()->unique()->safeEmail(),
            'student_phone' => fake()->phoneNumber(),
            'program_price' => $programPrice,
            'commission_percentage' => $commissionPercentage,
            'commission_amount' => $commissionAmount,
            'status' => fake()->randomElement(['pending', 'confirmed', 'cancelled']),
            'notes' => fake()->optional()->paragraph(),
            'registered_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }

    /**
     * Indicate that the referral should be confirmed.
     */
    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'confirmed',
        ]);
    }
}