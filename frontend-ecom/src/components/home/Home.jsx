import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import { fetchProducts } from "../../store/actions";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import { FaExclamationTriangle, FaShippingFast, FaLock, FaHeadset, FaUndo, FaBolt, FaStar, FaUsers, FaBoxOpen } from "react-icons/fa";
import { MdLocalOffer, MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

// ── Feature highlights data ──
const features = [
    {
        icon: <FaShippingFast size={24} />,
        title: "Free Shipping",
        desc: "On all orders over $50. Fast and reliable delivery to your door.",
        color: "from-indigo-500 to-blue-500",
        bgLight: "bg-indigo-50 dark:bg-indigo-950/30",
    },
    {
        icon: <FaLock size={24} />,
        title: "Secure Payment",
        desc: "100% secure transactions. Your data is always protected.",
        color: "from-emerald-500 to-green-500",
        bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
        icon: <FaUndo size={24} />,
        title: "Easy Returns",
        desc: "30-day hassle-free returns. No questions asked.",
        color: "from-amber-500 to-orange-500",
        bgLight: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
        icon: <FaHeadset size={24} />,
        title: "24/7 Support",
        desc: "Our support team is here for you anytime, any day.",
        color: "from-violet-500 to-purple-500",
        bgLight: "bg-violet-50 dark:bg-violet-950/30",
    },
];

// ── Why Zappit stats ──
const stats = [
    { icon: <FaUsers size={22} />, value: "50K+", label: "Happy Customers" },
    { icon: <FaBoxOpen size={22} />, value: "10K+", label: "Products" },
    { icon: <FaStar size={22} />, value: "4.9", label: "Average Rating" },
    { icon: <MdVerified size={22} />, value: "100%", label: "Authentic" },
];

const Home = () => {
    const dispatch = useDispatch();
    const { isLoading, errorMessage } = useSelector((state) => state.errors || {});
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="overflow-hidden">
            {/* ── Hero ── */}
            <div className="lg:px-14 sm:px-8 px-4 py-6">
                <HeroBanner />
            </div>

            {/* ── Feature Strip ── */}
            <div className="bg-slate-50/80 dark:bg-[#0e0e24] border-y border-slate-100 dark:border-gray-800 py-12 lg:px-14 sm:px-8 px-6 transition-colors duration-300">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map(({ icon, title, desc, color, bgLight }, i) => (
                        <div
                            key={title}
                            className={`group flex items-start gap-4 bg-white dark:bg-gray-900/50 rounded-2xl p-5 border border-slate-100 dark:border-gray-800 hover-lift cursor-default transition-all duration-300 animate-fade-in-up`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className={`shrink-0 ${bgLight} rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                <span className={`bg-gradient-to-br ${color} bg-clip-text text-transparent`}>
                                    {icon}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-gray-100 text-sm">{title}</h3>
                                <p className="text-slate-500 dark:text-gray-400 text-xs mt-1 leading-relaxed">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
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