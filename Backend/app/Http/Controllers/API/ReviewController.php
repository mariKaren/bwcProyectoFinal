<?php

namespace App\Http\Controllers\API;

use App\Models\Review;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Termwind\Components\Raw;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::select('_id','book_id', 'rating', 'description')->get(); //Al ser publico, no quiero que me devuelva un user id 
        return response()->json([
            'status' => 'success',
            'data' => $reviews,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,id',
            'description' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }
        // Obtener el usuario autenticado desde el middleware AuthRole
        $user = $request->user();
        // Verificar si el usuario ya ha reseñado este libro
        $existingReview = Review::where('user_id', $user->id)
            ->where('book_id', $request->book_id)
            ->first();

        if ($existingReview) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have already reviewed this book',
            ], 403);
        }

        // Crear la reseña con el user_id del usuario autenticado, ya que el usuario es el unico que puede crear reseñas en su nombre
        $review = Review::create([
            'user_id' => $user->id,
            'book_id' => $request->book_id,
            'description' => $request->description,
            'rating' => $request->rating,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Review created successfully',
            'data' => $review,
        ], 201);
    }

    public function show($id)
    {
        $review = Review::where('_id', $id)->select('_id', 'book_id', 'description', 'rating')->first();;
        if (!$review) {
            return response()->json([
                'status' => 'error',
                'message' => 'Review not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $review,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $review = Review::where('_id', $id)->first();
        if (!$review) {
            return response()->json([
                'status' => 'error',
                'message' => 'Review not found',
            ], 404);
        }

        // Obtener el usuario autenticado,  ya que este podra modificar unicamente las reseñas hechas por el
        $user = $request->user();

        // Verificar si el usuario es el creador de la reseña
        if ($review->user_id !== $user->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not authorized to update this review',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'book_id' => 'sometimes|required|exists:books,id',
            'description' => 'sometimes|required|string',
            'rating' => 'sometimes|required|integer|min:1|max:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }
        //El user_id no es modificable
        $review->update($request->only(['book_id', 'description', 'rating']));
        return response()->json([
            'status' => 'success',
            'message' => 'Review updated successfully',
            'data' => $review,
        ], 200);
    }

    public function destroy( Request $request, $id)
    {
        $review = Review::where('_id', $id)->first();
        if (!$review) {
            return response()->json([
                'status' => 'error',
                'message' => 'Review not found',
            ], 404);
        }
        // Obtener el usuario autenticado
        $user = $request->user();

        // Verificar si el usuario es el creador de la reseña o un admin, ya que estos son los unicos que pueden eliminarla
        if ($review->user_id !== $user->id && $user->role !== 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not authorized to delete this review',
            ], 403);
        }

        $review->delete();
        return response()->json([], 204);
        
    }
}
