<?php

namespace App\Http\Controllers;

use App\Models\ToDo;
use Illuminate\Http\Request;

class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return ToDo::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $data=$request->validate([
            'task'=>'required|string|max:255',
        ]);
    $task= Todo::create($data);
        return response()->json([
            'task'=>$task,
            'message'=>'the task created with success'
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(ToDo $task)
    {
       return response()->json([
        'task'=>$task,
        "status"=>true
       ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ToDo $task)
    {
             $data=$request->validate([
            'task'=>'required|string|max:255',
        ]);
       $task->update($data);
       return response()->json([
        'task'=>$task,
        'message'=>'updated with success'
       ],200);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ToDo $task)
    {
       $task->delete();
       return response()->json(
        ["message"=>"deleted with success"]
       );
    }
    public function complete(ToDo $todo){
        if($todo->completed==0){
            $todo->completed=1;
        }else{$todo->completed=0;}
        $todo->save();
        return response()->json($todo,200);
    }
}