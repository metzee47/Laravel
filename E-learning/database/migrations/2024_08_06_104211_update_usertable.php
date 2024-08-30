<?php

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
        Schema::table('users', function (Blueprint $table) {
            $table->string('address')->nullable();
            $table->string('profil_image')->nullable(); // Colonne pour l'image de profil
            $table->enum('role', ['admin', 'etudiant', 'professeur'])->default('etudiant'); // Colonne pour le type d'utilisateur
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('address');
            $table->dropColumn('profil_image');
            $table->dropColumn('type');
        });
    }
};
