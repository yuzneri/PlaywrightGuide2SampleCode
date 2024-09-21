<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->sentence(),
            'due_at' => $this->faker->optional()->dateTimeBetween('now', '+10 day'),
            'completed_at' => null,
        ];
    }

    /**
     * 未完了で過去のタスク
     */
    public function pastDue(): TaskFactory|Factory
    {
        return $this->state([
            'due_at' => $this->faker->dateTimeBetween('-10 day', 'now'),
            'completed_at' => null,
        ]);
    }

    /**
     * 未完了で未来のタスク
     */
    public function futureDue(): TaskFactory|Factory
    {
        return $this->state([
            'due_at' => $this->faker->dateTimeBetween('now', '+10 day'),
            'completed_at' => null,
        ]);
    }

    /**
     * 完了済みのタスク
     */
    public function completed(): TaskFactory|Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'completed_at' => $this->faker->dateTimeBetween('now', '+10 day'),
                'due_at' => $this->faker->dateTimeBetween('-10 day', '+10 day'),
            ];
        });
    }
}
