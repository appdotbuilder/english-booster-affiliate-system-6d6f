<?php

namespace Database\Factories;

use App\Models\Affiliate;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Affiliate>
 */
class AffiliateFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'bank_name' => fake()->randomElement(['BCA', 'Mandiri', 'BRI', 'BNI', 'CIMB Niaga']),
            'bank_account_number' => fake()->numerify('##########'),
            'bank_account_name' => fake()->name(),
            'referral_code' => Affiliate::generateReferralCode(),
            'status' => fake()->randomElement(['pending', 'approved', 'rejected']),
            'total_commission' => fake()->randomFloat(2, 0, 10000000),
            'total_referrals' => fake()->numberBetween(0, 100),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's status should be approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}