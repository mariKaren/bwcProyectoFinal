<?php

namespace App\Http\Controllers\API;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::with('author');

        // Búsqueda por título
        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->input('title') . '%');
        }

        // Búsqueda por autor
        if ($request->has('author')) {
            $query->whereHas('author', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->input('author') . '%');
            });
        }

        // Paginación (20 libros por página)
        $perPage = 20;
        $books = $query->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $books->items(),
            'pagination' => [
                'current_page' => $books->currentPage(),
                'last_page' => $books->lastPage(),
                'per_page' => $books->perPage(),
                'total' => $books->total(),
            ],
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'author_id' => 'required|exists:authors,id',
            'genre' => 'nullable|string|max:255',
            'publication_date' => 'required|date',
            'description' => 'nullable|string|max:2000',
            'cover' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        /* $book = Book::create($request->only(['title', 'author_id', 'genre', 'publication_date', 'description'])); */
        $data = $request->only(['title', 'author_id', 'genre', 'publication_date', 'description']);
        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('covers', 'public');
            $data['cover'] = $path;
        }

        $book = Book::create($data);
        return response()->json([
            'status' => 'success',
            'message' => 'Book created successfully',
            'data' => $book->load('author'),
        ], 201);
    }

    public function show($id)
    {
        $book = Book::with('author')->find($id);
        if (!$book) {
            return response()->json([
                'status' => 'error',
                'message' => 'Book not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $book,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json([
                'status' => 'error',
                'message' => 'Book not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
        'title' => 'sometimes|required|string|max:255',
        'author_id' => 'sometimes|required|exists:authors,id',
        'genre' => 'sometimes|nullable|string|max:255',
        'publication_date' => 'sometimes|required|date',
        'description' => 'sometimes|nullable|string|max:2000',
        'cover' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $request->only(['title', 'author_id', 'genre', 'publication_date', 'description']);

        // Si se sube una nueva portada
        if ($request->hasFile('cover')) {
            // Borra la portada anterior si existe
            if ($book->cover && Storage::disk('public')->exists($book->cover)) {
                Storage::disk('public')->delete($book->cover);
            }

            // Guarda la nueva portada
            $path = $request->file('cover')->store('covers', 'public');
            $data['cover'] = $path;
        }

        $book->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Book updated successfully',
            'data' => $book->load('author'),
        ], 200);
        
    }

    public function destroy($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json([
                'status' => 'error',
                'message' => 'Book not found',
            ], 404);
        }

        $book->delete();
        return response()->json([], 204);
    }
}
