<?php

use App\Models\User;
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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);     
            $table->string('description', 255)->nullable();     
            $table->enum('duration', ['_1h' ,'_1h30' ,'_2h' ,'_2h30' ,'_3h'])->default('_1h30');
            $table->foreignId('teached_by')->nullable()->constrained('users')->cascadeOnDelete();
            $table->timestamps();

        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->longText('content');
            $table->enum('object', ['warning', 'information', 'alerte', 'a_venir', 'demande', 'rappel']);
            $table->foreignId('sent_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('sent_to')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
        Schema::dropIfExists('courses');

    }
};
