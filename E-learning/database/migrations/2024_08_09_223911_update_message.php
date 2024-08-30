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
        // Schema::create('messages', function (Blueprint $table) {
        //     $table->id();
        //     $table->longText('content');
        //     $table->enum('object', ['warning', 'information', 'alerte', 'a_venir', 'demande', 'rappel']);
        //     $table->foreignId('sent_by')->constrained('users')->cascadeOnDelete();
        //     $table->foreignId('sent_to')->constrained('users')->cascadeOnDelete();
        //     $table->timestamp('sent_time');
        //     $table->timestamps();
            
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::dropIfExists('messages');
    }
};
