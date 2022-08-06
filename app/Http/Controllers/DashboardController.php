<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the Dashboard view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Dashboard', [
            'tasks' => auth()->user()->tasks
        ]);
    }
}
