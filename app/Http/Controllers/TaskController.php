<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Create or update a Task
     *
     * @return \Inertia\Response
     */
    public function upinsert(Request $request)
    {
        if($request->id == 0) {
            $task = Task::create([
                'name' => $request->name,
                'description' => $request->description,
                'concluded' => $request->concluded,
                'user_id' => auth()->user()->id
            ]);
        } else {
            $task = Task::find($request->id);

            $task->update([
                'name' => $request->name,
                'description' => $request->description,
                'concluded' => $request->concluded
            ]);
        }

        return redirect('/');
    }

    /**
     * Create or update a Task
     *
     * @return \Inertia\Response
     */
    public function delete(Request $request)
    {
        Task::find($request->id)->delete();
        return redirect('/');
    }
}
