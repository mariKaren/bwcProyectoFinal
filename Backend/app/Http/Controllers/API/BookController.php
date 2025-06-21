<?php

namespace App\Http\Controllers\API;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with('author')->get();
        return response()->json([
            'status' => 'success',
            'data' => $books,
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
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $book = Book::create($request->only(['title', 'author_id', 'genre', 'publication_date', 'description']));
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

        // Filtrar solo los campos válidos
        $validFields = $book->getFillable();
        $inputFields = array_keys($request->all());
        $validInput = array_intersect($inputFields, $validFields);

        if (empty($validInput)) {
            return response()->json([
                'status' => 'error',
                'message' => 'No valid fields provided for update',
            ], 422);
        }

        $validator = Validator::make($request->only($validInput), [
            'title' => 'sometimes|required|string|max:255',
            'author_id' => 'sometimes|required|exists:authors,id',
            'genre' => 'sometimes|nullable|string|max:255',
            'publication_date' => 'sometimes|required|date',
            'description' => 'sometimes|nullable|string|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Actualizar el libro con los campos validados
        $book->update($request->only($validInput));

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
