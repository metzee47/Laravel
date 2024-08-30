<?php

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
        Schema::create('fillieres', function (Blueprint $table) {
            // $table->id();
            // $table->string('name')->unique();
            // $table->enum('degree', ['annee_1', 'annee_2', 'bts', 'licence', 'master_1', 'master_2']);
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fillieres');
    }
};
