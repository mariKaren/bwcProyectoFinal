<?php
namespace App\Http\Controllers\API;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $wishlist = Wishlist::with('book.author')
            ->where('user_id', $request->user()->id)//solo puede ver sus propios datos de libros
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $wishlist,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);

        $userId = $request->user()->id;

        $exists = Wishlist::where('user_id', $userId) //para verificar que no exista ya en la lista de deseos
            ->where('book_id', $request->book_id)
            ->exists();

        if ($exists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Book already in wishlist',
            ], 409);
        }

        $wishlist = Wishlist::create([
            'user_id' => $userId,
            'book_id' => $request->book_id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Book added to wishlist',
            'data' => $wishlist->load('book.author'),
        ], 201);
    }

    public function destroy(Request $request, $book_id)
    {
        $wishlist = Wishlist::where('user_id', $request->user()->id)
            ->where('book_id', $book_id)
            ->first();

        if (!$wishlist) {
            return response()->json([
                'status' => 'error',
                'message' => 'Book not found in wishlist',
            ], 404);
        }

        $wishlist->delete();

        return response()->json([], 204);
    }
}