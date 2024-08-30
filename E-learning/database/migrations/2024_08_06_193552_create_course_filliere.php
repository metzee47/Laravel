<?php

use App\Models\Course;
use App\Models\Filliere;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('course_filliere', function (Blueprint $table) {
            $table->foreignIdFor(Course::class, 'course_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Filliere::class, 'filliere_id')->constrained()->cascadeOnDelete();
            $table->unique(['course_id', 'filliere_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_filliere');
    }
};
