<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('featured_books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('book_id')
                ->constrained()
                  ->onDelete('restrict') // Evita que se elimine un libro que esté destacado
                ->unique();//Evita que el mismo libro se destaque mas de una vez
            $table->integer('position')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('featured_books');
    }
};
