import { Head } from '@inertiajs/react';
import { ArrowRight, ChevronLeft, ChevronRight, FileText, Menu, MessageCircle, Search, ShieldCheck, ShoppingCart, Truck, Wrench, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/* ===== DATOS ===== */
const WHATSAPP = '51935428871';
const wa = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

const menu = [
    { texto: 'Inicio', href: '#inicio' },
    { texto: 'Tienda', href: '/tienda' },
    { texto: 'Acerca de nosotros', href: '/nosotros' },
    { texto: 'Contacto', href: '#contacto' },
];

const categorias = [
    { nombre: 'Comercial', imagen: '/categoria/comercial.jpg' },
    { nombre: 'Interiores', imagen: '/categoria/interiores.jpg' },
    { nombre: 'Exteriores', imagen: '/categoria/exterior.jpg' },
];

const nuevosProductos = [
    { imagen: '/newproducto/diferencial.jpg', nombre: 'Interruptor diferencial Bticino', descripcion: 'Protección segura para instalaciones eléctricas.' },
    { imagen: '/newproducto/tablero24.jpg', nombre: 'Tablero de 24 polos metálico', descripcion: 'Tablero resistente para proyectos eléctricos.' },
    { imagen: '/newproducto/cajaoctogonal.jpg', nombre: 'Caja octogonal', descripcion: 'Ideal para instalaciones y conexiones eléctricas.' },
];

const ventajas = [
    { icono: Truck, titulo: 'Envíos en Lima', texto: 'A obra o domicilio.' },
    { icono: Wrench, titulo: 'Asesoría técnica', texto: 'Te ayudamos a elegir.' },
    { icono: ShieldCheck, titulo: 'Marcas confiables', texto: 'Productos certificados.' },
    { icono: MessageCircle, titulo: 'Atención por WhatsApp', texto: 'Cotiza desde tu celular.' },
];

const pasos = [
    { icono: Search, titulo: 'Elige tus productos', texto: 'Explora el catálogo y compara precios por categoría, marca o ambiente.' },
    { icono: ShoppingCart, titulo: 'Agrégalos al carrito', texto: 'Indica la cantidad que necesitas de cada uno.' },
    { icono: FileText, titulo: 'Envía tu pedido', texto: 'Mándanos tu carrito por WhatsApp y te confirmamos stock y entrega.' },
];

const redes = [
    { href: 'https://www.facebook.com/share/18QVLnsBty/', img: '/img/redes/facebook.png', nombre: 'Facebook' },
    { href: 'https://www.tiktok.com/@punto_electric', img: '/img/redes/titok.png', nombre: 'TikTok' },
    { href: `https://wa.me/${WHATSAPP}`, img: '/img/redes/whatsapp.png', nombre: 'WhatsApp' },
];

const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400';
const contenedor = 'mx-auto max-w-[1440px] px-4 sm:px-6';
const botonAmarillo = `inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 font-black text-black transition hover:bg-yellow-300 ${foco}`;

/* Aparece suavemente al entrar en pantalla (respeta "reducir movimiento") */
function Aparecer({ children, retraso = 0, className = '' }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true);
            return;
        }
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.15 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ transitionDelay: `${retraso}ms` }} className={`transition-all duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}>
            {children}
        </div>
    );
}

/* Carrusel de producto */
function CarruselProducto({ imagenes, nombre, descripcion }) {
    const [actual, setActual] = useState(0);
    const mover = (paso) => setActual((i) => (i + paso + imagenes.length) % imagenes.length);

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950">
            <div className="relative h-64 bg-white">
                <img src={imagenes[actual]} alt={`${nombre} - imagen ${actual + 1}`} loading="lazy" className="h-full w-full object-contain p-5" />
                {imagenes.length > 1 && (
                    <>
                        {[-1, 1].map((d) => (
                            <button
                                key={d}
                                type="button"
                                onClick={() => mover(d)}
                                className={`absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white hover:bg-black ${foco} ${d < 0 ? 'left-2' : 'right-2'}`}
                                aria-label={d < 0 ? 'Imagen anterior' : 'Imagen siguiente'}
                            >
                                {d < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                            </button>
                        ))}
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                            {imagenes.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setActual(i)}
                                    className={`h-2 rounded-full transition-all ${i === actual ? 'w-6 bg-yellow-500' : 'w-2 bg-zinc-400'}`}
                                    aria-label={`Mostrar imagen ${i + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-black">{nombre}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-400">{descripcion}</p>
                <a href={wa(`Hola, deseo cotizar el producto: ${nombre}`)} target="_blank" rel="noopener noreferrer" className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-500 ${foco}`}>
                    <MessageCircle className="h-4 w-4" /> Cotizar por WhatsApp
                </a>
            </div>
        </article>
    );
}

/* ===== PÁGINA ===== */
export default function Inicio() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [compacto, setCompacto] = useState(false);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const f = () => setCompacto(window.scrollY > 40);
        f();
        window.addEventListener('scroll', f, { passive: true });
        return () => window.removeEventListener('scroll', f);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuAbierto ? 'hidden' : '';
        const cerrar = (e) => e.key === 'Escape' && setMenuAbierto(false);
        window.addEventListener('keydown', cerrar);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', cerrar);
        };
    }, [menuAbierto]);

    const buscar = (e) => {
        e.preventDefault();
        const t = busqueda.trim();
        window.location.href = t ? `/tienda?buscar=${encodeURIComponent(t)}` : '/tienda';
    };

    const esNosotros = (href) => href === '/nosotros';

    return (
        <>
            <Head title="Punto Electric | Materiales eléctricos en Lima" />

            <div
                id="top"
                className="min-h-screen scroll-smooth text-zinc-100"
                style={{
                    backgroundColor: '#1c1c1f',
                    backgroundImage:
                        'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(250,204,21,0.14), transparent 70%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
                    backgroundSize: '100% 100%, 44px 44px, 44px 44px',
                    backgroundAttachment: 'fixed',
                }}
            >
                <div className="bg-yellow-400 px-4 py-2 text-center text-xs font-bold text-black sm:text-sm">10 % de descuento en tu primera compra</div>

                {/* MENÚ */}
                <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${compacto ? 'border-white/10 bg-zinc-900/80 backdrop-blur-md' : 'border-transparent bg-zinc-900/60 backdrop-blur-sm'}`}>
                    <div className={`${contenedor} flex items-center justify-between gap-4 transition-all duration-300 ${compacto ? 'py-2' : 'py-3 sm:py-4'}`}>
                        <a href="#inicio" className={`flex shrink-0 items-center gap-3 ${foco}`}>
                            <img src="/img/logoelectrico.jpg" alt="Logo Punto Electric" className={`w-auto rounded-full object-contain transition-all duration-300 ${compacto ? 'h-9 sm:h-10' : 'h-10 sm:h-14'}`} />
                            <div>
                                <p className="text-base font-black leading-tight sm:text-xl">
                                    PUNTO <span className="text-yellow-400">ELECTRIC</span>
                                </p>
                                <p className="text-xs text-zinc-400">Soluciones eléctricas</p>
                            </div>
                        </a>

                        <nav className="hidden items-center gap-1 lg:flex">
                            {menu.map((item) => (
                                <a
                                    key={item.texto}
                                    href={item.href}
                                    target={esNosotros(item.href) ? '_blank' : undefined}
                                    rel={esNosotros(item.href) ? 'noopener noreferrer' : undefined}
                                    className={`rounded-full px-4 py-2 font-semibold transition ${item.href === '#inicio' ? 'bg-yellow-400 text-black' : 'text-zinc-300 hover:bg-white/10 hover:text-white'} ${foco}`}
                                >
                                    {item.texto}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            <form onSubmit={buscar} role="search" className="relative hidden w-64 md:block">
                                <input
                                    type="search"
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    placeholder="Buscar producto"
                                    aria-label="Buscar producto"
                                    className="w-full rounded-full border border-white/15 bg-zinc-900 py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-yellow-400"
                                />
                                <button type="submit" aria-label="Buscar" className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-300">
                                    <Search className="h-4 w-4" />
                                </button>
                            </form>
                            <button type="button" onClick={() => setMenuAbierto(true)} className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/20 lg:hidden ${foco}`} aria-label="Abrir menú" aria-expanded={menuAbierto}>
                                <Menu className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* MENÚ CELULAR */}
                <div
                    className={`fixed inset-0 z-50 flex flex-col bg-zinc-950 text-white transition-all duration-300 lg:hidden ${menuAbierto ? 'visible opacity-100' : 'invisible opacity-0'}`}
                    role="dialog"
                    aria-label="Menú"
                    aria-hidden={!menuAbierto}
                >
                    <div className="flex items-center justify-between px-4 py-3">
                        <p className="text-lg font-black">
                            PUNTO <span className="text-yellow-400">ELECTRIC</span>
                        </p>
                        <button type="button" onClick={() => setMenuAbierto(false)} className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 ${foco}`} aria-label="Cerrar menú">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={buscar} role="search" className="relative mx-4 mt-4">
                        <input
                            type="search"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar producto"
                            aria-label="Buscar producto"
                            className="w-full rounded-full border border-white/15 bg-zinc-900 py-3 pl-5 pr-14 text-white placeholder:text-zinc-500 outline-none focus:border-yellow-400"
                        />
                        <button type="submit" aria-label="Buscar" className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-400 text-black">
                            <Search className="h-5 w-5" />
                        </button>
                    </form>

                    <nav className="mt-4 flex flex-col px-4">
                        {menu.map((item, i) => (
                            <a
                                key={item.texto}
                                href={item.href}
                                target={esNosotros(item.href) ? '_blank' : undefined}
                                rel={esNosotros(item.href) ? 'noopener noreferrer' : undefined}
                                onClick={() => setMenuAbierto(false)}
                                style={{ transitionDelay: menuAbierto ? `${80 + i * 50}ms` : '0ms' }}
                                className={`flex items-center justify-between border-b border-white/10 py-4 text-2xl font-black transition-all duration-300 hover:text-yellow-400 ${menuAbierto ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
                            >
                                {item.texto}
                                <ArrowRight className="h-5 w-5 text-yellow-400" />
                            </a>
                        ))}
                    </nav>

                    <div className="mt-auto p-4">
                        <a href={wa('Hola, vengo de la página web.')} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 font-bold">
                            <MessageCircle className="h-5 w-5" /> Escríbenos por WhatsApp
                        </a>
                    </div>
                </div>

                <main>
                    {/* PORTADA */}
                    <section id="inicio" className={`${contenedor} scroll-mt-24 pt-6`}>
                        <div className="relative flex min-h-[32rem] items-center overflow-hidden rounded-3xl border border-white/10 lg:min-h-[40rem]">
                            <img src="/img/imgprincipal.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

                            <div className="relative max-w-3xl px-6 py-16 sm:px-12 lg:px-16">
                                <Aparecer>
                                    <p className="inline-flex items-center gap-2 rounded-full border border-yellow-400/50 bg-black/40 px-4 py-1.5 text-sm font-bold text-yellow-400 backdrop-blur">
                                        <span className="h-2 w-2 rounded-full bg-yellow-400" />
                                        Materiales eléctricos y servicio técnico
                                    </p>
                                </Aparecer>
                                <Aparecer retraso={100}>
                                    <h1 className="mt-5 text-4xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
                                        Material eléctrico para tu casa, negocio <span className="text-yellow-400">u obra</span>
                                    </h1>
                                </Aparecer>
                                <Aparecer retraso={200}>
                                    <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
                                        Productos confiables, precios competitivos y asesoría para que compres exactamente lo que tu instalación necesita.
                                    </p>
                                </Aparecer>
                                <Aparecer retraso={300}>
                                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                        <a href="/tienda" className={botonAmarillo}>
                                            Ver catálogo <ArrowRight className="h-5 w-5" />
                                        </a>
                                        <a href={wa('Hola, quisiera una cotización.')} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3.5 font-bold backdrop-blur transition hover:border-yellow-400 hover:text-yellow-400 ${foco}`}>
                                            <MessageCircle className="h-5 w-5" /> Cotizar por WhatsApp
                                        </a>
                                    </div>
                                </Aparecer>
                            </div>
                        </div>
                    </section>

                    {/* VENTAJAS: se monta sobre la portada */}
                    <section className={`${contenedor} relative z-10 -mt-8 sm:-mt-10`}>
                        <Aparecer>
                            <div className="mx-auto grid max-w-6xl gap-4 rounded-3xl border border-white/10 bg-zinc-950/95 p-5 shadow-2xl backdrop-blur sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
                                {ventajas.map(({ icono: Icono, titulo, texto }) => (
                                    <div key={titulo} className="flex items-center gap-3">
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                                            <Icono className="h-6 w-6" />
                                        </span>
                                        <div>
                                            <p className="font-black">{titulo}</p>
                                            <p className="text-sm text-zinc-400">{texto}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Aparecer>
                    </section>

                    {/* CATEGORÍAS */}
                    <section className={`${contenedor} py-16 sm:py-20`}>
                        <Aparecer>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                <h2 className="text-3xl font-black sm:text-4xl">
                                    Compra por <span className="text-yellow-400">ambiente</span>
                                </h2>
                                <a href="/tienda" className={`inline-flex items-center gap-2 font-bold text-yellow-400 hover:underline ${foco}`}>
                                    Ver todo el catálogo <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </Aparecer>
                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            {categorias.map((c, i) => (
                                <Aparecer key={c.nombre} retraso={i * 120}>
                                    <a href={`/tienda?ambiente=${c.nombre}`} className={`group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition hover:border-yellow-400 md:aspect-[3/4] ${foco}`}>
                                        <img src={c.imagen} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
                                            <span className="text-3xl font-black">{c.nombre}</span>
                                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-black transition group-hover:translate-x-1">
                                                <ArrowRight className="h-5 w-5" />
                                            </span>
                                        </div>
                                    </a>
                                </Aparecer>
                            ))}
                        </div>
                    </section>

                    {/* PASOS */}
                    <section className="border-y border-white/10 bg-zinc-950 py-16 sm:py-20">
                        <div className={contenedor}>
                            <Aparecer>
                                <h2 className="max-w-md text-3xl font-black sm:text-4xl">
                                    Haz tu pedido en <span className="text-yellow-400">3 pasos</span>
                                </h2>
                            </Aparecer>
                            <ol className="mt-10 grid gap-5 md:grid-cols-3">
                                {pasos.map(({ icono: Icono, titulo, texto }, i) => (
                                    <li key={titulo}>
                                        <Aparecer retraso={i * 150} className="h-full">
                                            <div className="relative h-full rounded-3xl border border-white/10 bg-zinc-900 p-7">
                                                <span className="absolute right-6 top-5 text-6xl font-black text-white/10">{i + 1}</span>
                                                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                                                    <Icono className="h-7 w-7" />
                                                </span>
                                                <h3 className="mt-5 text-xl font-black">{titulo}</h3>
                                                <p className="mt-2 leading-7 text-zinc-400">{texto}</p>
                                            </div>
                                        </Aparecer>
                                    </li>
                                ))}
                            </ol>
                            <Aparecer retraso={300}>
                                <a href="/tienda" className={`${botonAmarillo} mt-10`}>
                                    Empezar a elegir productos <ArrowRight className="h-5 w-5" />
                                </a>
                            </Aparecer>
                        </div>
                    </section>

                    {/* NOVEDADES */}
                    <section id="tienda" className={`${contenedor} scroll-mt-24 py-16 sm:py-20`}>
                        <Aparecer>
                            <h2 className="text-3xl font-black sm:text-4xl">
                                Recién <span className="text-yellow-400">llegados</span>
                            </h2>
                            <p className="mt-2 text-zinc-400">Los productos que acabamos de incorporar a la tienda.</p>
                        </Aparecer>
                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            {nuevosProductos.map((p, i) => (
                                <Aparecer key={p.nombre} retraso={i * 120} className="h-full">
                                    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-[0_10px_40px_-10px_rgba(250,204,21,0.35)]">
                                        <span className="absolute left-3 top-3 z-10 rounded-md bg-yellow-400 px-2.5 py-1 text-xs font-black text-black">Nuevo</span>
                                        <div className="h-60 bg-white">
                                            <img src={p.imagen} alt={p.nombre} loading="lazy" className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105" />
                                        </div>
                                        <div className="flex flex-1 flex-col p-5">
                                            <h3 className="text-xl font-black">{p.nombre}</h3>
                                            <p className="mt-1 text-sm leading-6 text-zinc-400">{p.descripcion}</p>
                                            <a href={wa(`Hola, deseo cotizar el producto: ${p.nombre}`)} target="_blank" rel="noopener noreferrer" className={`mt-auto inline-flex justify-center rounded-xl bg-yellow-400 px-5 py-3 font-black text-black transition hover:bg-yellow-300 ${foco}`}>
                                                <span className="mt-0 pt-0">Cotizar este producto</span>
                                            </a>
                                        </div>
                                    </article>
                                </Aparecer>
                            ))}
                        </div>
                    </section>

                    {/* MÁS VENDIDOS */}
                    <section className="border-t border-white/10 bg-zinc-950 py-16 sm:py-20">
                        <div className={`${contenedor} grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center`}>
                            <Aparecer>
                                <h2 className="text-3xl font-black sm:text-4xl">
                                    Lo más <span className="text-yellow-400">vendido</span>
                                </h2>
                                <p className="mt-3 max-w-sm leading-7 text-zinc-400">Los productos que más eligen nuestros clientes por su calidad y utilidad.</p>
                                <a href="/tienda" className={`mt-5 inline-flex items-center gap-2 font-bold text-yellow-400 underline-offset-4 hover:underline ${foco}`}>
                                    Ver todos los productos <ArrowRight className="h-4 w-4" />
                                </a>
                            </Aparecer>
                            <div className="grid gap-5 md:grid-cols-2">
                                <Aparecer className="h-full">
                                    <CarruselProducto
                                        nombre="Foco LED de 3 tonos"
                                        descripcion="Luz cálida, fría y ámbar en un solo foco."
                                        imagenes={['/productos/candelabros/foco3tonos.jpg', '/productos/candelabros/frio.jpg', '/productos/candelabros/ambar.jpg', '/productos/candelabros/calidoestrella.jpg']}
                                    />
                                </Aparecer>
                                <Aparecer retraso={120} className="h-full">
                                    <CarruselProducto
                                        nombre="Rollo de cinta LED RGB"
                                        descripcion="Luz de colores RGB, rollo de 100 metros con corte cada metro. Ideal para interiores."
                                        imagenes={['/productos/carrusel2/cintaledrgb.avif', '/productos/carrusel2/cintaledrgb.jpg', '/productos/carrusel2/rgbled.jpg']}
                                    />
                                </Aparecer>
                            </div>
                        </div>
                    </section>
                </main>

                {/* PIE DE PÁGINA */}
                <footer id="contacto" className="bg-black text-white">
                    <div aria-hidden="true" className="h-3 bg-[repeating-linear-gradient(-45deg,#facc15_0_14px,#18181b_14px_28px)]" />
                    <div className={`${contenedor} grid gap-10 py-12 md:grid-cols-3`}>
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="h-14 w-14 overflow-hidden rounded-full bg-yellow-400">
                                    <img src="/img/logoelectrico.jpg" alt="Logo Punto Electric" className="h-full w-full scale-125 object-cover" />
                                </div>
                                <p className="text-xl font-black">
                                    PUNTO <span className="text-yellow-400">ELECTRIC</span>
                                </p>
                            </div>
                            <p className="mb-4 mt-5 font-bold">Síguenos</p>
                            <div className="flex items-center gap-3">
                                {redes.map((r) => (
                                    <a key={r.nombre} href={r.href} target="_blank" rel="noopener noreferrer" aria-label={`Visitar ${r.nombre}`} className={`rounded-full bg-white p-2 transition hover:-translate-y-1 hover:scale-110 ${foco}`}>
                                        <img src={r.img} alt="" className="h-8 w-8 object-contain" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-black text-yellow-400">Información</h3>
                            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                                <li><a href="#inicio" className="hover:text-yellow-400">Inicio</a></li>
                                <li><a href="/tienda" className="hover:text-yellow-400">Tienda</a></li>
                                <li><a href="/nosotros" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">Acerca de nosotros</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-black text-yellow-400">Contáctanos</h3>
                            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                                <li><a href="mailto:ventasgservices@gmail.com" className="break-all hover:text-yellow-400">ventasgservices@gmail.com</a></li>
                                <li><a href="tel:+51935428871" className="hover:text-yellow-400">+51 935 428 871</a></li>
                                <li>Lima, Perú</li>
                            </ul>
                            <a href={wa('Hola, quisiera hablar con un asesor.')} target="_blank" rel="noopener noreferrer" className={`mt-6 inline-flex items-center gap-2 rounded-xl border border-yellow-400 px-5 py-2 font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black ${foco}`}>
                                <MessageCircle className="h-4 w-4" /> Hablar con un asesor
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-zinc-500">© 2026 Punto Electric. Todos los derechos reservados.</div>
                </footer>

                {/* WHATSAPP FLOTANTE */}
                <a
                    href={wa('Hola, vengo de la página web.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escríbenos por WhatsApp"
                    className={`fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-xl transition hover:scale-110 ${foco}`}
                    style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
                >
                    <img src="/img/redes/whatsapp.png" alt="" className="h-8 w-8 object-contain" />
                </a>
            </div>
        </>
    );
}