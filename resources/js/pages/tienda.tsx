import { Head } from '@inertiajs/react';
import { ArrowRight, ChevronLeft, ChevronRight, ImageOff, MapPin, Menu, MessageCircle, Search, ShoppingCart, SlidersHorizontal, Star, Wrench, X } from 'lucide-react';
import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent, type TouchEvent } from 'react';
import { clientes, marcasAliadas, type Aliado } from '@/data/aliados';
import { ambientes, productos, type Ambiente, type Estado, type Producto } from '@/data/productos';

const WHATSAPP = '51935428871';
const NOTA_PRECIOS = 'Precios en soles, sujetos a confirmación de stock.';
const soles = (m: number) => `S/ ${m.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const POR_PAGINA = 12;
const categorias = Array.from(new Set(productos.map((p) => p.categoria)));
const marcas = Array.from(new Set(productos.map((p) => p.marca)));
const wa = (t: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;

const menu = [
    { texto: 'Inicio', href: '/' },
    { texto: 'Tienda', href: '/tienda' },
    { texto: 'Acerca de nosotros', href: '/nosotros' },
    { texto: 'Contacto', href: '/#contacto' },
];

/* ---------- Piezas pequeñas ---------- */
function LogoAliado({ aliado, className = '' }: { aliado: Aliado; className?: string }) {
    const [fallo, setFallo] = useState(false);
    if (fallo) return <span className={`flex items-center justify-center text-lg font-black text-zinc-500 ${className}`}>{aliado.nombre}</span>;
    return <img src={aliado.logo} alt={aliado.nombre} loading="lazy" onError={() => setFallo(true)} className={`object-contain ${className}`} />;
}

function CintaLogos({ aliados }: { aliados: Aliado[] }) {
    return (
        <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <style>{`
                @keyframes desplazar-logos { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                .cinta-logos { animation: desplazar-logos 30s linear infinite; }
                .group:hover .cinta-logos { animation-play-state: paused; }
                @media (prefers-reduced-motion: reduce) { .cinta-logos { animation: none; flex-wrap: wrap; justify-content: center; } }
            `}</style>
            <div className="cinta-logos flex w-max items-center gap-14">
                {[...aliados, ...aliados].map((a, i) => (
                    <div key={i} aria-hidden={i >= aliados.length} className="flex h-14 w-36 shrink-0 items-center justify-center rounded-xl bg-white/95 px-3 py-2">
                        <LogoAliado aliado={a} className="h-full w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function ImagenProducto({ src, alt, className = '', estilo }: { src?: string; alt: string; className?: string; estilo?: CSSProperties }) {
    const [fallo, setFallo] = useState(false);
    useEffect(() => setFallo(false), [src]);
    if (!src || fallo)
        return (
            <div className={`flex flex-col items-center justify-center gap-1 text-zinc-400 ${className}`}>
                <ImageOff className="h-8 w-8" />
                <span className="text-xs font-bold">Imagen próximamente</span>
            </div>
        );
    return <img src={src} alt={alt} loading="lazy" onError={() => setFallo(true)} style={estilo} className={`object-contain ${className}`} />;
}

const estiloEstado: Record<Estado, string> = {
    Disponible: 'bg-green-500/15 text-green-400',
    'Pocas unidades': 'bg-yellow-400/15 text-yellow-300',
    Agotado: 'bg-red-500/15 text-red-400',
    Consultar: 'bg-white/10 text-zinc-300',
};

function InsigniaEstado({ estado }: { estado: Estado }) {
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${estiloEstado[estado]}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {estado === 'Consultar' ? 'Consultar stock' : estado}
        </span>
    );
}

function Estrellas({ valor, resenas, grande = false }: { valor?: number; resenas?: number; grande?: boolean }) {
    if (!valor || !resenas) return null;
    const tam = grande ? 'h-5 w-5' : 'h-4 w-4';
    return (
        <div className="flex items-center gap-1.5" aria-label={`${valor.toFixed(1)} de 5 estrellas, ${resenas} opiniones`}>
            <div className="flex" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className={`relative ${tam}`}>
                        <Star className={`absolute inset-0 ${tam} text-zinc-700`} />
                        <span className="absolute inset-0 overflow-hidden" style={{ width: `${Math.max(0, Math.min(1, valor - (n - 1))) * 100}%` }}>
                            <Star className={`${tam} fill-yellow-400 text-yellow-400`} />
                        </span>
                    </span>
                ))}
            </div>
            <span className={`font-bold text-zinc-200 ${grande ? 'text-sm' : 'text-xs'}`}>{valor.toFixed(1)}</span>
            <span className={`text-zinc-500 ${grande ? 'text-sm' : 'text-xs'}`}>({resenas})</span>
        </div>
    );
}

/* ---------- Banners (public/banners/) ---------- */
type Banner = {
    imagen: string;
    imagenCelular?: string;
    alt: string;
    accion: { categorias?: string[]; ambiente?: Ambiente; buscar?: string };
};

const banners: Banner[] = [
    { imagen: '/banners/banner-1.jpg', alt: 'Iluminación LED', accion: { categorias: ['Focos LED', 'Cintas LED', 'Candelabros LED', 'Plafones y apliques'] } },
    { imagen: '/banners/banner-2.jpg', alt: 'Protección eléctrica', accion: { categorias: ['Tableros eléctricos', 'Interruptores termomagnéticos'] } },
    { imagen: '/banners/banner-3.jpg', alt: 'Accesorios para tu instalación', accion: { categorias: ['Interruptores y tomacorrientes', 'Cajas de paso', 'Sockets', 'Accesorios'] } },
];

function BannerPromocional({ onAccion }: { onAccion: (b: Banner) => void }) {
    const [actual, setActual] = useState(0);
    const [pausado, setPausado] = useState(false);
    const total = banners.length;

    useEffect(() => {
        if (pausado || total < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const id = window.setInterval(() => setActual((i) => (i + 1) % total), 5500);
        return () => window.clearInterval(id);
    }, [pausado, total]);

    const ir = (paso: number) => setActual((i) => (i + paso + total) % total);
    const inicio = useRef<number | null>(null);
    const alTocar = (e: TouchEvent<HTMLElement>) => {
        inicio.current = e.touches[0].clientX;
        setPausado(true);
    };
    const alSoltar = (e: TouchEvent<HTMLElement>) => {
        if (inicio.current === null) return;
        const d = e.changedTouches[0].clientX - inicio.current;
        if (Math.abs(d) > 40) ir(d < 0 ? 1 : -1);
        inicio.current = null;
        setPausado(false);
    };
    if (total === 0) return null;

    return (
        <section
            className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6"
            aria-roledescription="carrusel"
            aria-label="Promociones"
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
            onTouchStart={alTocar}
            onTouchEnd={alSoltar}
        >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
                <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${actual * 100}%)` }}>
                    {banners.map((b, i) => (
                        <button
                            key={b.imagen}
                            type="button"
                            onClick={() => onAccion(b)}
                            tabIndex={i === actual ? 0 : -1}
                            aria-hidden={i !== actual}
                            aria-label={b.alt}
                            className="relative block aspect-[2/1] w-full shrink-0 overflow-hidden sm:aspect-[3/1]"
                        >
                            <img src={b.imagen} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl" />
                            <picture>
                                {b.imagenCelular && <source media="(max-width: 639px)" srcSet={b.imagenCelular} />}
                                <img src={b.imagen} alt={b.alt} className="relative block h-full w-full object-contain sm:object-cover sm:object-top" />
                            </picture>
                        </button>
                    ))}
                </div>
                {total > 1 && (
                    <>
                        {[-1, 1].map((d) => (
                            <button
                                key={d}
                                type="button"
                                onClick={() => ir(d)}
                                className={`absolute top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-yellow-400 hover:text-black sm:flex ${d < 0 ? 'left-4' : 'right-4'}`}
                                aria-label={d < 0 ? 'Promoción anterior' : 'Promoción siguiente'}
                            >
                                {d < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                            </button>
                        ))}
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                            {banners.map((b, i) => (
                                <button
                                    key={b.imagen}
                                    type="button"
                                    onClick={() => setActual(i)}
                                    className={`h-2 rounded-full transition-all ${i === actual ? 'w-7 bg-yellow-400' : 'w-2 bg-white/50'}`}
                                    aria-label={`Ver promoción ${i + 1}`}
                                    aria-current={i === actual}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

/* ---------- Tarjeta de servicio (después del 6.º producto) ---------- */
function TarjetaServicio() {
    const [sinFoto, setSinFoto] = useState(false);
    return (
        <article className="relative flex min-h-[26rem] flex-col overflow-hidden rounded-3xl border border-yellow-400/30 bg-zinc-900 text-white sm:col-span-2 xl:col-span-1">
            {sinFoto ? (
                <div className="absolute inset-0" aria-hidden="true">
                    <div className="absolute inset-x-0 top-0 h-3 bg-[repeating-linear-gradient(-45deg,#facc15_0_14px,#18181b_14px_28px)]" />
                    <Wrench className="absolute -right-6 top-10 h-48 w-48 rotate-12 text-white/5" />
                </div>
            ) : (
                <>
                    <img src="/img/servicio-instalacion.jpg" alt="" loading="lazy" onError={() => setSinFoto(true)} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
                </>
            )}
            <div className="relative mt-auto p-6">
                <p className="text-sm font-bold text-zinc-300">G-Services, servicio técnico</p>
                <h3 className="mt-2 text-3xl font-black leading-[0.95]">
                    <span className="block text-yellow-400">Instalación</span>
                    <span className="block">profesional</span>
                </h3>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 backdrop-blur">
                        <MapPin className="h-3.5 w-3.5 text-yellow-400" /> Lima
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 backdrop-blur">
                        <Wrench className="h-3.5 w-3.5 text-yellow-400" /> Mantenimiento preventivo
                    </span>
                </div>
                <a
                    href={wa('Hola, quisiera cotizar un servicio de instalación o mantenimiento.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-black text-black transition hover:bg-yellow-300"
                >
                    <MessageCircle className="h-5 w-5" /> Cotizar servicio
                </a>
                <a href="/nosotros" target="_blank" rel="noopener noreferrer" className="mt-2 block text-center text-sm font-bold text-zinc-300 underline-offset-4 hover:text-yellow-400 hover:underline">
                    Conoce G-Services
                </a>
            </div>
        </article>
    );
}

/* ---------- Carrusel de imágenes (con lupa opcional) ---------- */
function Carrusel({ imagenes, nombre, altura, miniaturas = false, lupa = false }: { imagenes: string[]; nombre: string; altura: string; miniaturas?: boolean; lupa?: boolean }) {
    const [actual, setActual] = useState(0);
    const [origen, setOrigen] = useState<string | null>(null);
    const varias = imagenes.length > 1;

    const moverLupa = (e: MouseEvent<HTMLDivElement>) => {
        if (!lupa) return;
        const r = e.currentTarget.getBoundingClientRect();
        setOrigen(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
    };
    const mover = (e: MouseEvent, paso: number) => {
        e.stopPropagation();
        setActual((i) => (i + paso + imagenes.length) % imagenes.length);
    };

    return (
        <div>
            <div className={`relative overflow-hidden bg-white ${altura}`}>
                <div className={`h-full w-full ${lupa ? 'cursor-zoom-in' : ''}`} onMouseMove={moverLupa} onMouseLeave={() => setOrigen(null)}>
                    <ImagenProducto
                        src={imagenes[actual]}
                        alt={`${nombre} - imagen ${actual + 1}`}
                        className={`h-full w-full p-5 transition-transform ease-out ${lupa ? (origen ? 'scale-[2.2] duration-100' : 'scale-100 duration-300') : 'duration-500 group-hover:scale-110'}`}
                        estilo={lupa && origen ? { transformOrigin: origen } : undefined}
                    />
                </div>
                {varias && (
                    <>
                        {[-1, 1].map((d) => (
                            <button
                                key={d}
                                type="button"
                                onClick={(e) => mover(e, d)}
                                className={`absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white hover:bg-black ${d < 0 ? 'left-2' : 'right-2'}`}
                                aria-label={d < 0 ? 'Imagen anterior' : 'Imagen siguiente'}
                            >
                                {d < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                            </button>
                        ))}
                        {!miniaturas && (
                            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                                {imagenes.map((_, i) => (
                                    <span key={i} className={`h-2 rounded-full transition-all ${i === actual ? 'w-6 bg-yellow-500' : 'w-2 bg-zinc-400'}`} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            {miniaturas && varias && (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                    {imagenes.map((img, i) => (
                        <button
                            key={img}
                            type="button"
                            onClick={() => setActual(i)}
                            className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white ${i === actual ? 'border-yellow-400' : 'border-transparent'}`}
                            aria-label={`Ver imagen ${i + 1}`}
                        >
                            <img src={img} alt="" className="h-full w-full object-contain p-1" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

type Carrito = Record<number, number>;

const campo = 'w-full rounded-xl border border-white/15 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-yellow-400';
const botonCantidad = 'px-3.5 py-2 text-lg font-black text-white hover:text-yellow-400';

export default function Tienda() {
    /* ---------- FILTROS ---------- */
    const [busqueda, setBusqueda] = useState('');
    const [categoriasSel, setCategoriasSel] = useState<string[]>([]);
    const [marcasSel, setMarcasSel] = useState<string[]>([]);
    const [ambientesSel, setAmbientesSel] = useState<string[]>([]);
    const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
    const [orden, setOrden] = useState('destacados');
    const [visibles, setVisibles] = useState(POR_PAGINA);
    const [soloDisponibles, setSoloDisponibles] = useState(false);

    const alternar = (lista: string[], v: string) => (lista.includes(v) ? lista.filter((x) => x !== v) : [...lista, v]);

    const limpiarFiltros = () => {
        setBusqueda('');
        setCategoriasSel([]);
        setMarcasSel([]);
        setAmbientesSel([]);
        setSoloDisponibles(false);
        window.history.replaceState(null, '', '/tienda');
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const ambiente = params.get('ambiente');
        if (ambiente && ambientes.includes(ambiente as Ambiente)) setAmbientesSel([ambiente]);
        const buscar = params.get('buscar');
        if (buscar) setBusqueda(buscar);
    }, []);

    const ambienteRecomendado = ambientesSel.length === 1 ? ambientesSel[0] : null;

    const resultados = useMemo(() => {
        const t = busqueda.trim().toLowerCase();
        const lista = productos.filter(
            (p) =>
                (t === '' || p.nombre.toLowerCase().includes(t) || p.marca.toLowerCase().includes(t) || p.codigo.toLowerCase().includes(t) || p.categoria.toLowerCase().includes(t)) &&
                (categoriasSel.length === 0 || categoriasSel.includes(p.categoria)) &&
                (marcasSel.length === 0 || marcasSel.includes(p.marca)) &&
                (!soloDisponibles || p.estado === 'Disponible' || p.estado === 'Pocas unidades') &&
                (ambientesSel.length === 0 || p.ambientes.some((a) => ambientesSel.includes(a))),
        );
        if (orden === 'nombre') lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
        if (orden === 'calificacion') lista.sort((a, b) => (b.calificacion ?? 0) - (a.calificacion ?? 0));
        if (orden === 'precio-menor') lista.sort((a, b) => a.precio - b.precio);
        if (orden === 'precio-mayor') lista.sort((a, b) => b.precio - a.precio);
        if (orden === 'nuevos') lista.sort((a, b) => b.id - a.id);
        if (orden === 'destacados') lista.sort((a, b) => Number(!!b.masVendido) - Number(!!a.masVendido) || Number(!!b.nuevo) - Number(!!a.nuevo));
        return lista;
    }, [busqueda, categoriasSel, marcasSel, ambientesSel, orden, soloDisponibles]);

    useEffect(() => {
        setVisibles(POR_PAGINA);
    }, [busqueda, categoriasSel, marcasSel, ambientesSel, orden, soloDisponibles]);

    const mostrados = resultados.slice(0, visibles);

    const filtrosActivos = [
        ...(busqueda.trim() ? [{ etiqueta: `"${busqueda.trim()}"`, quitar: () => setBusqueda('') }] : []),
        ...ambientesSel.map((a) => ({ etiqueta: a, quitar: () => setAmbientesSel((l) => l.filter((v) => v !== a)) })),
        ...categoriasSel.map((c) => ({ etiqueta: c, quitar: () => setCategoriasSel((l) => l.filter((v) => v !== c)) })),
        ...marcasSel.map((m) => ({ etiqueta: m, quitar: () => setMarcasSel((l) => l.filter((v) => v !== m)) })),
        ...(soloDisponibles ? [{ etiqueta: 'Solo disponibles', quitar: () => setSoloDisponibles(false) }] : []),
    ];

    /* ---------- CARRITO ---------- */
    const [carrito, setCarrito] = useState<Carrito>({});
    const [carritoCargado, setCarritoCargado] = useState(false);
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    const [nombreCliente, setNombreCliente] = useState('');

    useEffect(() => {
        try {
            const g = localStorage.getItem('carrito-punto-electric-v2');
            if (g) setCarrito(JSON.parse(g));
        } catch {
            /* carrito vacío */
        }
        setCarritoCargado(true);
    }, []);

    useEffect(() => {
        if (!carritoCargado) return;
        try {
            localStorage.setItem('carrito-punto-electric-v2', JSON.stringify(carrito));
        } catch {
            /* sin almacenamiento */
        }
    }, [carrito, carritoCargado]);

    const cambiarCantidad = (id: number, cantidad: number) =>
        setCarrito((actual) => {
            const nuevo = { ...actual };
            if (cantidad <= 0) delete nuevo[id];
            else nuevo[id] = cantidad;
            return nuevo;
        });

    const itemsCarrito = productos.filter((p) => carrito[p.id]).map((p) => ({ ...p, cantidad: carrito[p.id] }));
    const totalUnidades = itemsCarrito.reduce((s, i) => s + i.cantidad, 0);
    const totalSoles = itemsCarrito.reduce((s, i) => s + i.precio * i.cantidad, 0);

    const enviarPorWhatsApp = () => {
        const lista = itemsCarrito
            .map((i, n) => `${n + 1}. [${i.codigo}] ${i.nombre} (${i.marca})\n   ${i.cantidad} x ${soles(i.precio)} = ${soles(i.precio * i.cantidad)}`)
            .join('\n');
        const mensaje =
            `Hola Punto Electric, quisiera hacer el siguiente pedido:\n\n${lista}\n\n` +
            `Total de unidades: ${totalUnidades}\nTotal estimado: ${soles(totalSoles)}` +
            (nombreCliente.trim() ? `\nNombre: ${nombreCliente.trim()}` : '');
        window.open(wa(mensaje), '_blank', 'noopener,noreferrer');
    };

    /* ---------- DETALLE ---------- */
    const [productoSel, setProductoSel] = useState<Producto | null>(null);
    const [cantidadDetalle, setCantidadDetalle] = useState(1);
    const [agregado, setAgregado] = useState(false);

    const abrirDetalle = (p: Producto) => {
        setProductoSel(p);
        setCantidadDetalle(1);
        setAgregado(false);
    };

    const relacionados = productoSel
        ? productos
              .filter((p) => p.id !== productoSel.id)
              .map((p) => ({ p, puntos: (p.categoria === productoSel.categoria ? 2 : 0) + p.ambientes.filter((a) => productoSel.ambientes.includes(a)).length }))
              .filter((r) => r.puntos > 0)
              .sort((a, b) => b.puntos - a.puntos)
              .slice(0, 4)
              .map((r) => r.p)
        : [];

    const agregarDesdeDetalle = () => {
        if (!productoSel) return;
        cambiarCantidad(productoSel.id, (carrito[productoSel.id] ?? 0) + cantidadDetalle);
        setAgregado(true);
    };

    /* ---------- MENÚ ---------- */
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [compacto, setCompacto] = useState(false);
    const catalogoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const f = () => setCompacto(window.scrollY > 40);
        f();
        window.addEventListener('scroll', f, { passive: true });
        return () => window.removeEventListener('scroll', f);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuAbierto || carritoAbierto || productoSel ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuAbierto, carritoAbierto, productoSel]);

    useEffect(() => {
        const cerrar = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setProductoSel(null);
                setCarritoAbierto(false);
                setMenuAbierto(false);
            }
        };
        window.addEventListener('keydown', cerrar);
        return () => window.removeEventListener('keydown', cerrar);
    }, []);

    const irAlCatalogo = () => catalogoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const aplicarBanner = (b: Banner) => {
        setBusqueda(b.accion.buscar ?? '');
        setCategoriasSel(b.accion.categorias ?? []);
        setAmbientesSel(b.accion.ambiente ? [b.accion.ambiente] : []);
        setMarcasSel([]);
        irAlCatalogo();
    };

    const esNosotros = (href: string) => href === '/nosotros';

    return (
        <>
            <Head title="Tienda | Punto Electric" />

            <div
                className="min-h-screen text-zinc-100"
                style={{
                    backgroundColor: '#1c1c1f',
                    backgroundImage:
                        'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(250,204,21,0.14), transparent 70%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
                    backgroundSize: '100% 100%, 44px 44px, 44px 44px',
                    backgroundAttachment: 'fixed',
                }}
            >
                <div className="bg-yellow-400 px-4 py-2 text-center text-xs font-bold text-black sm:text-sm">Aprovecha un 10 % de descuento en tu primera compra</div>

                {/* MENÚ */}
                <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${compacto ? 'border-white/10 bg-zinc-900/80 backdrop-blur-md' : 'border-transparent bg-zinc-900/60 backdrop-blur-sm'}`}>
                    <div className={`mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 ${compacto ? 'py-2' : 'py-3 sm:py-4'}`}>
                        <a href="/" className="flex shrink-0 items-center gap-3">
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
                                    aria-current={item.href === '/tienda' ? 'page' : undefined}
                                    className={`rounded-full px-4 py-2 font-semibold transition ${item.href === '/tienda' ? 'bg-yellow-400 text-black' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
                                >
                                    {item.texto}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setCarritoAbierto(true)}
                                className="relative flex h-11 items-center gap-2 rounded-full bg-yellow-400 px-4 font-bold text-black transition hover:bg-yellow-300"
                                aria-label={`Abrir carrito, ${totalUnidades} productos`}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="hidden sm:inline">Carrito</span>
                                {totalUnidades > 0 && (
                                    <span className="absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-black text-black ring-2 ring-black">{totalUnidades}</span>
                                )}
                            </button>
                            <button type="button" onClick={() => setMenuAbierto(true)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 lg:hidden" aria-label="Abrir menú" aria-expanded={menuAbierto}>
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
                        <button type="button" onClick={() => setMenuAbierto(false)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Cerrar menú">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="mt-6 flex flex-col px-4">
                        {menu.map((item, i) => (
                            <a
                                key={item.texto}
                                href={item.href}
                                target={esNosotros(item.href) ? '_blank' : undefined}
                                rel={esNosotros(item.href) ? 'noopener noreferrer' : undefined}
                                onClick={() => setMenuAbierto(false)}
                                style={{ transitionDelay: menuAbierto ? `${80 + i * 50}ms` : '0ms' }}
                                className={`flex items-center justify-between border-b border-white/10 py-4 text-2xl font-black transition-all duration-300 hover:text-yellow-400 ${menuAbierto ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'} ${item.href === '/tienda' ? 'text-yellow-400' : ''}`}
                            >
                                {item.texto}
                                <ArrowRight className="h-5 w-5 text-yellow-400" />
                            </a>
                        ))}
                    </nav>
                    <div className="mt-auto p-4">
                        <a href={wa('Hola, vengo de la tienda web.')} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 font-bold">
                            <MessageCircle className="h-5 w-5" /> Escríbenos por WhatsApp
                        </a>
                    </div>
                </div>

                <main>
                    <BannerPromocional onAccion={aplicarBanner} />

                    {marcasAliadas.length > 0 && (
                        <section className="py-8">
                            <p className="mb-4 text-center text-sm font-bold text-zinc-500">Marcas que distribuimos</p>
                            <CintaLogos aliados={marcasAliadas} />
                        </section>
                    )}

                    <section className="mx-auto max-w-[1440px] px-4 pb-14 pt-4 sm:px-6">
                        <div ref={catalogoRef} className="scroll-mt-24" />

                        {/* Título + buscador */}
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="text-3xl font-black sm:text-4xl">
                                    Catálogo <span className="text-yellow-400">Punto Electric</span>
                                </h1>
                                <p className="mt-1 text-sm text-zinc-400">
                                    {resultados.length} {resultados.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                                </p>
                            </div>
                            <div className="relative w-full md:max-w-md">
                                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                                <input
                                    id="buscar"
                                    type="search"
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    placeholder="Busca por nombre, marca o código"
                                    aria-label="Buscar producto"
                                    className="w-full rounded-full border border-white/15 bg-zinc-900 py-3 pl-12 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-yellow-400"
                                />
                            </div>
                        </div>

                        {/* Categorías en fila deslizable */}
                        <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
                            <button
                                type="button"
                                onClick={() => setCategoriasSel([])}
                                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${categoriasSel.length === 0 ? 'border-yellow-400 bg-yellow-400 text-black' : 'border-white/15 text-zinc-300 hover:border-yellow-400'}`}
                            >
                                Todo
                            </button>
                            {categorias.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setCategoriasSel((l) => alternar(l, c))}
                                    aria-pressed={categoriasSel.includes(c)}
                                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${categoriasSel.includes(c) ? 'border-yellow-400 bg-yellow-400 text-black' : 'border-white/15 text-zinc-300 hover:border-yellow-400'}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
                            aria-expanded={filtrosAbiertos}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 font-bold lg:hidden"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            {filtrosAbiertos ? 'Ocultar filtros' : 'Más filtros'}
                        </button>

                        <div className="mt-6 grid gap-8 lg:grid-cols-[250px_1fr]">
                            {/* FILTROS */}
                            <aside className={`${filtrosAbiertos ? 'block' : 'hidden'} h-fit rounded-3xl border border-white/10 bg-zinc-950 p-5 lg:sticky lg:top-24 lg:block`}>
                                <h2 className="text-lg font-black">Filtros</h2>

                                <fieldset className="mt-5">
                                    <legend className="text-sm font-black text-yellow-400">Ambiente</legend>
                                    <div className="mt-3 space-y-2">
                                        {ambientes.map((a) => (
                                            <label key={a} className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
                                                <input type="checkbox" checked={ambientesSel.includes(a)} onChange={() => setAmbientesSel((l) => alternar(l, a))} className="h-4 w-4 accent-yellow-400" />
                                                <span className="flex-1">{a}</span>
                                                <span className="text-xs text-zinc-500">{productos.filter((p) => p.ambientes.includes(a)).length}</span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>

                                <fieldset className="mt-6">
                                    <legend className="text-sm font-black text-yellow-400">Marca</legend>
                                    <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-2">
                                        {marcas.map((m) => (
                                            <label key={m} className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
                                                <input type="checkbox" checked={marcasSel.includes(m)} onChange={() => setMarcasSel((l) => alternar(l, m))} className="h-4 w-4 accent-yellow-400" />
                                                <span>{m}</span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>

                                <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl bg-zinc-900 p-3 text-sm font-bold">
                                    <input type="checkbox" checked={soloDisponibles} onChange={(e) => setSoloDisponibles(e.target.checked)} className="h-4 w-4 accent-yellow-400" />
                                    Solo disponibles
                                </label>

                                <button type="button" onClick={limpiarFiltros} className="mt-6 w-full rounded-xl border border-white/20 px-4 py-2.5 text-sm font-bold transition hover:border-yellow-400 hover:text-yellow-400">
                                    Limpiar filtros
                                </button>
                            </aside>

                            {/* PRODUCTOS */}
                            <div>
                                {ambienteRecomendado && (
                                    <div className="mb-5 flex flex-col gap-3 rounded-3xl border border-yellow-400/30 bg-zinc-950 p-5 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-xl font-black text-yellow-400">Recomendados para {ambienteRecomendado.toLowerCase()}</p>
                                            <p className="mt-1 text-sm text-zinc-400">
                                                {ambienteRecomendado === 'Exteriores' && 'Productos para jardines, fachadas, cocheras y zonas expuestas a la intemperie.'}
                                                {ambienteRecomendado === 'Interiores' && 'Productos para salas, dormitorios, cocinas y ambientes dentro de casa.'}
                                                {ambienteRecomendado === 'Comercial' && 'Productos para tiendas, oficinas, almacenes y locales comerciales.'}
                                            </p>
                                        </div>
                                        <button type="button" onClick={limpiarFiltros} className="shrink-0 rounded-xl border border-yellow-400 px-4 py-2 text-sm font-bold text-yellow-400 hover:bg-yellow-400 hover:text-black">
                                            Ver todo el catálogo
                                        </button>
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {filtrosActivos.map((f) => (
                                            <button key={f.etiqueta} type="button" onClick={f.quitar} className="flex items-center gap-2 rounded-full bg-yellow-400/15 px-3 py-1.5 text-sm font-bold text-yellow-300 hover:bg-yellow-400/30" aria-label={`Quitar filtro ${f.etiqueta}`}>
                                                {f.etiqueta} <span aria-hidden="true">×</span>
                                            </button>
                                        ))}
                                        {filtrosActivos.length > 1 && (
                                            <button type="button" onClick={limpiarFiltros} className="text-sm text-zinc-500 underline hover:text-zinc-300">
                                                Quitar todos
                                            </button>
                                        )}
                                    </div>
                                    <label className="ml-auto flex items-center gap-2 text-sm">
                                        <span className="font-bold text-zinc-400">Ordenar</span>
                                        <select value={orden} onChange={(e) => setOrden(e.target.value)} className="rounded-xl border border-white/15 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-yellow-400">
                                            <option value="destacados">Destacados</option>
                                            <option value="nuevos">Más recientes</option>
                                            <option value="precio-menor">Precio: menor a mayor</option>
                                            <option value="precio-mayor">Precio: mayor a menor</option>
                                            <option value="calificacion">Mejor calificados</option>
                                            <option value="nombre">Nombre A-Z</option>
                                        </select>
                                    </label>
                                </div>

                                {resultados.length === 0 ? (
                                    <div className="mt-6 rounded-3xl border border-dashed border-white/20 p-10 text-center">
                                        <p className="font-black">Ningún producto coincide con los filtros.</p>
                                        <button type="button" onClick={limpiarFiltros} className="mt-4 rounded-xl bg-yellow-400 px-5 py-2 font-bold text-black">
                                            Limpiar filtros
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                        {mostrados.map((p, indice) => (
                                            <Fragment key={p.id}>
                                                <article
                                                    onClick={() => abrirDetalle(p)}
                                                    className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-[0_10px_40px_-10px_rgba(250,204,21,0.35)]"
                                                >
                                                    {(p.nuevo || p.masVendido) && (
                                                        <div className="absolute left-3 top-3 z-10 flex gap-2">
                                                            {p.masVendido && <span className="rounded-md bg-black px-2.5 py-1 text-xs font-black text-yellow-400">Más vendido</span>}
                                                            {p.nuevo && <span className="rounded-md bg-yellow-400 px-2.5 py-1 text-xs font-black text-black">Nuevo</span>}
                                                        </div>
                                                    )}
                                                    <Carrusel imagenes={p.imagenes} nombre={p.nombre} altura="h-56" />

                                                    <div className="flex flex-1 flex-col p-5">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <p className="text-xs font-bold text-yellow-400">{p.marca}</p>
                                                            <p className="text-xs font-semibold text-zinc-500">{p.codigo}</p>
                                                        </div>
                                                        <h3 className="mt-1 text-lg font-black leading-snug">{p.nombre}</h3>
                                                        <div className="mt-1.5">
                                                            <Estrellas valor={p.calificacion} resenas={p.resenas} />
                                                        </div>
                                                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                                                            <p className="text-2xl font-black text-white">{soles(p.precio)}</p>
                                                            <InsigniaEstado estado={p.estado} />
                                                        </div>
                                                        <div className="mt-auto flex items-center justify-between pt-5">
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    abrirDetalle(p);
                                                                }}
                                                                className="rounded-xl bg-yellow-400 px-5 py-2.5 font-bold text-black transition hover:bg-yellow-300"
                                                            >
                                                                Ver producto
                                                            </button>
                                                            {carrito[p.id] && <span className="text-sm font-bold text-green-400">✓ {carrito[p.id]} en carrito</span>}
                                                        </div>
                                                    </div>
                                                </article>
                                                {indice === 5 && <TarjetaServicio />}
                                            </Fragment>
                                        ))}
                                    </div>
                                )}

                                {resultados.length > mostrados.length && (
                                    <div className="mt-10 text-center">
                                        <p className="text-sm text-zinc-500">
                                            Mostrando {mostrados.length} de {resultados.length} productos
                                        </p>
                                        <button type="button" onClick={() => setVisibles((v) => v + POR_PAGINA)} className="mt-3 rounded-xl border border-yellow-400 px-8 py-3 font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black">
                                            Cargar más productos
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {clientes.length > 0 && (
                        <section className="border-t border-white/10 bg-zinc-950 px-4 py-16 sm:px-6">
                            <div className="mx-auto max-w-[1440px]">
                                <div className="text-center">
                                    <p className="text-sm font-bold text-yellow-400">Confían en nosotros</p>
                                    <h2 className="mt-2 text-3xl font-black sm:text-4xl">Empresas que hemos asesorado</h2>
                                </div>
                                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                                    {clientes.map((c) => (
                                        <div key={c.nombre} className="flex h-24 items-center justify-center rounded-2xl bg-white p-5 transition hover:-translate-y-1">
                                            <LogoAliado aliado={c} className="h-full w-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                {/* BOTÓN FLOTANTE DEL CARRITO */}
                {totalUnidades > 0 && !carritoAbierto && !productoSel && (
                    <button
                        type="button"
                        onClick={() => setCarritoAbierto(true)}
                        className="fixed left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full bg-yellow-400 px-6 py-3 font-bold text-black shadow-xl"
                        style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
                    >
                        Ver carrito ({totalUnidades}) · {soles(totalSoles)}
                    </button>
                )}

                {/* DETALLE DEL PRODUCTO */}
                {productoSel && (
                    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setProductoSel(null)} aria-hidden="true" />
                        <div role="dialog" aria-label={productoSel.nombre} className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-3xl border border-white/10 bg-zinc-950 shadow-2xl sm:rounded-3xl">
                            <button type="button" onClick={() => setProductoSel(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl font-black hover:bg-yellow-400 hover:text-black" aria-label="Cerrar">
                                ×
                            </button>

                            <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-2 md:gap-10">
                                <Carrusel key={productoSel.id} imagenes={productoSel.imagenes} nombre={productoSel.nombre} altura="h-72 sm:h-96 rounded-2xl overflow-hidden" miniaturas lupa />

                                <div className="flex flex-col">
                                    <p className="text-sm font-bold text-yellow-400">
                                        {productoSel.categoria} | {productoSel.marca} | Cód. {productoSel.codigo}
                                    </p>
                                    <h2 className="mt-2 pr-10 text-2xl font-black sm:text-3xl">{productoSel.nombre}</h2>
                                    <div className="mt-2">
                                        <Estrellas valor={productoSel.calificacion} resenas={productoSel.resenas} grande />
                                    </div>
                                    <p className="mt-4 leading-7 text-zinc-400">{productoSel.descripcion}</p>

                                    <div className="mt-4 flex flex-wrap items-center gap-3">
                                        <p className="text-4xl font-black">{soles(productoSel.precio)}</p>
                                        <InsigniaEstado estado={productoSel.estado} />
                                    </div>
                                    <p className="mt-1 text-xs text-zinc-500">Precio por unidad. {NOTA_PRECIOS}</p>

                                    {productoSel.estado === 'Agotado' && (
                                        <p className="mt-4 rounded-xl bg-yellow-400/10 p-3 text-sm text-yellow-200">
                                            Este producto está agotado por ahora. Agrégalo a tu pedido y te avisamos la fecha de reposición.
                                        </p>
                                    )}

                                    <div className="mt-auto pt-6">
                                        <p className="text-sm font-bold">Cantidad</p>
                                        <div className="mt-2 flex items-center gap-3">
                                            <div className="flex items-center rounded-xl border border-white/20">
                                                <button type="button" onClick={() => setCantidadDetalle((c) => Math.max(1, c - 1))} className={botonCantidad} aria-label="Disminuir cantidad">−</button>
                                                <span className="w-10 text-center text-lg font-black">{cantidadDetalle}</span>
                                                <button type="button" onClick={() => setCantidadDetalle((c) => c + 1)} className={botonCantidad} aria-label="Aumentar cantidad">+</button>
                                            </div>
                                            <p className="text-sm text-zinc-400">
                                                Subtotal: <span className="font-black text-white">{soles(productoSel.precio * cantidadDetalle)}</span>
                                            </p>
                                        </div>

                                        <button type="button" onClick={agregarDesdeDetalle} className="mt-5 w-full rounded-xl bg-yellow-400 px-5 py-3.5 text-lg font-black text-black transition hover:bg-yellow-300">
                                            Agregar al carrito
                                        </button>

                                        {agregado && (
                                            <div className="mt-4 rounded-xl border border-green-500/50 bg-green-500/10 p-4">
                                                <p className="font-bold text-green-400">✓ Agregado. Tienes {carrito[productoSel.id] ?? 0} en tu carrito.</p>
                                                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                                                    <button type="button" onClick={() => setProductoSel(null)} className="flex-1 rounded-xl border border-white/25 px-4 py-2 font-bold">
                                                        Seguir comprando
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setProductoSel(null);
                                                            setCarritoAbierto(true);
                                                        }}
                                                        className="flex-1 rounded-xl bg-green-600 px-4 py-2 font-bold text-white"
                                                    >
                                                        Ver carrito
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {relacionados.length > 0 && (
                                <div className="border-t border-white/10 p-5 sm:p-8">
                                    <h3 className="text-lg font-black">También te puede interesar</h3>
                                    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                                        {relacionados.map((r) => (
                                            <button key={r.id} type="button" onClick={() => abrirDetalle(r)} className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 text-left transition hover:border-yellow-400">
                                                <ImagenProducto src={r.imagenes[0]} alt={r.nombre} className="h-28 w-full bg-white p-2" />
                                                <p className="p-3 text-sm font-bold leading-5">{r.nombre}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* PANEL DEL CARRITO */}
                {carritoAbierto && (
                    <div className="fixed inset-0 z-50">
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setCarritoAbierto(false)} aria-hidden="true" />
                        <aside role="dialog" aria-label="Carrito de compras" className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-zinc-950 shadow-2xl">
                            <div className="flex items-center justify-between border-b border-white/10 p-5">
                                <h2 className="text-xl font-black">Tu carrito</h2>
                                <button type="button" onClick={() => setCarritoAbierto(false)} className="rounded-lg px-3 py-1 text-2xl font-black hover:bg-white/10" aria-label="Cerrar carrito">×</button>
                            </div>

                            {itemsCarrito.length === 0 ? (
                                <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                                    <p className="font-black">Tu carrito está vacío.</p>
                                    <p className="mt-2 text-sm text-zinc-400">Agrega productos del catálogo para armar tu pedido.</p>
                                    <button type="button" onClick={() => setCarritoAbierto(false)} className="mt-5 rounded-xl bg-yellow-400 px-5 py-2 font-bold text-black">Ver productos</button>
                                </div>
                            ) : (
                                <>
                                    <ul className="flex-1 divide-y divide-white/10 overflow-y-auto px-5">
                                        {itemsCarrito.map((i) => (
                                            <li key={i.id} className="flex gap-4 py-4">
                                                <ImagenProducto src={i.imagenes[0]} alt="" className="h-16 w-16 shrink-0 rounded-lg bg-white p-1 [&_span]:hidden" />
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-black leading-5">{i.nombre}</p>
                                                    <p className="text-xs text-zinc-500">{i.marca} · {i.codigo}</p>
                                                    <p className="mt-1 text-sm">
                                                        <span className="text-zinc-500">{soles(i.precio)} c/u · </span>
                                                        <span className="font-black">{soles(i.precio * i.cantidad)}</span>
                                                    </p>
                                                    <div className="mt-2 flex items-center gap-3">
                                                        <div className="flex items-center rounded-lg border border-white/20">
                                                            <button type="button" onClick={() => cambiarCantidad(i.id, i.cantidad - 1)} className="px-3 py-1 font-black hover:text-yellow-400" aria-label="Quitar uno">−</button>
                                                            <span className="w-8 text-center font-bold">{i.cantidad}</span>
                                                            <button type="button" onClick={() => cambiarCantidad(i.id, i.cantidad + 1)} className="px-3 py-1 font-black hover:text-yellow-400" aria-label="Agregar uno">+</button>
                                                        </div>
                                                        <button type="button" onClick={() => cambiarCantidad(i.id, 0)} className="text-sm text-red-400 underline">Eliminar</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="border-t border-white/10 p-5">
                                        <label htmlFor="nombre" className="text-sm font-bold">Tu nombre (opcional)</label>
                                        <input id="nombre" type="text" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} placeholder="Ej. Juan Pérez" className={`mt-2 ${campo}`} />

                                        <div className="mt-4 rounded-xl bg-zinc-900 p-4">
                                            <p className="text-sm text-zinc-400">Total estimado · {totalUnidades} {totalUnidades === 1 ? 'unidad' : 'unidades'}</p>
                                            <p className="text-3xl font-black text-yellow-400">{soles(totalSoles)}</p>
                                        </div>
                                        <p className="mt-2 text-xs text-zinc-500">{NOTA_PRECIOS} Te confirmamos el pedido por WhatsApp.</p>

                                        <button type="button" onClick={enviarPorWhatsApp} className="mt-4 w-full rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-500">
                                            Enviar pedido por WhatsApp
                                        </button>
                                        <button type="button" onClick={() => setCarrito({})} className="mt-3 w-full text-sm text-zinc-500 underline hover:text-zinc-300">
                                            Vaciar carrito
                                        </button>
                                    </div>
                                </>
                            )}
                        </aside>
                    </div>
                )}

                {/* PIE DE PÁGINA */}
                <footer id="contacto" className="border-t border-white/10 bg-zinc-950 text-white">
                    <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 md:grid-cols-3">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="h-14 w-14 overflow-hidden rounded-full bg-yellow-400">
                                    <img src="/img/logoelectrico.jpg" alt="Logo Punto Electric" className="h-full w-full scale-125 object-cover" />
                                </div>
                                <h2 className="text-xl font-black">PUNTO <span className="text-yellow-400">ELECTRIC</span></h2>
                            </div>
                            <p className="mb-4 mt-5 font-bold">Síguenos en nuestras redes sociales</p>
                            <div className="flex items-center gap-3">
                                {[
                                    { href: 'https://www.facebook.com/share/18QVLnsBty/', img: '/img/redes/facebook.png', nombre: 'Facebook' },
                                    { href: 'https://www.tiktok.com/@punto_electric', img: '/img/redes/titok.png', nombre: 'TikTok' },
                                    { href: `https://wa.me/${WHATSAPP}`, img: '/img/redes/whatsapp.png', nombre: 'WhatsApp' },
                                ].map((r) => (
                                    <a key={r.nombre} href={r.href} target="_blank" rel="noopener noreferrer" aria-label={`Visitar ${r.nombre}`} className="rounded-full bg-white p-2 transition hover:-translate-y-1 hover:scale-110">
                                        <img src={r.img} alt={r.nombre} className="h-8 w-8 object-contain" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-black text-yellow-400">Información</h3>
                            <div className="mt-4 space-y-2 text-sm text-zinc-300">
                                <a href="/inicio" className="block hover:text-yellow-400">Inicio</a>
                                <a href="/nosotros" target="_blank" rel="noopener noreferrer" className="block hover:text-yellow-400">Acerca de nosotros</a>
                                <p>Preguntas frecuentes</p>
                                <p>Política de privacidad</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-black text-yellow-400">Contáctanos</h3>
                            <div className="mt-4 space-y-2 text-sm text-zinc-300">
                                <p className="break-all">Correo: ventasgservices@gmail.com</p>
                                <p>Teléfono: +51 935 428 871</p>
                                <p>Lima, Perú</p>
                            </div>
                            <a href={wa('Hola, deseo recibir información sobre sus productos')} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-xl border border-yellow-400 px-5 py-2 font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black">
                                Contactar con asesor
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-white/10 px-6 py-5 pb-24 text-center text-sm text-zinc-500 sm:pb-5">© 2026 Punto Electric. Todos los derechos reservados por el autor.</div>
                </footer>
            </div>
        </>
    );
}