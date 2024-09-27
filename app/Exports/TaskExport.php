<?php

namespace App\Exports;

use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TaskExport implements FromCollection, WithHeadings, WithMapping
{
    protected User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @return Collection
     */
    public function collection(): Collection
    {
        return Task::ownedByUser($this->user)->orderByDue()->get();
    }


    public function headings(): array
    {
        return [
            'タスク',
            '期日',
            '完了日',
        ];
    }

    public function map($row): array
    {
        return [
            $row->name,
            $row->due_at ? Carbon::parse($row->due_at)->format('Y/m/d') : '',
            $row->completed_at ?? '',
        ];
    }
}
