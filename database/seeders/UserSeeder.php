<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'testUser',
                'email' => 'test@example.com',
                'password' => Hash::make('test'),
                'email_verified_at' => Carbon::now(),
            ],
            [
                'name' => 'desktopChrome',
                'email' => 'desktopChrome@example.com',
                'password' => Hash::make('desktopChrome'),
                'email_verified_at' => Carbon::now(),
            ],
            [
                'name' => 'desktopFirefox',
                'email' => 'desktopFirefox@example.com',
                'password' => Hash::make('desktopFirefox'),
                'email_verified_at' => Carbon::now(),
            ],
            [
                'name' => 'desktopSafari',
                'email' => 'desktopSafari@example.com',
                'password' => Hash::make('desktopSafari'),
                'email_verified_at' => Carbon::now(),
            ],
            [
                'name' => 'mobileChrome',
                'email' => 'mobileChrome@example.com',
                'password' => Hash::make('mobileChrome'),
                'email_verified_at' => Carbon::now(),
            ],
            [
                'name' => 'mobileSafari',
                'email' => 'mobileSafari@example.com',
                'password' => Hash::make('mobileSafari'),
                'email_verified_at' => Carbon::now(),
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
