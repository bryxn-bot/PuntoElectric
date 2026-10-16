<?php

namespace Database\Seeders;

use App\Models\Asesor;
use App\Models\Categoria;
use App\Models\ImagenProducto;
use App\Models\Producto;
use Illuminate\Database\Seeder;

class CatalogoSeeder extends Seeder
{
    public function run(): void
    {
        $categoria = Categoria::updateOrCreate(
            ['nombre' => 'Iluminación'],
            [
                'descripcion' => 'Productos de iluminación eléctrica',
                'activo' => true,
            ]
        );

        $asesor = Asesor::updateOrCreate(
            ['telefono' => '51935428871'],
            [
                'nombre' => 'Asesor Punto Electric',
                'correo' => 'ventasgservices@gmail.com',
                'activo' => true,
            ]
        );

        $producto = Producto::updateOrCreate(
            ['nombre' => 'Foco LED de 3 tonos'],
            [
                'categoria_id' => $categoria->id,
                'asesor_id' => $asesor->id,
                'descripcion' => 'Iluminación cálida, fría y ámbar.',
                'marca' => 'Punto Electric',
                'tipo' => 'Foco LED',
                'color' => 'Tres tonos',
                'uso' => 'Interior',
                'destacado' => true,
                'activo' => true,
            ]
        );

        $imagenes = [
            '/productos/candelabros/foco3tonos.jpg',
            '/productos/candelabros/frio.jpg',
            '/productos/candelabros/ambar.jpg',
            '/productos/candelabros/calidoestrella.jpg',
        ];

        foreach ($imagenes as $indice => $ruta) {
            ImagenProducto::updateOrCreate(
                [
                    'producto_id' => $producto->id,
                    'ruta' => $ruta,
                ],
                [
                    'texto_alternativo' => 'Foco LED de 3 tonos',
                    'orden' => $indice + 1,
                ]
            );
        }
    }
}