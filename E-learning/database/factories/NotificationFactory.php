<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'to' => 1, // Assure que l'utilisateur existe
            'object' => $this->faker->word,
            'content' => $this->faker->sentence,
            'from' => User::inRandomOrder()->first()->id,
        ];
    }
}
