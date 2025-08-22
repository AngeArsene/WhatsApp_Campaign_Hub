<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::get('/', fn () => Inertia::render('DashboardPage'));
Route::get('/reports', fn () => Inertia::render('ReportsPage'));
Route::get('/settings', fn () => Inertia::render('SettingsPage'));
Route::get('/schedule', fn () => Inertia::render('SchedulePage'));
Route::get('/campaigns', fn () => Inertia::render('CampaignsPage'));

Route::apiResource('contacts', ContactController::class)->except('show');
