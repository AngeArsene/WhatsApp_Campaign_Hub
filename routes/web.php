<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::get('/', fn () => Inertia::render('DashboardPage'));

Route::resource('contacts', ContactController::class)->only(['index', 'store', 'update', 'destroy']);

Route::get('/campaigns', fn () => Inertia::render('CampaignsPage'));
Route::get('/schedule', fn () => Inertia::render('SchedulePage'));
Route::get('/reports', fn () => Inertia::render('ReportsPage'));
Route::get('/settings', fn () => Inertia::render('SettingsPage'));
