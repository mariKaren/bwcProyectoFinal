<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    /** @use HasFactory<\Database\Factories\AuthorFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'nationality',
        'birth_date',
        'birth_city',
        'description',
    ];

    public function books()
    {
        return $this->hasMany(Book::class);
    }

    public function getBirthDateAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d/m/Y');
    }
}
