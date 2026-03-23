import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import { fetchProducts } from "../../store/actions";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import { FaExclamationTriangle, FaShippingFast, FaLock, FaHeadset, FaUndo } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";

// ── Feature highlights data ──
const features = [
    {
        icon: <FaShippingFast size={28} className="text-blue-500" />,
        title: "Free Shipping",
        desc: "On all orders over $50. Fast and reliable delivery to your door.",
    },
    {
        icon: <FaLock size={28} className="text-blue-500" />,
        title: "Secure Payment",
        desc: "100% secure transactions. Your data is always protected.",
    },
    {
        icon: <FaUndo size={28} className="text-blue-500" />,
        title: "Easy Returns",
        desc: "30-day hassle-free returns. No questions asked.",
    },
    {
        icon: <FaHeadset size={28} className="text-blue-500" />,
        title: "24/7 Support",
        desc: "Our support team is here for you anytime, any day.",
    },
];

const Home = () => {
    const dispatch = useDispatch();
    const { isLoading, errorMessage } = useSelector((state) => state.errors || {});
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            {/* ── Hero ── */}
            <div className="lg:px-14 sm:px-8 px-4 py-6">
                <HeroBanner />
            </div>

            {/* ── Feature Strip ── */}
            <div className="bg-slate-50 border-y border-slate-100 py-10 lg:px-14 sm:px-8 px-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map(({ icon, title, desc }) => (
                        <div
                            key={title}
                            className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition duration-200"
                        >
                            <div className="shrink-0 bg-blue-50 rounded-lg p-3">{icon}</div>
                            <div>
                                <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
                                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Featured Products ── */}
            <div className="lg:px-14 sm:px-8 px-6 py-14">
                {/* Section header */}
                <div className="flex flex-col items-center text-center mb-10 space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Handpicked for you
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
                        Featured Products
                    </h2>
                    <p className="text-slate-500 max-w-md text-sm">
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
                        {products?.slice(0, 4).map((item) => (
                            <ProductCard key={item.productId} {...item} />
                        ))}
                    </div>
                )}

                {/* View All button */}
                {!isLoading && !errorMessage && (
                    <div className="flex justify-center mt-10">
                        <Link to="/products">
                            <button className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition duration-300">
                                View All Products →
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            {/* ── Promo Banner ── */}
            <div className="lg:mx-14 sm:mx-8 mx-6 mb-14 rounded-2xl overflow-hidden bg-linear-to-r from-green-500 via-yellow-400 to-red-500 px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-white space-y-2">
                    <div className="flex items-center gap-2">
                        <MdLocalOffer size={22} className="text-yellow-300" />
                        <span className="text-yellow-300 font-semibold text-sm uppercase tracking-wide">
                            Limited Time Offer
                        </span>
                    </div>
                    <h3 className="text-3xl font-extrabold leading-snug">
                        Up to <span className="text-yellow-300">50% OFF</span><br />
                        on select items
                    </h3>
                    <p className="text-blue-100 text-sm">
                        Don't miss out — deals expire at the end of the month!
                    </p>
                </div>
                <Link to="/products">
                    <button className="shrink-0 bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 hover:text-slate-800 transition duration-300 shadow-lg">
                        Shop the Sale
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;