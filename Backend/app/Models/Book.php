<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    /** @use HasFactory<\Database\Factories\BookFactory> */
    use HasFactory;
    protected $fillable = [
        'title',
        'author_id',
        'genre',
        'publication_date',
        'description',
    ];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function getPublicationDateAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d/m/Y');
    }
}
