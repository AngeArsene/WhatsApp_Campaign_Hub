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
     * @param  Contact  $contact  The contact instance to format.
     * @return array<string,string|int|null> The formatted contact data.
     */
    public static function formate(Contact $contact): array
    {
        return [
            'id'           => $contact->id,
            'first_name'   => $contact->first_name,
            'last_name'    => $contact->last_name,
            'phone_number' => $contact->phone_number,
            'created_at'   => $contact->created_at?->toDateTimeString(),
            'updated_at'   => $contact->updated_at?->toDateTimeString(),
        ];
    }
}
