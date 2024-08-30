<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            // $table->string('slug')->nullable(); // Ajoute une colonne nullable
            // $table->dropColumn('duration');
            
        });

        // DB::statement("ALTER TABLE courses CHANGE COLUMN duration duration ENUM('_1h' ,'_1h30' ,'_2h' ,'_2h30' ,'_3h') NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            // $table->dropColumn('slug'); // Supprime la colonne
            // $table->dropColumn('duration'); // Supprime la colonne
            // $table->enum('duration', ['_1h' ,'_1h30' ,'_2h' ,'_2h30' ,'_3h'])->nullable(); // Modifie une colonne

        });

    }
};
