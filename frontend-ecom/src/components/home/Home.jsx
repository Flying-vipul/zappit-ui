import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import { fetchProducts } from "../../store/actions";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import { FaExclamationTriangle, FaLock, FaBolt, FaStar, FaUsers, FaBoxOpen } from "react-icons/fa";
import { MdLocalOffer, MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

// ── Feature highlights ──
const features = [
    {
        icon: <FaLock size={22} className="text-indigo-500" />,
        title: "ISI Certified Quality",
        desc: "All steel products meet BIS/ISI standards. Guaranteed durability.",
        gradient: "from-indigo-500 to-blue-500",
        bg: "bg-indigo-50 dark:bg-indigo-950/40",
        ring: "ring-indigo-100 dark:ring-indigo-900/40",
    },
    {
        icon: <FaBoxOpen size={22} className="text-emerald-500" />,
        title: "Bulk Order Friendly",
        desc: "Special pricing for bulk orders. Perfect for families & businesses.",
        gradient: "from-emerald-500 to-green-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        ring: "ring-emerald-100 dark:ring-emerald-900/40",
    },
    {
        icon: <FaBolt size={22} className="text-amber-500" />,
        title: "Long Lasting Products",
        desc: "Heavy-gauge stainless steel built to last for decades.",
        gradient: "from-amber-500 to-orange-500",
        bg: "bg-amber-50 dark:bg-amber-950/40",
        ring: "ring-amber-100 dark:ring-amber-900/40",
    },
    {
        icon: <FaStar size={22} className="text-violet-500" />,
        title: "Direct Factory Price",
        desc: "No middlemen. Best prices straight from the manufacturer.",
        gradient: "from-violet-500 to-purple-500",
        bg: "bg-violet-50 dark:bg-violet-950/40",
        ring: "ring-violet-100 dark:ring-violet-900/40",
    },
];

// ── Stats ──
const stats = [
    { icon: <FaUsers size={22} />, value: "5,000+", label: "Happy Customers" },
    { icon: <FaBoxOpen size={22} />, value: "500+", label: "Products" },
    { icon: <FaStar size={22} />, value: "4.8★", label: "Average Rating" },
    { icon: <MdVerified size={22} />, value: "ISI", label: "Certified" },
];

// ── Product Categories (text-based) ──
const brands = [
    { name: "COOKWARE", emoji: "🍳", color: "text-red-600 dark:text-red-400" },
    { name: "DINNER SET", emoji: "🍽️", color: "text-amber-700 dark:text-amber-300" },
    { name: "STORAGE JARS", emoji: "🏺", color: "text-yellow-600 dark:text-yellow-400" },
    { name: "TIFFIN BOX", emoji: "📦", color: "text-green-600 dark:text-green-400" },
    { name: "WATER BOTTLE", emoji: "🫙", color: "text-blue-600 dark:text-blue-400" },
    { name: "KADAI & PAN", emoji: "🥘", color: "text-indigo-600 dark:text-indigo-400" },
    { name: "PRESSURE COOKER", emoji: "♨️", color: "text-orange-600 dark:text-orange-400" },
    { name: "BUCKET & MUG", emoji: "🪣", color: "text-rose-600 dark:text-rose-400" },
    { name: "SERVING BOWL", emoji: "🫕", color: "text-teal-600 dark:text-teal-400" },
    { name: "FLASK", emoji: "🌡️", color: "text-purple-600 dark:text-purple-400" },
    { name: "SPICE RACK", emoji: "🧂", color: "text-cyan-600 dark:text-cyan-400" },
    { name: "STEEL GLASS", emoji: "🥛", color: "text-slate-600 dark:text-slate-400" },
];

const Home = () => {
    const dispatch = useDispatch();
    const { isLoading, errorMessage } = useSelector((state) => state.errors || {});
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Double the brands array for seamless infinite scroll
    const marqueeItems = [...brands, ...brands];

    return (
        <div className="overflow-hidden">
            {/* ── Hero ── */}
            <div className="lg:px-14 sm:px-8 px-4 py-6">
                <HeroBanner />
            </div>

            {/* ── Feature Strip ── */}
            <div className="bg-slate-50/80 dark:bg-[#0e0e24] border-y border-slate-100 dark:border-gray-800 py-12 lg:px-14 sm:px-8 px-6 transition-colors duration-300">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map(({ icon, title, desc, gradient, bg, ring }, i) => (
                        <div
                            key={title}
                            className={`group flex items-start gap-4 bg-white dark:bg-gray-900/50 rounded-2xl p-5 border border-slate-100 dark:border-gray-800 ring-1 ${ring} hover:-translate-y-1 cursor-default transition-all duration-300 shadow-sm hover:shadow-lg animate-fade-in-up`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className={`shrink-0 ${bg} rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                {icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-gray-100 text-sm">{title}</h3>
                                <p className="text-slate-500 dark:text-gray-400 text-xs mt-1 leading-relaxed">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ══════════════════════════════════════════════
                ── BRAND MARQUEE (AUTO-SCROLLING) ──
            ══════════════════════════════════════════════ */}
            <div className="py-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="text-center mb-6">
                    <p className="text-xs font-black tracking-[0.3em] text-slate-400 dark:text-slate-500 uppercase">
                        Top Brands We Carry
                    </p>
                </div>

                {/* Marquee track */}
                <div className="relative">
                    {/* Left fade gradient */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10" />
                    {/* Right fade gradient */}
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10" />

                    <div
                        className="flex gap-0"
                        style={{
                            animation: 'marquee 32s linear infinite',
                        }}
                    >
                        {marqueeItems.map(({ name, emoji, color }, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 flex items-center gap-3 mx-6 px-6 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-300 group cursor-default"
                            >
                                <span className="text-xl">{emoji}</span>
                                <span className={`text-sm font-black tracking-widest ${color} whitespace-nowrap`}>
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Keyframe injection via style tag */}
                <style>{`
                    @keyframes marquee {
                        0%   { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                `}</style>
            </div>

            {/* ── Featured Products ── */}
            <div className="lg:px-14 sm:px-8 px-6 py-16">
                {/* Section header */}
                <div className="flex flex-col items-center text-center mb-12 space-y-3 animate-fade-in-up">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-800/40">
                        <FaBolt size={10} />
                        Handpicked for you
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold gradient-text">
                        Featured Products
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 max-w-md text-sm">
                        Discover our top-rated items curated just for you. Quality guaranteed.
                    </p>
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                        {Array(4).fill(null).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : errorMessage ? (
                    <div className="flex justify-center items-center h-40">
                        <FaExclamationTriangle className="text-slate-400 text-3xl mr-2" />
                        <span className="text-slate-500 text-lg font-medium">{errorMessage}</span>
                    </div>
                ) : (
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                        {products?.slice(0, 4).map((item, i) => (
                            <div key={item.productId} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.12}s` }}>
                                <ProductCard {...item} />
                            </div>
                        ))}
                    </div>
                )}

                {/* View All button */}
                {!isLoading && !errorMessage && (
                    <div className="flex justify-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <Link to="/products">
                            <button className="btn-zappit-outline flex items-center gap-2 px-8 py-3 text-sm group">
                                View All Products
                                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            {/* ── Why Zappit Section ── */}
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 lg:px-14 sm:px-8 px-6">
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                        Why <span className="text-amber-400">Zappit</span>?
                    </h2>
                    <p className="text-slate-400 text-sm max-w-md mx-auto">
                        Trusted by thousands. We deliver excellence with every order.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map(({ icon, value, label }, i) => (
                        <div key={label}
                            className="glass rounded-2xl p-6 text-center hover-lift transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${i * 0.12}s` }}>
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 mb-4">
                                {icon}
                            </div>
                            <div className="text-3xl font-extrabold text-white mb-1">{value}</div>
                            <div className="text-slate-400 text-sm">{label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Promo Banner ── */}
            <div className="lg:mx-14 sm:mx-8 mx-6 my-16 rounded-2xl overflow-hidden relative">
                {/* Animated gradient BG */}
                <div className="absolute inset-0 animated-gradient opacity-90" />
                <div className="absolute inset-0 bg-black/10" />

                {/* Floating decorations */}
                <div className="absolute top-6 right-10 w-24 h-24 bg-white/5 rounded-full blur-xl animate-float" />
                <div className="absolute bottom-6 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />

                <div className="relative px-10 py-14 flex flex-col sm:flex-row items-center justify-between gap-6 z-10">
                    <div className="text-white space-y-3">
                        <div className="flex items-center gap-2">
                            <MdLocalOffer size={20} className="text-amber-300" />
                            <span className="text-amber-300 font-semibold text-sm uppercase tracking-wide">
                                Limited Time Offer
                            </span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-extrabold leading-snug">
                            Up to <span className="text-amber-300">50% OFF</span><br />
                            on select items
                        </h3>
                        <p className="text-white/70 text-sm">
                            Don't miss out — deals expire at the end of the month!
                        </p>
                    </div>
                    <Link to="/products">
                        <button className="shrink-0 bg-white text-indigo-700 font-bold px-8 py-3.5 rounded-xl
                            hover:bg-amber-300 hover:text-slate-900 transition-all duration-300 shadow-xl
                            hover:shadow-2xl hover:-translate-y-1 group">
                            Shop the Sale
                            <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;