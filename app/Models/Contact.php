<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'phone_number'];

    /**
     * Formats a Contact model instance into an associative array.
     *
     * @return array<string,string|int|null> The formatted contact data.
     */
    private function formate(): array
    {
        return [
            'id'           => $this->id,
            'first_name'   => $this->first_name,
            'last_name'    => $this->last_name,
            'phone_number' => $this->phone_number,
            'created_at'   => $this->created_at?->toDateTimeString(),
            'updated_at'   => $this->updated_at?->toDateTimeString(),
        ];
    }

    /**
     * Convert the model instance to an array using the custom format.
     *
     * @return array The formatted array representation of the model.
     */
    public function toArray(): array
    {
        return $this->formate();
    }
}
