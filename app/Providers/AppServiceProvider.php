<?php

namespace App\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Validator::extend('phone_number', function ($attribute, $value, $parameters, $validator) {
            return preg_match('/^\+?[0-9]{10,15}$/', $value);
        }, 'The :attribute must be a valid phone number.');
    }
}
