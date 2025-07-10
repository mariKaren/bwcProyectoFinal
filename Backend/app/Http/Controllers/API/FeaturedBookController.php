<?php

namespace App\Http\Controllers\api;

use App\Models\FeaturedBook;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class FeaturedBookController extends Controller
{
    /**
     * Listar libros destacados con datos del autor.
     */
    public function index(): JsonResponse
    {
        try {
            $featured = FeaturedBook::with('book.author')
                ->orderBy('position')
                ->take(8) 
                ->get()
                ->pluck('book');

            if ($featured->isEmpty()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'No hay libros destacados.',
                    'data' => [],
                ], 200);
            }

            return response()->json([
                'status' => 'success',
                'data' => $featured,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al obtener libros destacados: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Agregar un libro a la lista de destacados.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,id',
            'position' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Verificar si el libro ya está destacado
            if (FeaturedBook::where('book_id', $request->book_id)->exists()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'El libro ya está en la lista de destacados.',
                ], 409);
            }

            
            $maxPosition = FeaturedBook::max('position') ?? -1;
            $position = $request->position ?? $maxPosition + 1;

            $featuredBook = FeaturedBook::create([
                'book_id' => $request->book_id,
                'position' => $position,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Libro añadido a destacados correctamente.',
                'data' => $featuredBook->load('book.author'), 
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al añadir libro a destacados: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Eliminar un libro de la lista de destacados.
     */
    public function destroy($book_id): JsonResponse
    {
        try {
            $featuredBook = FeaturedBook::where('book_id', $book_id)->first();

            if (!$featuredBook) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'El libro no está en la lista de destacados.',
                ], 404);
            }

            $featuredBook->delete();

            // Reorganizar posiciones
            FeaturedBook::where('position', '>', $featuredBook->position)
                ->decrement('position');

            return response()->json([
                'status' => 'success',
                'message' => 'Libro eliminado de destacados correctamente.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al eliminar libro de destacados: ' . $e->getMessage(),
            ], 500);
        }
    }
}
