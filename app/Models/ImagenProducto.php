<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImagenProducto extends Model
{
    use HasFactory;

    protected $table = 'imagenes_producto';

    protected $fillable = [
        'producto_id',
        'ruta',
        'texto_alternativo',
        'orden',
    ];

    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class);
    }
}