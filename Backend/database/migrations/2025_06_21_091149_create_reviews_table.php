<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('user_id')->constrained()->onDelete('cascade');//Al eliminar el usuario se eliminan sus reseñas
            $table->foreignId('book_id')->constrained()->onDelete('cascade');//Lo mismo
            $table->text('description');
            $table->tinyInteger('rating')->unsigned(); // Valor entre 1 y 5
            $table->timestamps();

            // asegurar que un usuario reseñe un libro solo una vez
            $table->unique(['user_id', 'book_id']);
    
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
