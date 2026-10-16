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
    Schema::create('productos', function (Blueprint $table) {
        $table->id();

        $table->foreignId('categoria_id')
            ->constrained('categorias')
            ->cascadeOnDelete();

        $table->foreignId('asesor_id')
            ->nullable()
            ->constrained('asesores')
            ->nullOnDelete();

        $table->string('nombre');
        $table->text('descripcion')->nullable();
        $table->string('marca')->nullable();
        $table->string('tipo')->nullable();
        $table->string('color')->nullable();
        $table->string('uso')->nullable();
        $table->boolean('destacado')->default(false);
        $table->boolean('activo')->default(true);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
public function down(): void
{
    Schema::dropIfExists('productos');
}
};
