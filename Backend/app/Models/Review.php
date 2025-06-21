<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Review extends Model
{
    protected $connection = 'mongodb'; 
    protected $collection = 'reviews';

    // Usar _id como clave primaria 
    protected $primaryKey = '_id';
    public $incrementing = false; 
    protected $keyType = 'string'; 

    protected $fillable = [
        'user_id',
        'book_id',
        'description',
        'rating',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
