<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';

    protected $fillable = [
        'categoria_id',
        'asesor_id',
        'nombre',
        'descripcion',
        'marca',
        'tipo',
        'color',
        'uso',
        'destacado',
        'activo',
    ];

    protected function casts(): array
    {
        return [
            'destacado' => 'boolean',
            'activo' => 'boolean',
        ];
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }

    public function asesor(): BelongsTo
    {
        return $this->belongsTo(Asesor::class);
    }

    public function imagenes(): HasMany
    {
        return $this->hasMany(ImagenProducto::class)
            ->orderBy('orden');
    }
}