import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    FileText,
    Menu,
    MessageCircle,
    Search,
    ShieldCheck,
    ShoppingCart,
    Truck,
    Wrench,
    X,
    type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';

/* ===== DATOS ===== */
const WHATSAPP = '51935428871';

const enlaceWhatsApp = (texto: string) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

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

const ventajas: { icono: LucideIcon; titulo: string; texto: string }[] = [
    { icono: Truck, titulo: 'Envíos en Lima', texto: 'A obra o domicilio.' },
    { icono: Wrench, titulo: 'Asesoría técnica', texto: 'Te ayudamos a elegir.' },
    { icono: ShieldCheck, titulo: 'Marcas confiables', texto: 'Productos certificados.' },
    { icono: MessageCircle, titulo: 'Atención por WhatsApp', texto: 'Cotiza desde tu celular.' },
];

const pasos: { icono: LucideIcon; titulo: string; texto: string }[] = [
    {
        icono: Search,
        titulo: 'Elige tus productos',
        texto: 'Explora el catálogo y compara precios por categoría, marca o ambiente.',
    },
    {
        icono: ShoppingCart,
        titulo: 'Agrégalos al carrito',
        texto: 'Indica la cantidad que necesitas de cada uno.',
    },
    {
        icono: FileText,
        titulo: 'Envía tu pedido',
        texto: 'Mándanos tu carrito por WhatsApp y te confirmamos stock y entrega.',
    },
];

/* Franja tipo cinta de seguridad: el detalle distintivo de la página */
const CintaSeguridad = () => (
    <div
        aria-hidden="true"
        className="h-3 bg-[repeating-linear-gradient(-45deg,#facc15_0_14px,#18181b_14px_28px)]"
    />
);

/* Estilo de foco visible para teclado, reutilizado en enlaces y botones */
const foco =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2';

/* ===== ANIMACIÓN AL HACER SCROLL =====
   Envuelve cualquier bloque con <Aparecer> para que se desvanezca hacia arriba
   cuando entra en pantalla. "retraso" (en ms) escalona varias tarjetas seguidas.
   Si el usuario tiene activado "reducir movimiento", se muestra sin animación. */
