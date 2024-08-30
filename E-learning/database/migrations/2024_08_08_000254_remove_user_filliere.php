<?php

use App\Models\Filliere;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::dropIfExists('user_filliere');

    }

    public function down()
    {
        Schema::create('filliere_user', function (Blueprint $table) {
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Filliere::class)->constrained()->cascadeOnDelete();
            $table->unique(['user_id', 'filliere_id']);
        });
    }
};
