<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'phone_number'];

    public function getFullName(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
