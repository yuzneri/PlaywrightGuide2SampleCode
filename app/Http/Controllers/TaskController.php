<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Exports\TaskExport;

class TaskController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request): View
    {
        return view('tasks.index', [
            'user' => $request->user(),
            'tasks' => Task::ownedByUser($request->user())->orderByDue()->get(),
        ]);
    }

    /**
     * Show the form for creating a new task.
     */
    public function create()
    {
        return view('tasks.create');
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:20',
            'due_at' => 'nullable|date',
        ]);

        // Create a new task
        $task = new Task();
        $task->name = $request->name;
        $task->due_at = $request->due_at;
        $task->user_id = Auth::id();
        $task->save();

        return redirect()->route('tasks.index')->with('success', 'タスクを作成しました');
    }

    public function show(Task $task)
    {
        $this->authorize('view', $task);

        return view('tasks.show', [
            'task' => $task,
        ]);
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $task->delete();
        return redirect()->route('tasks.index')->with('success', 'タスクを削除しました');
    }

    public function edit(Task $task)
    {
        $this->authorize('update', $task);

        return view('tasks.edit', compact('task'));
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $request->validate([
            'name' => 'required|string|max:20',
            'due_at' => 'nullable|date',
        ]);

        $task->update($request->all());

        return redirect()->route('tasks.show', $task)->with('success', 'タスクを更新しました');
    }

    public function complete(Task $task)
    {
        $this->authorize('update', $task);

        $task->completed_at = now();
        $task->save();

        return redirect()->route('tasks.index', $task)->with('success', 'タスクを完了にしました');
    }

    public function export(Request $request): BinaryFileResponse
    {
        return Excel::download(
            new TaskExport($request->user()),
            'task_' . Carbon::now()->format('YmdHi') . '.csv',
            \Maatwebsite\Excel\Excel::CSV, [
                'Content-Type' => 'application/octet-stream',
            ]
        );
    }
}
