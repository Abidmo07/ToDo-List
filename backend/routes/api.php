<?php

use App\Http\Controllers\ToDoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::apiResource('task',ToDoController::class);
Route::get('task/complete/{todo}',[ToDoController::class,"complete"]);