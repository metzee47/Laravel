<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\FilliereController;
use App\Http\Controllers\InstructorAssessmentController;
use App\Http\Controllers\InstructorMessageController;

use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentAssessmentController;
use App\Http\Controllers\StudentMessageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Users\Instructor\InstructorCourseController;
use App\Http\Controllers\Users\StudentController;
use App\Http\Controllers\Users\InstructorController;
use App\Http\Controllers\Users\Student\StudentCourseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'login');
// Route::get('/learner', fn()=> Inertia::render('Users/Student/Home'))->name('homestudent');
// Route::get('/', fn()=> Inertia::render('Users/Instructor/Home'))->name('homeinstructor');

Route::prefix('/dashbord')->middleware(['auth', 'verified', 'admin'])->name('dashboard')->group(function () {
    
    Route::get('/', [NotificationController::class, 'dashbord']);
    Route::post('/mark-as-read', [NotificationController::class, 'delete_notif'])->name('.delete-notif');
    Route::resource('course', CourseController::class);
    Route::resource('filliere', FilliereController::class);
    Route::resource('user', UserController::class);
    Route::resource('message', MessageController::class)->except(['edit', 'update']);

});
Route::prefix('/learner')->middleware(['auth', 'learner'])->name('student.')->group(function () {
    
    Route::get('/', [StudentController::class, 'home'])->name('home');
    // student message route group
    Route::prefix('/message')->name('message.')->controller(StudentMessageController::class)->group(function(){
        Route::get('/', 'index')->name('index');
        Route::get('/nouveau-message', 'create')->name('create');
        Route::post('/nouveau-message', 'store')->name('store');
        Route::get('/{message}', 'show')
                    ->where(['message' => '[0-9]+'])
                    ->name('show');
    });
    
    // Course section
    Route::prefix('/course')->name('course.')->controller(StudentCourseController::class)->group(function(){
        Route::get('/', 'index')->name('index');
    //     Route::get('/{course}/generate-lesson', 'generate')
    //                 ->where(['course' => '[a-z0-9/-]+'])
    //                 ->name('generate-lesson');
    //     Route::post('/{course}/generate-lesson', 'store')
    //                 ->where(['course' => '[a-z0-9/-]+'])
    //                 ->name('generate-lesson');
        Route::get('/{lesson}', 'show_lesson')
                    ->where(['lesson' => '[0-9]+'])
                    ->name('show-lesson');
    });

    // Course section
    Route::prefix('/devoirs')->name('assessment.')->controller(StudentAssessmentController::class)->group(function(){
        Route::get('/', 'index')->name('index');
        Route::get('/a-faire/{assessment}', 'do_assessment')
                    ->where(['assessment' => '[0-9]+'])
                    ->name('do-assessment');
        Route::post('/a-faire/{assessment}', 'store_assessment')
                    ->where(['assessment' => '[0-9]+'])
                    ->name('store-assessment');
        Route::post('/a-faire/{assessment}', 'submit_assessment')
                    ->where(['assessment' => '[0-9]+'])
                    ->name('submit-assessment');
        Route::post('/devoir-raté', 'missed_assessment')
                    ->name('missed-assessment');
        // Route::get('/{course}/generate-lesson', 'generate')
        //             ->where(['course' => '[a-z0-9/-]+'])
        //             ->name('generate-lesson');
    //     Route::post('/{course}/generate-lesson', 'store')
    //                 ->where(['course' => '[a-z0-9/-]+'])
    //                 ->name('generate-lesson');
    });

});

Route::prefix('/teacher')->middleware(['auth', 'teacher'])->name('instructor.')->group(function () {
    
    Route::get('/', [InstructorController::class, 'home'])->name('home');
    // instructor message route group
    Route::prefix('/message')->name('message.')->controller(InstructorMessageController::class)->group(function(){
        Route::get('/', 'index')->name('index');
        Route::get('/nouveau-message', 'create')->name('create');
        Route::post('/nouveau-message', 'store')->name('store');
        Route::get('/{message}', 'show')
                    ->where(['message' => '[0-9]+'])
                    ->name('show');
    });

    // instructor course route group '[a-z0-9/-]+'
    Route::prefix('/course')->name('course.')->controller(InstructorCourseController::class)->group(function(){
        Route::get('/', 'index')->name('index');
        // new lesson
        Route::get('/{course}/new-lesson', 'generate_lesson')
                    ->where(['course' => '[a-z0-9/-]+'])
                    ->name('generate-lesson');
        Route::post('/{course}/new-lesson', 'store_lesson')
                    ->where(['course' => '[a-z0-9/-]+'])
                    ->name('store-lesson');
        Route::get('/lesson-{lesson}', 'show_lesson')
                    ->where(['lesson' => '[0-9]+'])
                    ->name('show-lesson');
        // new assessment
        Route::get('/{course}/nouveau-devoir', 'generate_assessment')
                    ->where(['course' => '[a-z0-9/-]+'])
                    ->name('generate-assessment');
        Route::post('/{course}/nouveau-devoir', 'store_assessment')
                    ->where(['course' => '[a-z0-9/-]+'])
                    ->name('store-assessment');
        Route::get('/devoir-{assessment}', 'show_assessment')
                    ->where(['assessment' => '[0-9]+'])
                    ->name('show-assessment');
    
    
                });
    
        // submitted or missed assessment 
    
    Route::prefix('/devoirs')->name('assessment.')->controller(InstructorAssessmentController::class)->group(function(){
        Route::get('/', 'index')->name('index');
        Route::get('/correction-devoir-{assessment}/{student}', 'correction')
                ->where(
                    [
                        'assessment' => '[a-z0-9/-]+',
                        'student' => '[a-z0-9/-]+',
                        // 'student' => '[A-Za-z]+' 
                    ])
                ->name('correction');

        Route::post('/sauvegarde-note', 'save_note')->name('save-note');    
    
    });
});
            


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
