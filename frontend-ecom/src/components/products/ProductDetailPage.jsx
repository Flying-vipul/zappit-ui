import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTocart } from '../../store/actions';
import toast from 'react-hot-toast';
import api from '../../api/api';
import { FaShoppingCart, FaTruck, FaGift, FaShieldAlt, FaBolt, FaArrowLeft, FaCheckCircle, FaTimesCircle, FaStar, FaShareAlt, FaHeart } from 'react-icons/fa';
import Status from '../shared/Status';
import { MdDone, MdClose } from 'react-icons/md';

const ProductDetailPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(location.state?.product || null);
    const [loading, setLoading] = useState(!product);
    const [error, setError] = useState(null);

    const [activeImage, setActiveImage] = useState(null);
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!product || String(product.id) !== String(id)) {
            setLoading(true);
            api.get(`/public/products/${id}`)
                .then(res => {
                    setProduct(res.data);
                    const imgs = res.data.images && res.data.images.length > 0 ? res.data.images : (res.data.image ? [res.data.image] : []);
                    setActiveImage(imgs[0] || res.data.image);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching product details:", err);
                    setError("Failed to load product details.");
                    setLoading(false);
                });
        } else {
            const imgs = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
            setActiveImage(imgs[0] || product.image);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-600 dark:text-slate-400 font-bold tracking-wide animate-pulse">Loading Enterprise Product Experience...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950 text-center p-6">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-2xl font-bold">!</div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white">Product Not Found</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-md">{error || "The product you are looking for might have been removed or is temporarily unavailable."}</p>
                <Link to="/products" className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg transition-all">
                    Browse All Products
                </Link>
            </div>
        );
    }

    const { productName, image, images, description, quantity, price, discount, specialPrice, sizes, colors } = product;
    const isAvailable = quantity && quantity > 0;
    const allImages = images && images.length > 0 ? images : (image ? [image] : []);
    const hasVariations = (sizes && sizes.length > 0) || (colors && colors.length > 0);
    const hasSizes = sizes && sizes.length > 0;
    const hasColors = colors && colors.length > 0;

    const canAddToCart = isAvailable && (!hasSizes || selectedSize) && (!hasColors || selectedColor);

    const colorOptions = hasColors
        ? colors.map(c => {
            const parts = c.split(":");
            return { name: parts[0], hex: parts[1] || "#ccc", raw: c };
        })
        : [];

    const handleAddToCart = () => {
        if (!canAddToCart) return;

        const cartData = {
            productId: id,
            productName,
            image,
            description,
            quantity,
            price,
            specialPrice,
            ...(selectedSize && { selectedSize }),
            ...(selectedColor && { selectedColor: selectedColor.raw }),
        };

        dispatch(addTocart(cartData, qty, toast));
    };

    return (
        <div className="min-h-screen bg-slate-50/80 dark:bg-slate-950 pb-16 transition-colors">
            {/* Breadcrumb Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-4 px-4 sm:px-8 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400">Products</Link>
                        <span>/</span>
                        <span className="text-slate-900 dark:text-white font-bold truncate">{productName}</span>
                    </div>
                    <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline font-bold shrink-0">
                        <FaArrowLeft size={12} /> Back
                    </button>
                </div>
            </div>

            {/* Main Showcase Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/60 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
                    
                    {/* LEFT COLUMN: ENTERPRISE GALLERY (6 COLS) */}
                    <div className="lg:col-span-6 p-6 sm:p-10 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800/50 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/60 dark:border-slate-800 relative">
                        {/* Badges */}
                        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2 items-start">
                            {discount > 0 && (
                                <span className="px-3.5 py-1.5 bg-gradient-to-r from-rose-600 to-orange-500 text-white text-xs font-black rounded-full shadow-lg flex items-center gap-1.5">
                                    <FaBolt /> {discount}% OFF
                                </span>
                            )}
                            <span className="px-3.5 py-1.5 bg-slate-900/90 dark:bg-slate-800 text-amber-400 text-xs font-black tracking-wider uppercase rounded-full shadow-md border border-amber-400/40">
                                🎁 Premium Toys & Gifts
                            </span>
                        </div>

                        {/* Image Viewport */}
                        <div className="w-full h-[360px] sm:h-[480px] my-auto flex items-center justify-center p-6 relative group">
                            {activeImage ? (
                                <img
                                    src={activeImage}
                                    alt={productName}
                                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 transform group-hover:scale-105 cursor-zoom-in"
                                    onError={(e) => {
                                        if (e.target.src !== "/assets/local-placeholder.png") {
                                            e.target.src = "/assets/local-placeholder.png";
                                        }
                                    }}
                                />
                            ) : (
                                <div className="text-slate-400 font-bold">No Image Available</div>
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        {allImages.length > 1 && (
                            <div className="mt-6 pt-6 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-center gap-3 overflow-x-auto pb-2">
                                {allImages.map((imgUrl, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setActiveImage(imgUrl)}
                                        className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white dark:bg-slate-800 p-1.5 shadow-md ${
                                            activeImage === imgUrl
                                                ? 'border-indigo-600 scale-105 ring-4 ring-indigo-500/20 shadow-lg'
                                                : 'border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-400'
                                        }`}
                                    >
                                        <img src={imgUrl} alt={`${productName} thumb ${index}`} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: PRODUCT INFO & BUYING BOX (6 COLS) */}
                    <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                        <div>
                            {/* Header Info */}
                            <div className="flex items-center justify-between gap-3 mb-3">
                                <span className="text-xs font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                                    Enterprise Showcase
                                </span>
                                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                                    <span className="text-slate-600 dark:text-slate-400 ml-1 text-xs font-semibold">(4.9 • 2,450 Reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
                                {productName}
                            </h1>

                            {/* Price & Status Card */}
                            <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-100 dark:border-slate-700 mb-6">
                                <div>
                                    {specialPrice ? (
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                                                ₹{Number(specialPrice).toFixed(2)}
                                            </span>
                                            <span className="text-base font-bold text-slate-400 line-through">
                                                ₹{Number(price).toFixed(2)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                                            ₹{Number(price).toFixed(2)}
                                        </span>
                                    )}
                                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                                        ⚡ Inclusive of GST & Free Standard Packaging
                                    </p>
                                </div>

                                <div>
                                    {isAvailable ? (
                                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-black shadow-sm border border-emerald-300 dark:border-emerald-800">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                                            In Stock ({quantity} left)
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 text-xs font-black shadow-sm border border-rose-300 dark:border-rose-800">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* ENTERPRISE TOYS & GIFTS TRUST BADGES */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 transition-transform hover:-translate-y-0.5">
                                    <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20 shrink-0">
                                        <FaTruck size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-emerald-950 dark:text-emerald-300 uppercase tracking-wider">COD Available</h4>
                                        <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 mt-0.5 leading-tight">Cash or UPI on Doorstep Delivery</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-800/50 transition-transform hover:-translate-y-0.5">
                                    <div className="p-2.5 rounded-xl bg-rose-500 text-white shadow-md shadow-rose-500/20 shrink-0">
                                        <FaGift size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-rose-950 dark:text-rose-300 uppercase tracking-wider">No Return Policy</h4>
                                        <p className="text-[11px] text-rose-800/80 dark:text-rose-400/80 mt-0.5 leading-tight">Applicable on Toys & Gifts (7-day defect exchange)</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/50 transition-transform hover:-translate-y-0.5">
                                    <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 shrink-0">
                                        <FaShieldAlt size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-blue-950 dark:text-blue-300 uppercase tracking-wider">100% Genuine</h4>
                                        <p className="text-[11px] text-blue-800/80 dark:text-blue-400/80 mt-0.5 leading-tight">Certified safe materials for kids</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 transition-transform hover:-translate-y-0.5">
                                    <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20 shrink-0">
                                        <FaBolt size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-amber-950 dark:text-amber-300 uppercase tracking-wider">Express Dispatch</h4>
                                        <p className="text-[11px] text-amber-800/80 dark:text-amber-400/80 mt-0.5 leading-tight">Dispatches within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            {/* Variations */}
                            {hasVariations && (
                                <div className="space-y-5 mb-6 pt-5 border-t border-slate-200/60 dark:border-slate-800">
                                    {hasSizes && (
                                        <div>
                                            <div className="flex items-center justify-between mb-2.5">
                                                <label className="text-xs font-black text-slate-800 dark:text-slate-200 tracking-wider uppercase">
                                                    Select Size
                                                </label>
                                                {selectedSize && (
                                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
                                                        Selected: {selectedSize}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-2.5">
                                                {sizes.map((size) => (
                                                    <button
                                                        key={size}
                                                        type="button"
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`min-w-[52px] h-12 px-4 rounded-xl text-sm font-black transition-all border-2 ${
                                                            selectedSize === size
                                                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg scale-105"
                                                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400"
                                                        }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {hasColors && (
                                        <div>
                                            <div className="flex items-center justify-between mb-2.5">
                                                <label className="text-xs font-black text-slate-800 dark:text-slate-200 tracking-wider uppercase">
                                                    Select Color
                                                </label>
                                                {selectedColor && (
                                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full flex items-center gap-1.5">
                                                        <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: selectedColor.hex }} />
                                                        {selectedColor.name}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {colorOptions.map((color, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => setSelectedColor(color)}
                                                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 transition-all ${
                                                            selectedColor?.name === color.name
                                                                ? "border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800 shadow-lg scale-105"
                                                                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300"
                                                        }`}
                                                    >
                                                        <span className="w-5 h-5 rounded-full border border-slate-300 shadow-inner" style={{ backgroundColor: color.hex }} />
                                                        <span className={`text-sm font-bold ${selectedColor?.name === color.name ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>
                                                            {color.name}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {!canAddToCart && isAvailable && (
                                        <div className="p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-2">
                                            <span>⚠️ Please select your size & color options above to proceed.</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Quantity & Buy Actions */}
                        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800 mt-6 space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                {/* Quantity */}
                                <div className="flex items-center border-2 border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 overflow-hidden shrink-0 w-full sm:w-auto justify-center">
                                    <button
                                        type="button"
                                        disabled={qty <= 1}
                                        onClick={() => setQty(prev => Math.max(1, prev - 1))}
                                        className="px-4 py-3.5 font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-extrabold text-base text-slate-900 dark:text-white">
                                        {qty}
                                    </span>
                                    <button
                                        type="button"
                                        disabled={qty >= quantity}
                                        onClick={() => setQty(prev => prev + 1)}
                                        className="px-4 py-3.5 font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Add to Cart */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!canAddToCart}
                                    className={`flex-1 w-full flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-black text-base tracking-wide uppercase transition-all duration-300 shadow-xl ${
                                        canAddToCart
                                            ? "bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.01] active:scale-[0.98]"
                                            : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none"
                                    }`}
                                >
                                    <FaShoppingCart size={18} />
                                    {canAddToCart ? "Add to Cart" : "Select Options / Stock Out"}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* BOTTOM TABS: Description, Specs & Safety */}
                <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10">
                    <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8 mb-6 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`pb-3 font-black text-base transition-colors border-b-2 whitespace-nowrap ${
                                activeTab === 'description'
                                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                            }`}
                        >
                            Detailed Description
                        </button>
                        <button
                            onClick={() => setActiveTab('policy')}
                            className={`pb-3 font-black text-base transition-colors border-b-2 whitespace-nowrap ${
                                activeTab === 'policy'
                                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                            }`}
                        >
                            Toys & Gifts Safety & Return Policy
                        </button>
                    </div>

                    {activeTab === 'description' && (
                        <div className="text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base">
                            <p>{description || "No extended description provided for this product."}</p>
                            <h4 className="font-extrabold text-slate-900 dark:text-white mt-6">Why Choose Our Toys & Gifts?</h4>
                            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                                <li>Crafted with premium, child-safe, non-toxic materials.</li>
                                <li>Vibrant, fade-resistant finishes designed for longevity.</li>
                                <li>Perfect gift item for birthdays, festivals, and home decorations.</li>
                                <li>Rigorous quality inspections before shipping to ensure zero defects.</li>
                            </ul>
                        </div>
                    )}

                    {activeTab === 'policy' && (
                        <div className="text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base">
                            <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200">
                                <h4 className="font-black text-lg mb-2 flex items-center gap-2">🎁 Strict No-Return Policy on Toys & Gifts</h4>
                                <p className="text-sm leading-relaxed">
                                    To maintain strict hygiene, safety, and quality assurance standards for children and customers, we do not accept general returns or "change of mind" requests for items in the Toys & Gifts category.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 mt-4">
                                <h4 className="font-black text-lg mb-2 flex items-center gap-2">🛡️ 7-Day Defect & Transit Damage Protection</h4>
                                <p className="text-sm leading-relaxed">
                                    In the rare event that your product arrives damaged during transit or has a proven manufacturing defect, we offer a hassle-free 7-day replacement guarantee. Simply record an unboxing video upon receiving your parcel and submit it to our support team for a swift replacement.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