function Aparecer({
    children,
    retraso = 0,
    className = '',
}: {
    children: ReactNode;
    retraso?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true);
            return;
        }
        const observador = new IntersectionObserver(
            ([entrada]) => {
                if (entrada.isIntersecting) {
                    setVisible(true);
                    observador.disconnect();
                }
            },
            { threshold: 0.15 },
        );
        observador.observe(el);
        return () => observador.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${retraso}ms` }}
            className={`transition duration-700 ease-out ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } ${className}`}
        >
            {children}
        </div>
    );
}

/* ===== CARRUSEL ===== */
type CarruselProductoProps = {
    imagenes: string[];
    nombre: string;
    descripcion: string;
};

function CarruselProducto({ imagenes, nombre, descripcion }: CarruselProductoProps) {
    const [imagenActual, setImagenActual] = useState(0);

    const anterior = () =>
        setImagenActual((actual) => (actual === 0 ? imagenes.length - 1 : actual - 1));

    const siguiente = () =>
        setImagenActual((actual) => (actual === imagenes.length - 1 ? 0 : actual + 1));

    return (
        <article className="h-full min-w-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-52 bg-stone-100 sm:h-60 md:h-64">
                <img
                    src={imagenes[imagenActual]}
                    alt={`${nombre} - imagen ${imagenActual + 1}`}
                    loading="lazy"
                    className="h-full w-full object-contain p-3"
                />

                {imagenes.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={anterior}
                            className={`absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900/80 text-white backdrop-blur hover:bg-zinc-900 ${foco}`}
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                            type="button"
                            onClick={siguiente}
                            className={`absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900/80 text-white backdrop-blur hover:bg-zinc-900 ${foco}`}
                            aria-label="Imagen siguiente"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>

                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                            {imagenes.map((_, indice) => (
                                <button
                                    key={indice}
                                    type="button"
                                    onClick={() => setImagenActual(indice)}
                                    className={`h-2.5 rounded-full transition-all ${
                                        imagenActual === indice
                                            ? 'w-6 bg-yellow-400'
                                            : 'w-2.5 bg-zinc-400'
                                    }`}
                                    aria-label={`Mostrar imagen ${indice + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-lg font-black text-zinc-900 sm:text-xl">{nombre}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{descripcion}</p>

                <a
                    href={enlaceWhatsApp(`Hola, deseo cotizar el producto: ${nombre}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700 sm:inline-flex sm:w-auto sm:text-base ${foco}`}
                >
                    <MessageCircle className="h-4 w-4" />
                    Cotizar por WhatsApp
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

    /* El menú se compacta al bajar */
    useEffect(() => {
        const alHacerScroll = () => setCompacto(window.scrollY > 40);
        alHacerScroll();
        window.addEventListener('scroll', alHacerScroll, { passive: true });
        return () => window.removeEventListener('scroll', alHacerScroll);
    }, []);

    /* Con el menú de celular abierto: bloquea el scroll y se cierra con Esc */
    useEffect(() => {
        document.body.style.overflow = menuAbierto ? 'hidden' : '';
        const cerrar = (e: KeyboardEvent) => e.key === 'Escape' && setMenuAbierto(false);
        window.addEventListener('keydown', cerrar);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', cerrar);
        };
    }, [menuAbierto]);

    /* El buscador lleva a la tienda con la búsqueda aplicada */
    const buscar = (e: FormEvent) => {
        e.preventDefault();
        const texto = busqueda.trim();
        window.location.href = texto ? `/tienda?buscar=${encodeURIComponent(texto)}` : '/tienda';
    };

    return (
        <>
            <Head title="Punto Electric | Materiales eléctricos en Lima" />

            <div className="min-h-screen bg-white text-zinc-900">
                {/* BARRA DE DESCUENTO */}
                <div className="bg-yellow-400 px-3 py-2 text-center text-xs font-bold text-zinc-900 sm:text-sm">
                    10 % de descuento en tu primera compra
                </div>

                {/* MENÚ */}
                <header
                    className={`sticky top-0 z-40 border-b transition-all duration-300 ${
                        compacto
                            ? 'border-zinc-200 bg-white/85 shadow-sm backdrop-blur-md'
                            : 'border-transparent bg-white'
                    }`}
                >
                    <div
                        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 ${
                            compacto ? 'py-2' : 'py-3 sm:py-4'
                        }`}
                    >
                        <a href="#inicio" className={`flex shrink-0 items-center gap-3 rounded-lg ${foco}`}>
                            <img
                                src="/img/logoelectrico.jpg"
                                alt="Logo Punto Electric"
                                className={`w-auto object-contain transition-all duration-300 ${
                                    compacto ? 'h-9 sm:h-10' : 'h-10 sm:h-14'
                                }`}
                            />
                            <div>
                                <p className="text-base font-black leading-tight sm:text-xl">
                                    PUNTO <span className="text-yellow-500">ELECTRIC</span>
                                </p>
                                <p className="text-xs text-zinc-500">Soluciones eléctricas</p>
                            </div>
                        </a>

                        {/* Menú de computadora */}
                        <nav className="hidden items-center gap-1 lg:flex">
                            {menu.map((item) => (
                                <a
                                    key={item.texto}
                                    href={item.href}
                                    target={item.href === '/nosotros' ? '_blank' : undefined}
                                    rel={item.href === '/nosotros' ? 'noopener noreferrer' : undefined}
                                    className={`rounded-full px-4 py-2 font-semibold transition hover:bg-yellow-100 ${foco}`}
                                >
                                    {item.texto}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            {/* Buscador (computadora) */}
                            <form
                                onSubmit={buscar}
                                role="search"
                                className="hidden items-center rounded-full border-2 border-zinc-200 bg-white pl-4 transition focus-within:border-yellow-400 md:flex"
                            >
                                <input
                                    type="search"
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    placeholder="Buscar producto"
                                    aria-label="Buscar producto"
                                    className="w-40 bg-transparent py-2 text-sm outline-none xl:w-56"
                                />
                                <button
                                    type="submit"
                                    className="m-1 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-yellow-400 hover:bg-zinc-700"
                                    aria-label="Buscar"
                                >
                                    <Search className="h-4 w-4" />
                                </button>
                            </form>

                            {/* Botón hamburguesa (celular y tablet) */}
                            <button
                                type="button"
                                onClick={() => setMenuAbierto(true)}
                                className={`flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-yellow-400 lg:hidden ${foco}`}
                                aria-label="Abrir menú"
                                aria-expanded={menuAbierto}
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* MENÚ DE CELULAR A PANTALLA COMPLETA */}
                <div
                    className={`fixed inset-0 z-50 flex flex-col bg-zinc-900 text-white transition-all duration-300 lg:hidden ${
                        menuAbierto ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
                    role="dialog"
                    aria-label="Menú"
                    aria-hidden={!menuAbierto}
                >
                    <div className="flex items-center justify-between px-4 py-3">
                        <p className="text-lg font-black">
                            PUNTO <span className="text-yellow-400">ELECTRIC</span>
                        </p>
                        <button
                            type="button"
                            onClick={() => setMenuAbierto(false)}
                            className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 ${foco} focus-visible:ring-offset-zinc-900`}
                            aria-label="Cerrar menú"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={buscar} role="search" className="mx-4 mt-4 flex items-center rounded-full bg-white pl-4">
                        <input
                            type="search"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar producto"
                            aria-label="Buscar producto"
                            className="min-w-0 flex-1 bg-transparent py-3 text-zinc-900 outline-none"
                        />
                        <button
                            type="submit"
                            className="m-1 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-zinc-900"
                            aria-label="Buscar"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    </form>

                    <nav className="mt-6 flex flex-col px-4">
                        {menu.map((item, i) => (
                            <a
                                key={item.texto}
                                href={item.href}
                                target={item.href === '/nosotros' ? '_blank' : undefined}
                                rel={item.href === '/nosotros' ? 'noopener noreferrer' : undefined}
                                onClick={() => setMenuAbierto(false)}
                                style={{ transitionDelay: menuAbierto ? `${80 + i * 50}ms` : '0ms' }}
                                className={`flex items-center justify-between border-b border-white/10 py-4 text-2xl font-black transition-all duration-300 hover:text-yellow-400 ${
                                    menuAbierto ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                                }`}
                            >
                                {item.texto}
                                <ArrowRight className="h-5 w-5 text-yellow-400" />
                            </a>
                        ))}
                    </nav>

                    <div className="mt-auto p-4">
                        <a
                            href={enlaceWhatsApp('Hola, vengo de la página web.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 font-bold"
                        >
                            <MessageCircle className="h-5 w-5" />
                            Escríbenos por WhatsApp
                        </a>
                    </div>
                </div>

                <main>
                    {/* PORTADA: foto a pantalla completa con capa oscura */}
                    <section id="inicio" className="relative isolate overflow-hidden bg-zinc-900 text-white">
                        <img
                            src="/img/imgprincipal.jpg"
                            alt=""
                            className="absolute inset-0 -z-20 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-950/95 via-zinc-950/80 to-zinc-950/40" />

                        <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-4 pb-32 pt-16 sm:px-6 md:min-h-[640px] md:pb-36">
                            <Aparecer>
                                <p className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1.5 text-sm font-bold text-yellow-400">
                                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                                    Materiales eléctricos y servicio técnico
                                </p>
                            </Aparecer>

                            <Aparecer retraso={100}>
                                <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] sm:text-6xl md:text-7xl">
                                    Material eléctrico para tu casa, negocio{' '}
                                    <span className="text-yellow-400">u obra</span>
                                </h1>
                            </Aparecer>

                            <Aparecer retraso={200}>
                                <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
                                    Productos confiables, precios competitivos y asesoría para que
                                    compres exactamente lo que tu instalación necesita.
                                </p>
                            </Aparecer>

                            <Aparecer retraso={300}>
                                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                    <a
                                        href="/tienda"
                                        className={`group inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-8 py-4 font-black text-zinc-900 transition hover:bg-yellow-300 ${foco} focus-visible:ring-offset-zinc-900`}
                                    >
                                        Ver catálogo
                                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                                    </a>
                                    <a
                                        href={enlaceWhatsApp('Hola, quisiera una cotización.')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/25 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur transition hover:border-yellow-400 hover:text-yellow-400 ${foco} focus-visible:ring-offset-zinc-900`}
                                    >
                                        <MessageCircle className="h-5 w-5" />
                                        Cotizar por WhatsApp
                                    </a>
                                </div>
                            </Aparecer>
                        </div>
                    </section>

                    {/* VENTAJAS: tarjeta que se monta sobre la portada */}
                    <section className="relative z-10 -mt-20 px-4 sm:px-6">
                        <Aparecer>
                            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-zinc-200 shadow-2xl md:grid-cols-4">
                                {ventajas.map(({ icono: Icono, titulo, texto }) => (
                                    <div key={titulo} className="flex flex-col gap-3 bg-white p-5 sm:flex-row sm:items-center sm:p-6">
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-zinc-900">
                                            <Icono className="h-6 w-6" />
                                        </span>
                                        <div>
                                            <p className="font-black leading-tight">{titulo}</p>
                                            <p className="mt-0.5 text-sm text-zinc-500">{texto}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Aparecer>
                    </section>

                    {/* CATEGORÍAS */}
                    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
                        <Aparecer>
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                                <div>
                                    <p className="text-sm font-black uppercase tracking-widest text-yellow-600">Categorías</p>
                                    <h2 className="mt-2 text-3xl font-black sm:text-5xl">Compra por ambiente</h2>
                                </div>
                                <a href="/tienda" className="inline-flex items-center gap-2 font-bold hover:text-yellow-600">
                                    Ver todo el catálogo <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </Aparecer>

                        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                            {categorias.map((categoria, i) => (
                                <Aparecer key={categoria.nombre} retraso={i * 120}>
                                    <a
                                        href={`/tienda?ambiente=${categoria.nombre}`}
                                        className={`group relative block h-60 overflow-hidden rounded-3xl sm:h-72 ${foco}`}
                                    >
                                        <img
                                            src={categoria.imagen}
                                            alt=""
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                                        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
                                            <span className="text-2xl font-black text-white">{categoria.nombre}</span>
                                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-zinc-900 transition group-hover:rotate-[-45deg]">
                                                <ArrowRight className="h-5 w-5" />
                                            </span>
                                        </div>
                                    </a>
                                </Aparecer>
                            ))}
                        </div>
                    </section>

                    {/* CÓMO PEDIR TU PROFORMA */}
                    <section className="relative overflow-hidden bg-zinc-900 px-4 py-16 text-white sm:px-6 sm:py-24">
                        <div className="mx-auto max-w-7xl">
                            <Aparecer>
                                <p className="text-sm font-black uppercase tracking-widest text-yellow-400">Así de fácil</p>
                                <h2 className="mt-2 max-w-2xl text-3xl font-black sm:text-5xl">
                                    Haz tu pedido en 3 pasos
                                </h2>
                            </Aparecer>

                            <ol className="mt-12 grid gap-6 md:grid-cols-3">
                                {pasos.map(({ icono: Icono, titulo, texto }, i) => (
                                    <li key={titulo}>
                                        <Aparecer retraso={i * 150} className="h-full">
                                            <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:border-yellow-400/50 hover:bg-white/10">
                                                <span className="absolute right-6 top-4 text-7xl font-black text-white/10">
                                                    {i + 1}
                                                </span>
                                                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-zinc-900">
                                                    <Icono className="h-7 w-7" />
                                                </span>
                                                <h3 className="mt-6 text-xl font-black">{titulo}</h3>
                                                <p className="mt-2 leading-7 text-zinc-400">{texto}</p>
                                            </div>
                                        </Aparecer>
                                    </li>
                                ))}
                            </ol>

                            <Aparecer retraso={300}>
                                <a
                                    href="/tienda"
                                    className={`group mt-10 inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-8 py-4 font-black text-zinc-900 hover:bg-yellow-300 ${foco} focus-visible:ring-offset-zinc-900`}
                                >
                                    Empezar a elegir productos
                                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                                </a>
                            </Aparecer>
                        </div>
                    </section>

                    {/* PRODUCTOS NUEVOS */}
                    <section id="tienda" className="bg-stone-100 px-4 py-16 sm:px-6 sm:py-24">
                        <div className="mx-auto max-w-7xl">
                            <Aparecer>
                                <p className="text-sm font-black uppercase tracking-widest text-yellow-600">Novedades</p>
                                <h2 className="mt-2 text-3xl font-black sm:text-5xl">Recién llegados</h2>
                                <p className="mt-3 text-zinc-600">Los productos que acabamos de incorporar a la tienda.</p>
                            </Aparecer>

                            <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                                {nuevosProductos.map((producto, i) => (
                                    <Aparecer key={producto.nombre} retraso={i * 120} className="h-full">
                                        <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                                            <span className="absolute left-4 top-4 z-10 rounded-full bg-zinc-900 px-3 py-1 text-xs font-black text-yellow-400">
                                                Nuevo
                                            </span>

                                            <div className="flex h-52 items-center justify-center bg-white sm:h-60">
                                                <img
                                                    src={producto.imagen}
                                                    alt={producto.nombre}
                                                    loading="lazy"
                                                    className="h-full w-full object-contain p-6"
                                                />
                                            </div>

                                            <div className="flex flex-1 flex-col border-t border-zinc-100 p-6">
                                                <h3 className="text-lg font-black sm:text-xl">{producto.nombre}</h3>
                                                <p className="mt-2 text-sm leading-6 text-zinc-600">{producto.descripcion}</p>

                                                <div className="mt-auto pt-6">
                                                    <a
                                                        href={enlaceWhatsApp(`Hola, deseo cotizar el producto: ${producto.nombre}`)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 font-bold text-yellow-400 hover:bg-zinc-700 ${foco}`}
                                                    >
                                                        Cotizar este producto
                                                    </a>
                                                </div>
                                            </div>
                                        </article>
                                    </Aparecer>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* MÁS VENDIDOS */}
                    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24">
                        <div className="mx-auto grid max-w-7xl items-start gap-10 md:grid-cols-[1fr_2fr]">
                            <Aparecer>
                                <p className="text-sm font-black uppercase tracking-widest text-yellow-600">Recomendados</p>
                                <h2 className="mt-2 text-3xl font-black sm:text-5xl">Lo más vendido</h2>
                                <p className="mt-5 leading-7 text-zinc-600">
                                    Los productos que más eligen nuestros clientes por su calidad y utilidad.
                                </p>
                                <a
                                    href="/tienda"
                                    className={`group mt-7 inline-flex items-center gap-2 border-b-4 border-yellow-400 pb-1 font-black hover:text-yellow-600 ${foco}`}
                                >
                                    Ver todos los productos
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </a>
                            </Aparecer>

                            <div className="grid min-w-0 gap-6 lg:grid-cols-2">
                                <Aparecer className="h-full">
                                    <CarruselProducto
                                        nombre="Foco LED de 3 tonos"
                                        descripcion="Luz cálida, fría y ámbar en un solo foco."
                                        imagenes={[
                                            '/productos/candelabros/foco3tonos.jpg',
                                            '/productos/candelabros/frio.jpg',
                                            '/productos/candelabros/ambar.jpg',
                                            '/productos/candelabros/calidoestrella.jpg',
                                        ]}
                                    />
                                </Aparecer>
                                <Aparecer retraso={120} className="h-full">
                                    <CarruselProducto
                                        nombre="Rollo de cinta LED RGB"
                                        descripcion="Luz de colores RGB, rollo de 100 metros con corte cada metro. Ideal para interiores."
                                        imagenes={[
                                            '/productos/carrusel2/cintaledrgb.avif',
                                            '/productos/carrusel2/cintaledrgb.jpg',
                                            '/productos/carrusel2/rgbled.jpg',
                                        ]}
                                    />
                                </Aparecer>
                            </div>
                        </div>
                    </section>
                </main>

                {/* PIE DE PÁGINA */}
                <footer id="contacto" className="bg-zinc-900 text-white">
                    <CintaSeguridad />
                    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="h-14 w-14 overflow-hidden rounded-full bg-yellow-400">
                                    <img
                                        src="/img/logoelectrico.jpg"
                                        alt="Logo Punto Electric"
                                        className="h-full w-full scale-125 object-cover"
                                    />
                                </div>
                                <p className="text-lg font-black sm:text-xl">
                                    PUNTO <span className="text-yellow-400">ELECTRIC</span>
                                </p>
                            </div>

                            <p className="mb-3 mt-5 font-bold">Síguenos</p>
                            <div className="flex items-center gap-2">
                                {[
                                    { href: 'https://www.facebook.com/share/18QVLnsBty/', img: '/img/redes/facebook.png', nombre: 'Facebook' },
                                    { href: 'https://www.tiktok.com/@punto_electric', img: '/img/redes/titok.png', nombre: 'TikTok' },
                                    { href: `https://wa.me/${WHATSAPP}`, img: '/img/redes/whatsapp.png', nombre: 'WhatsApp' },
                                ].map((red) => (
                                    <a
                                        key={red.nombre}
                                        href={red.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visitar ${red.nombre}`}
                                        className={`rounded-full bg-white p-2 transition hover:-translate-y-1 hover:bg-yellow-400 ${foco} focus-visible:ring-offset-zinc-900`}
                                    >
                                        <img src={red.img} alt="" className="h-7 w-7 object-contain" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-black text-yellow-400">Información</h3>
                            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                                <li><a href="#inicio" className="hover:text-white">Inicio</a></li>
                                <li><a href="/tienda" className="hover:text-white">Tienda</a></li>
                                <li><a href="/nosotros" target="_blank" rel="noopener noreferrer" className="hover:text-white">Acerca de nosotros</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-black text-yellow-400">Contáctanos</h3>
                            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                                <li>
                                    <a href="mailto:ventasgservices@gmail.com" className="break-all hover:text-white">
                                        ventasgservices@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+51935428871" className="hover:text-white">+51 935 428 871</a>
                                </li>
                                <li>Lima, Perú</li>
                            </ul>

                            <a
                                href={enlaceWhatsApp('Hola, quisiera hablar con un asesor.')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-yellow-400 px-5 py-2 font-bold text-yellow-400 hover:bg-yellow-400 hover:text-zinc-900 ${foco} focus-visible:ring-offset-zinc-900`}
                            >
                                <MessageCircle className="h-4 w-4" />
                                Hablar con un asesor
                            </a>
                        </div>
                    </div>

                    <div className="border-t border-zinc-800 px-6 py-5 pb-24 text-center text-sm text-zinc-500 md:pb-5">
                        © 2026 Punto Electric. Todos los derechos reservados.
                    </div>
                </footer>

                {/* BOTÓN FLOTANTE DE WHATSAPP */}
                <a
                    href={enlaceWhatsApp('Hola, vengo de la página web.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escríbenos por WhatsApp"
                    className={`fixed right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 shadow-lg transition hover:scale-110 hover:bg-green-700 ${foco}`}
                    style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
                >
                    <img src="/img/redes/whatsapp.png" alt="" className="h-8 w-8 object-contain" />
                </a>
            </div>
        </>
    );
}
