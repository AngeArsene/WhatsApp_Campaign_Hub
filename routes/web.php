<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('DashboardPage'));
Route::get('/reports', fn () => Inertia::render('ReportsPage'));
Route::get('/settings', fn () => Inertia::render('SettingsPage'));
Route::get('/schedule', fn () => Inertia::render('SchedulePage'));
Route::get('/campaigns', fn () => Inertia::render('CampaignsPage'));

Route::resource('contacts', ContactController::class)->only(['index', 'store', 'update', 'destroy']);
