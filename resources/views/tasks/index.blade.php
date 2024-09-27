<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Task') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    @if (session('success'))
                        <div class="mb-6 p-4 bg-green-100 text-green-700 rounded">{{ session('success') }}</div>
                    @endif
                    <table class="border-collapse border border-slate-500 table-auto">
                        <thead>
                        <tr>
                            <th class="border border-slate-600">タスク</th>
                            <th class="border border-slate-600">期日</th>
                            <th class="border border-slate-600">完了日</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($tasks as $task)
                            <tr>
                                <td class="border border-slate-700">
                                    <a href="{{ route('tasks.show', $task->id) }}"
                                       class="font-semibold text-blue-500 hover:underline">{{ $task->name }}</a>
                                </td>
                                <td class="border border-slate-700">
                                    @if (!is_null($task->time_until_due))
                                        <span class="@if($task->is_expired) text-red-600 @endif"
                                              title="{{ $task->due_at }}">{{ $task->time_until_due }}
                                        </span>
                                        @if (is_null($task->completed_at))
                                            <form action="{{ route('tasks.complete', $task) }}" method="POST"
                                                  class="d-inline">
                                                @csrf
                                                <button type="submit" class="btn btn-success text-blue-500">完了にする
                                                </button>
                                            </form>
                                        @endif
                                    @else
                                        なし
                                    @endif
                                </td>
                                <td class="border border-slate-700">
                                    @if (!is_null($task->completed_at))
                                        <span>{{ $task->completed_at }}</span>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                        <a href="{{ route('tasks.export') }}" class="font-semibold text-blue-500 hover:underline">CSV ダウンロード</a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
