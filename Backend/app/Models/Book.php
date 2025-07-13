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
        'cover',
    ];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }
    
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function wishedByUsers()
    {
        return $this->belongsToMany(User::class, 'wishlists')->withTimestamps();
    }

    public function getPublicationDateAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d/m/Y');
    }

    public function featuredBooks()
    {
        return $this->hasMany(FeaturedBook::class);
    }

    public function isFeatured(): bool
    {
        return $this->featuredBooks()->exists();
    }

    protected static function boot(){
        parent::boot();

        static::deleting(function ($book) {
            if ($book->featuredBooks()->exists()) {
                throw new \Exception('No se puede eliminar un libro que está destacado.');
            }
        });
    }
}
