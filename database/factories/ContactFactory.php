<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'last_name'    => fake()->lastName(),
            'first_name'   => fake()->firstName(),
            'phone_number' => '+2376'. ['5', '7', '9'][random_int(0, 2)] . str_pad("".random_int(0, 9999999), 7, '0', STR_PAD_LEFT),
        ];
    }
}
