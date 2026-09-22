import { Head } from '@inertiajs/react';

export default function Tienda() {
    return (
        <>
            <Head title="Tienda | Punto Electric" />

            <div className="min-h-screen bg-white text-zinc-900">
                {/* BARRA DE DESCUENTO */}
                <div className="bg-yellow-400 px-4 py-2 text-center text-sm font-bold text-black">
                    Aprovecha un 10 % de descuento en tu primera compra
                </div>

                {/* MENÚ */}
                <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
                    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-4">
                        <a
                            href="/inicio"
                            className="flex items-center gap-3"
                        >
                            <img
                                src="/img/logoelectrico.jpg"
                                alt="Logo Punto Electric"
                                className="h-14 w-auto object-contain"
                            />

                            <div>
                                <p className="text-xl font-black">
                                    PUNTO{' '}
                                    <span className="text-yellow-500">
                                        ELECTRIC
                                    </span>
                                </p>

                                <p className="text-xs text-zinc-500">
                                    Soluciones eléctricas
                                </p>
                            </div>
                        </a>

                        <nav className="hidden items-center gap-7 font-semibold md:flex">
                            <a
                                href="/inicio"
                                className="transition hover:text-yellow-500"
                            >
                                Inicio
                            </a>

                            <a
                                href="/inicio#contacto"
                                className="transition hover:text-yellow-500"
                            >
                                Contacto
                            </a>

                            <a
                                href="/tienda"
                                className="text-yellow-500"
                            >
                                Tienda
                            </a>

                            <a
                                href="/inicio#nosotros"
                                className="transition hover:text-yellow-500"
                            >
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
                                className="bg-yellow-400 px-4 py-2 font-bold text-black transition hover:bg-yellow-500"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </header>

                {/* CONTENIDO PRINCIPAL */}
                <main>
                    {/* PORTADA DEL CATÁLOGO */}
                    <section className="bg-yellow-400 px-6 py-16 text-center">
                        <h1 className="text-4xl font-black text-black md:text-5xl">
                            Catálogo de productos
                        </h1>

                        <p className="mt-3 text-lg text-zinc-800">
                            Encuentra materiales eléctricos para tu proyecto
                        </p>
                    </section>

                    {/* AQUÍ COLOCAREMOS LOS FILTROS Y PRODUCTOS */}
                    <section className="mx-auto min-h-[400px] max-w-7xl px-6 py-16">
                        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-8 text-center">
                            <h2 className="text-2xl font-black text-black">
                                Nuestros productos
                            </h2>

                            <p className="mt-2 text-zinc-600">
                                Próximamente colocaremos aquí las categorías,
                                filtros y productos.
                            </p>
                        </div>
                    </section>
                </main>

                {/* PIE DE PÁGINA */}
                <footer
                    id="contacto"
                    className="bg-black text-white"
                >
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
                        {/* LOGO Y REDES SOCIALES */}
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="h-14 w-14 overflow-hidden rounded-full bg-yellow-400">
                                    <img
                                        src="/img/logoelectrico.jpg"
                                        alt="Logo Punto Electric"
                                        className="h-full w-full scale-125 object-cover"
                                    />
                                </div>

                                <h2 className="text-xl font-black">
                                    PUNTO{' '}
                                    <span className="text-yellow-400">
                                        ELECTRIC
                                    </span>
                                </h2>
                            </div>

                            <div className="mt-5">
                                <p className="mb-4 font-bold text-white">
                                    Síguenos en nuestras redes sociales
                                </p>

                                <div className="flex items-center gap-3">
                                    {/* FACEBOOK */}
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

                                    {/* TIKTOK */}
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

                                    {/* WHATSAPP */}
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
                        </div>

                        {/* INFORMACIÓN */}
                        <div>
                            <h3 className="font-black text-yellow-400">
                                Información
                            </h3>

                            <div className="mt-4 space-y-2 text-sm text-zinc-300">
                                <a
                                    href="/inicio"
                                    className="block hover:text-yellow-400"
                                >
                                    Inicio
                                </a>

                                <p>Preguntas frecuentes</p>

                                <p>Servicio al cliente</p>

                                <p>Política de privacidad</p>
                            </div>
                        </div>

                        {/* CONTACTO */}
                        <div>
                            <h3 className="font-black text-yellow-400">
                                Contáctanos
                            </h3>

                            <div className="mt-4 space-y-2 text-sm text-zinc-300">
                                <p>
                                    Correo: ventasgservices@gmail.com
                                </p>

                                <p>
                                    Teléfono: +51 935 428 871
                                </p>

                                <p>Lima, Perú</p>
                            </div>

                            <a
                                href="https://wa.me/51935428871?text=Hola%2C%20deseo%20recibir%20informaci%C3%B3n%20sobre%20sus%20productos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-block rounded-lg border-2 border-yellow-400 px-5 py-2 font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                            >
                                Contactar con asesor
                            </a>
                        </div>
                    </div>

                    {/* COPYRIGHT */}
                    <div className="border-t border-zinc-800 px-6 py-5 text-center text-sm text-zinc-500">
                        © 2026 Punto Electric. Todos los derechos reservados por
                        el autor.
                    </div>
                </footer>
            </div>
        </>
    );
}