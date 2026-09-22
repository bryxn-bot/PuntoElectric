import { Head } from '@inertiajs/react';
import { useState } from 'react';

const categorias = [
    { nombre: 'Comercial',
      imagen: '/categoria/comercial.jpg',
     
     },
    { nombre: 'Interiores',
      imagen: '/categoria/interiores.jpg',
     },
    { nombre: 'Exteriores',
      imagen: '/categoria/exterior.jpg'
     },
];

const nuevosProductos = [
    {
        imagen: '/newproducto/diferencial.jpg',
        nombre: 'Interruptor diferencial Bticino',
        descripcion: 'Protección segura para instalaciones eléctricas.',
    },
    {
        imagen: '/newproducto/tablero24.jpg',
        nombre: 'Tablero de 24 polos metálico',
        descripcion: 'Tablero resistente para proyectos eléctricos.',
    },
    {
        imagen: '/newproducto/cajaoctogonal.jpg',
        nombre: 'Caja octogonal',
        descripcion: 'Ideal para instalaciones y conexiones eléctricas.',
    },
];

type CarruselProducto = {
    imagenes: string[];
    nombre: string;
    descripcion: string;
};

function CarruselProducto({
    imagenes,
    nombre,
    descripcion,
}: CarruselProducto) {
    const [imagenActual, setImagenActual] = useState(0);

    const anterior = () => {
        setImagenActual((actual) =>
            actual === 0 ? imagenes.length - 1 : actual - 1,
        );
    };

    const siguiente = () => {
        setImagenActual((actual) =>
            actual === imagenes.length - 1 ? 0 : actual + 1,
        );
    };

    const mensajeWhatsApp = encodeURIComponent(
        `Hola, deseo cotizar el producto: ${nombre}`,
    );

    return (
        <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
            <div className="relative h-64 bg-gray-100">
                <img
                    src={imagenes[imagenActual]}
                    alt={`${nombre} - imagen ${imagenActual + 1}`}
                    className="h-full w-full object-contain"
                />

                {imagenes.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={anterior}
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 px-3 py-2 text-xl text-white"
                            aria-label="Imagen anterior"
                        >
                            ‹
                        </button>

                        <button
                            type="button"
                            onClick={siguiente}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 px-3 py-2 text-xl text-white"
                            aria-label="Imagen siguiente"
                        >
                            ›
                        </button>

                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                            {imagenes.map((_, indice) => (
                                <button
                                    key={indice}
                                    type="button"
                                    onClick={() =>
                                        setImagenActual(indice)
                                    }
                                    className={`h-2.5 w-2.5 rounded-full ${
                                        imagenActual === indice
                                            ? 'bg-yellow-500'
                                            : 'bg-gray-400'
                                    }`}
                                    aria-label={`Mostrar imagen ${indice + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="p-5">
                <span className="text-sm font-semibold text-yellow-600">
                    Producto destacado
                </span>

                <h3 className="mt-1 text-xl font-black text-black">
                    {nombre}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                    {descripcion}
                </p>

                <a
                    href={`https://wa.me/51935428871?text=${mensajeWhatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block rounded-lg bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
                >
                    Cotizar por WhatsApp
                </a>
            </div>
        </article>
    );
}

export default function Inicio() {
    return (
        <>
            <Head title="Punto Electric" />

            <div className="min-h-screen bg-white text-zinc-900">
                {/* BARRA DE DESCUENTO */}
                <div className="bg-yellow-400 px-4 py-2 text-center text-sm font-bold text-black">
                    Aprovecha un 10 % de descuento en tu primera compra
                </div>

                {/* MENÚ */}
                <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
                    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-4">
                        <a href="#inicio" className="flex items-center gap-3">
                           <img
                                src="/img/logoelectrico.jpg"
                                alt="Logo Punto Electric"
                                className="h-14 w-auto object-contain" /> 

                            <div>
                                <p className="text-xl font-black">
                                    PUNTO <span className="text-yellow-500">ELECTRIC</span>
                                </p>
                                <p className="text-xs text-zinc-500">
                                    Soluciones eléctricas 
                                </p>
                            </div>
                        </a>

                        <nav className="hidden items-center gap-7 font-semibold md:flex">
                            <a href="#inicio" className="hover:text-yellow-500">
                                Inicio
                            </a>
                            <a href="#contacto" className="hover:text-yellow-500">
                                Contacto
                            </a>
                            <a href="/tienda" className="hover:text-yellow-500">
                                Tienda
                            </a>
                            <a href="#nosotros" className="hover:text-yellow-500">
                                Acerca de nosotros
                            </a>
                        </nav>

                        <div className="flex items-center overflow-hidden rounded-lg border-2 border-yellow-400 bg-white">
                            <input
                                type="search"
                                placeholder="Buscar producto"
                                className="w-44 px-4 py-2 text-sm outline-none sm:w-60"
                            />
                            <button
                                type="button"
                                className="bg-yellow-400 px-4 py-2 font-bold text-black"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </header>

                <main>
                    {/* PORTADA */}
                    <section
                        id="inicio"
                        className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100"
                    >
                        <div className="mx-auto grid min-h-[520px] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
                            <div className="flex min-h-80 items-center justify-center rounded-3xl bg-yellow-400 shadow-xl">
                                <div className="text-center">
                                    
                                <img
                                    src="/img/imgprincipal.jpg"
                                     alt="Iluminación eléctrica para hogares y negocios"
                                      className="h-full w-full object-cover" />
                                </div>
                                </div>
                            

                            <div>
                                <p className="font-bold uppercase tracking-[0.25em] text-yellow-600">
                                    Bienvenido a
                                </p>

                                <h1 className="mt-3 text-5xl font-black leading-tight">
                                    Punto <span className="text-yellow-500">Electric</span>
                                </h1>

                                <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
                                    Encuentra materiales eléctricos de calidad para
                                    tu hogar, negocio o proyecto. Contamos con
                                    productos confiables, precios competitivos y una
                                    atención personalizada.
                                </p>

                                <a
                                    href="#tienda"
                                    className="mt-8 inline-block rounded-lg bg-black px-7 py-3 font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                                >
                                    Comprar productos
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* CATEGORÍAS */}
                    <section className="mx-auto max-w-7xl px-6 py-16">
                        <div className="grid gap-8 md:grid-cols-3">
                            {categorias.map((categoria) => (
                                <article
                                    key={categoria.nombre}
                                    className="group cursor-pointer text-center"
                                >
                                    <div className="flex h-48 items-center justify-center rounded-2xl border-2 border-yellow-200 bg-yellow-50 text-7xl transition group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:shadow-xl">
                                        <img 
                                            src={categoria.imagen}
                                            alt={categoria.nombre}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <h2 className="mt-5 text-lg font-black">
                                        {categoria.nombre}
                                    </h2>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* PRODUCTOS NUEVOS */}
                    <section id="tienda" className="bg-yellow-50 px-6 py-20">
                        <div className="mx-auto max-w-7xl">
                            <div className="text-center">
                                <p className="font-bold uppercase tracking-widest text-yellow-600">
                                    Nuevos productos
                                </p>
                                <h2 className="mt-2 text-4xl font-black">
                                    ¡Acaba de llegar!
                                </h2>
                                <p className="mt-3 text-zinc-600">
                                    Revisa nuestros productos más recientes
                                </p>
                            </div>
                            <div className="mt-12 grid gap-8 md:grid-cols-3">
                                {nuevosProductos.map((producto) => (
                                    <article
                                        key={producto.nombre}
                                        className="relative overflow-hidden rounded-2xl border border-yellow-200 bg-white shadow-md transition hover:-translate-y-2 hover:shadow-xl"
                                    >
                                        <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-2 text-xs font-black">
                                            NUEVO
                                        </span>

                                        <div className="flex h-56 items-center justify-center bg-yellow-50 text-8xl">
                                        <img
                                            src={producto.imagen}
                                            alt={producto.nombre}
                                            className="h-full w-full object-contain p-4"
                                            />
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-black">
                                                {producto.nombre}
                                            </h3>

                                            <p className="mt-3 text-sm leading-6 text-zinc-600">
                                                {producto.descripcion}
                                            </p>

                                            <button
                                                type="button"
                                                className="mt-6 w-full rounded-lg bg-black px-5 py-3 font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                                            >
                                                Comprar ahora
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SUSCRIPCIÓN */}
                    <section className="px-6 py-16">
                        <div className="mx-auto max-w-6xl rounded-3xl bg-yellow-400 px-8 py-14 text-center shadow-xl">
                            <h2 className="text-4xl font-black">
                                ¿Buscas precios bajos?
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-lg">
                                Suscríbete para recibir promociones, novedades y
                                ofertas especiales de Punto Electric.
                            </p>

                            <div className="mx-auto mt-9 grid max-w-3xl gap-8 md:grid-cols-3">
                                <div>
                                    <div className="text-5xl">🔌</div>
                                    <p className="mt-3 font-bold">
                                        Elige tus productos favoritos
                                    </p>
                                </div>

                                <div>
                                    <div className="text-5xl">🔄</div>
                                    <p className="mt-3 font-bold">
                                        Elige la periodicidad
                                    </p>
                                </div>

                                <div>
                                    <div className="text-5xl">✕</div>
                                    <p className="mt-3 font-bold">
                                        Cancela cuando quieras
                                    </p>
                                </div>
                            </div>

                            <div className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Escribe tu correo electrónico"
                                    className="flex-1 rounded-lg border-2 border-black bg-white px-5 py-3 outline-none"
                                />

                                <button
                                    type="button"
                                    className="rounded-lg bg-black px-7 py-3 font-bold text-yellow-400"
                                >
                                    Suscribirme
                                </button>
                            </div>
                        </div>
                    </section>

                {/* MÁS VENDIDOS */}
                <section className="bg-white px-6 py-20">
                    <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1fr_2fr]">
                        <div>
                            <p className="font-bold uppercase tracking-widest text-yellow-600">
                                Recomendados
                            </p>

                            <h2 className="mt-2 text-4xl font-black">
                                Lo más vendido
                            </h2>

                            <p className="mt-5 leading-7 text-zinc-600">
                                Productos destacados por su calidad, utilidad y preferencia
                                entre nuestros clientes.
                            </p>

                            <a
                                href="#tienda"
                                className="mt-7 inline-block border-b-4 border-yellow-400 font-black"
                            >
                                Ver todos los productos
                            </a>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <CarruselProducto
                                nombre="Foco LED de 3 tonos"
                                descripcion="Iluminación cálida, fría y ámbar."
                                imagenes={[
                                    '/productos/candelabros/foco3tonos.jpg',
                                    '/productos/candelabros/frio.jpg',
                                    '/productos/candelabros/ambar.jpg',
                                    '/productos/candelabros/calidoestrella.jpg',
                                ]}
                            />

                            <CarruselProducto
                                nombre="Rollo de cinta LED RGB"
                                descripcion="Iluminación de colores RGB, rollo de 100 metros y corte cada metro. Ideal para interiores."
                                imagenes={[
                                    '/productos/carrusel2/cintaledrgb.avif',
                                    '/productos/carrusel2/cintaledrgb.jpg',
                                    '/productos/carrusel2/rgbled.jpg',
                                ]}
                            />
                        </div>
                    </div>
                </section>
                    {/* NOSOTROS */}
                    <section id="nosotros" className="bg-yellow-50 px-6 py-16">
                        <div className="mx-auto max-w-5xl text-center">
                            <h2 className="text-4xl font-black">
                                Acerca de Punto Electric
                            </h2>

                            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
                                Buscamos ofrecer materiales eléctricos confiables y
                                una atención cercana, ayudando a nuestros clientes a
                                encontrar los productos adecuados para cada proyecto.
                            </p>
                        </div>
                    </section>
                </main>

                {/* PIE DE PÁGINA */}
                <footer id="contacto" className="bg-black text-white">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
                        <div>
                            <div className="flex items-center gap-3">
                               <div className="h-14 w-14 overflow-hidden rounded-full bg-yellow-400">
                                <img
                                      src="/img/logoelectrico.jpg"
                                       alt="Logo Punto Eléctrico"
                                      className="h-full w-full scale-125 object-cover"
                                    />
                                </div>

                                <h2 className="text-xl font-black">
                                    PUNTO{' '}
                                    <span className="text-yellow-400">ELECTRIC</span>
                                </h2>
                            </div>  
                    {/* REDES SOCIALES */}
                        <div className="mt-1">
                        <p className="mb-5 font-bold text-white">
                            Síguenos en nuestras redes sociales.
                        </p>
                        </div>
                        <div className="flex items-center gap-1">
                            <a
                                href="https://www.facebook.com/share/18QVLnsBty/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visitar Facebook"
                                className="rounded-full bg-white p-2 transition hover:-translate-y-1 hover:scale-110"
                            >
                                <img
                                    src="/img/redes/facebook.png"
                                    alt="Facebook"
                                    className="h-8 w-8 object-contain"
                                />
                            </a>

                            <a
                                href="https://www.tiktok.com/@punto_electric"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visitar TikTok"
                                className="rounded-full bg-white p-2 transition hover:-translate-y-1 hover:scale-110"
                            >
                                <img
                                    src="/img/redes/titok.png"
                                    alt="TikTok"
                                    className="h-8 w-8 object-contain"
                                />
                            </a>

                            <a
                                href="https://wa.me/51935428871"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Contactar por WhatsApp"
                                className="rounded-full bg-white p-2 transition hover:-translate-y-1 hover:scale-110"
                            >
                                <img
                                    src="/img/redes/whatsapp.png"
                                    alt="WhatsApp"
                                    className="h-8 w-8 object-contain"
                                />
                            </a>
                        </div>
                        </div>

                        <div>
                            <h3 className="font-black text-yellow-400">
                                Información
                            </h3>

                            <div className="mt-4 space-y-2 text-sm text-zinc-300">
                                <p>Inicio</p>
                                <p>Preguntas frecuentes</p>
                                <p>Servicio al cliente</p>
                                <p>Política de privacidad</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-black text-yellow-400">
                                Contáctanos
                            </h3>

                            <div className="mt-4 space-y-2 text-sm text-zinc-300">
                                <p>Correo: ventasgservices@gmail.com</p>
                                <p>Teléfono: +51 935 428 871</p>
                                <p>Lima, Perú</p>
                            </div>

                            <button
                                type="button"
                                className="mt-6 rounded-lg border-2 border-yellow-400 px-5 py-2 font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                            >
                                Contactar con asesor
                            </button>
                        </div>
                    </div>
                    <div className="border-t border-zinc-800 px-6 py-5 text-center text-sm text-zinc-500">
                        © 2026 Punto Electric. Todos los derechos reservados por el autor.
                    </div>
                </footer>
            </div>
        </>
    );
}