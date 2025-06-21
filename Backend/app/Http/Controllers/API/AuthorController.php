<?php

namespace App\Http\Controllers\API;

use App\Models\Author;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::all();
        return response()->json([
            'status' => 'success',
            'data' => $authors,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'nationality' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'birth_city' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:3000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $author = Author::create($request->only(['name', 'nationality', 'birth_date', 'birth_city', 'description']));
        return response()->json([
            'status' => 'success',
            'message' => 'Author created successfully',
            'data' => $author,
        ], 201);
    }

    public function show($id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Author not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $author,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Author not found',
            ], 404);
        }

        $validFields = $author->getFillable();
        $inputFields = array_keys($request->all());
        $validInput = array_intersect($inputFields, $validFields);
    
        // Verificar si hay al menos un campo válido. Sin esta validacion, cuando se querian actualizar datos sin propiedades, no se realizaba ninguna modificacion pero devolvia un mensaje de exito
        if (empty($validInput)) {
            return response()->json([
                'status' => 'error',
                'message' => 'No valid fields provided for update',
            ], 422);
        }
    
        $validator = Validator::make($request->only($validInput), [
            'name' => 'sometimes|required|string|max:255',
            'nationality' => 'sometimes|nullable|string|max:100',
            'birth_date' => 'sometimes|nullable|date',
            'birth_city' => 'sometimes|nullable|string|max:100',
            'description' => 'sometimes|nullable|string|max:3000',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Actualizar el autor con los campos validados
        $author->update($request->only($validInput));
    
        return response()->json([
            'status' => 'success',
            'message' => 'Author updated successfully',
            'data' => $author,
        ], 200);
    }

    public function destroy($id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Author not found',
            ], 404);
        }

        //No se pueden eliminar autores que tengan libros asociados
        if ($author->books()->count() > 0) {
            return response()->json(['error' => 'It is not possible to delete an author who has books associated with them.'], 422);
        }

        $author->delete();
        return response()->json([], 204);
    }
}
