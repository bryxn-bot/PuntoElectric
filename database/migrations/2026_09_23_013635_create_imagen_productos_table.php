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
    Schema::create('imagenes_producto', function (Blueprint $table) {
        $table->id();

        $table->foreignId('producto_id')
            ->constrained('productos')
            ->cascadeOnDelete();

        $table->string('ruta');
        $table->string('texto_alternativo')->nullable();
        $table->unsignedInteger('orden')->default(1);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
public function down(): void
{
    Schema::dropIfExists('imagenes_producto');
}
};
