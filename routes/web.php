<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [DashboardController::class, 'create'])
->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('task')->group(function () {
    Route::post('upinsert', [TaskController::class, 'upinsert'])->name('task.upinsert');
    Route::post('delete', [TaskController::class, 'delete'])->name('task.delete');
});

require __DIR__.'/auth.php';
