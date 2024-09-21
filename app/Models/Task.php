<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Task extends Model
{
    use HasFactory;

    protected $casts = [
        'due_at' => 'date',
    ];

    protected $fillable = [
        'name',
        'due_at',
        'completed_at',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function scopeIncomplete($query)
    {
        return $query->whereNull('completed_at');
    }

    public function scopeOwnedByUser($query, $user)
    {
        return $query->where('user_id', $user->id);
    }

    public function scopeOrderByDue($query)
    {
        return $query->orderBy('due_at');
    }

    public function getDaysUntilDueAttribute()
    {
        if ($this->due_at) {
            return Carbon::now()->diffInDays(Carbon::parse($this->due_at), false);
        }

        return null;
    }

    public function getTimeUntilDueAttribute()
    {
        if ($this->completed_at) {
            return '完了';
        }
        if ($this->due_at) {
            $dueAt = Carbon::parse($this->due_at);
            $diffInDays = (int)abs(Carbon::now()->diffInDays($dueAt));

            if ($dueAt->isFuture()) {
                if ($diffInDays > 1) {
                    return '残り' . $diffInDays . '日';
                }

                return "本日中";
            } else {
                if ($diffInDays > 1) {
                    return $diffInDays . '日遅れ';
                }

                return "昨日";
            }
        }
        return null;
    }

    public function getIsExpiredAttribute()
    {
        if ($this->completed_at) {
            return false;
        }

        if ($this->due_at) {
            return Carbon::parse($this->due_at)->isPast();
        }
        return false;
    }
}
