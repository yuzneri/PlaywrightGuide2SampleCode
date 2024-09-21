<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ $task->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <div>
                        <h2 class="text-lg font-medium text-gray-700">タスク</h2>
                        <p class="text-gray-900">{{ $task->name }}</p>
                    </div>
                    <div>
                        <h2 class="text-lg font-medium text-gray-700">期日</h2>
                        <p class="text-gray-900">{{ $task->due_at ? $task->due_at->format('Y-m-d') . '(' . $task->time_until_due . ')' : '期日無し' }}</p>
                    </div>
                    <div>
                        <h2 class="text-lg font-medium text-gray-700">完了日</h2>
                        <p class="text-gray-900">{{ $task->completed_at ?? '未完了'}}</p>
                    </div>
                    <div class="flex space-x-4 mt-5">
                        @if (is_null($task->completed_at))
                            <form action="{{ route('tasks.complete', $task) }}" method="POST" class="d-inline">
                                @csrf
                                <button type="submit"
                                        class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">完了
                                </button>
                            </form>
                        @endif
                        <a href="{{ route('tasks.edit', $task) }}"
                           class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">編集</a>
                        <form action="{{ route('tasks.destroy', $task) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                削除
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
