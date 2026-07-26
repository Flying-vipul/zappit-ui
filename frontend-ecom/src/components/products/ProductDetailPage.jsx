import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTocart } from '../../store/actions';
import toast from 'react-hot-toast';
import api from '../../api/api';
import {
    FaShoppingCart, FaTruck, FaGift, FaShieldAlt, FaBolt,
    FaArrowLeft, FaStar, FaHeart, FaShareAlt, FaCheckCircle
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const ProductDetailPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imgRef = useRef(null);

    const [product, setProduct] = useState(location.state?.product || null);
    const [loading, setLoading] = useState(!product);
    const [error, setError] = useState(null);

    const [activeImage, setActiveImage] = useState(null);
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [activeTab, setActiveTab] = useState('description');
    const [wishlisted, setWishlisted] = useState(false);
    const [imgZoom, setImgZoom] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!product || String(product.id) !== String(id)) {
            setLoading(true);
            api.get(`/public/products/${id}`)
                .then(res => {
                    setProduct(res.data);
                    const imgs = res.data.images?.length > 0 ? res.data.images : (res.data.image ? [res.data.image] : []);
                    setActiveImage(imgs[0] || res.data.image);
                    setLoading(false);
                })
                .catch(() => {
                    setError("Failed to load product details.");
                    setLoading(false);
                });
        } else {
            const imgs = product.images?.length > 0 ? product.images : (product.image ? [product.image] : []);
            setActiveImage(imgs[0] || product.image);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-900" />
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-semibold animate-pulse">Loading product...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950 text-center p-6">
                <div className="w-20 h-20 bg-rose-100 dark:bg-rose-950 text-rose-600 rounded-full flex items-center justify-center text-3xl font-black">!</div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white">Product Not Found</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md">{error || "The product might have been removed or is temporarily unavailable."}</p>
                <Link to="/products" className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg transition-all">
                    Browse All Products
                </Link>
            </div>
        );
    }

    const { productName, image, images, description, quantity, price, discount, specialPrice, sizes, colors } = product;
    const isAvailable = quantity && quantity > 0;
    const allImages = images?.length > 0 ? images : (image ? [image] : []);
    const hasSizes = sizes?.length > 0;
    const hasColors = colors?.length > 0;
    const hasVariations = hasSizes || hasColors;
    const canAddToCart = isAvailable && (!hasSizes || selectedSize) && (!hasColors || selectedColor);

    const colorOptions = hasColors
        ? colors.map(c => { const p = c.split(':'); return { name: p[0], hex: p[1] || '#ccc', raw: c }; })
        : [];

    const handleAddToCart = () => {
        if (!canAddToCart) return;
        dispatch(addTocart({
            productId: id, productName, image, description, quantity, price, specialPrice,
            ...(selectedSize && { selectedSize }),
            ...(selectedColor && { selectedColor: selectedColor.raw }),
        }, qty, toast));
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({ title: productName, url: window.location.href });
        } else {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">

            {/* ── Sticky Top Bar ── */}
            <div className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <FaArrowLeft size={12} />
                        </div>
                        <span className="hidden sm:block">Back</span>
                    </button>

                    {/* Breadcrumb - hidden on tiny screens */}
                    <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400 overflow-hidden">
                        <Link to="/" className="hover:text-indigo-600 shrink-0">Home</Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-indigo-600 shrink-0">Products</Link>
                        <span>/</span>
                        <span className="text-slate-800 dark:text-white font-bold truncate">{productName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setWishlisted(w => !w)}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border-2 ${wishlisted ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-500' : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-400 hover:text-rose-500'}`}
                        >
                            <FaHeart size={14} className={wishlisted ? 'animate-ping-once' : ''} />
                        </button>
                        <button
                            onClick={handleShare}
                            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 flex items-center justify-center transition-colors"
                        >
                            <FaShareAlt size={13} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">

                    {/* ══════════════════════════════════════
                        LEFT: IMAGE GALLERY
                    ══════════════════════════════════════ */}
                    <div className="flex flex-col gap-4">
                        {/* Main Image Card */}
                        <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 overflow-hidden shadow-lg group">
                            {/* Floating badges */}
                            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                {discount > 0 && (
                                    <span className="px-3 py-1.5 bg-gradient-to-r from-rose-600 to-orange-500 text-white text-xs font-black rounded-full shadow-lg flex items-center gap-1.5">
                                        <FaBolt size={10} /> {discount}% OFF
                                    </span>
                                )}
                                {isAvailable ? (
                                    <span className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-black rounded-full shadow-md flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="px-3 py-1.5 bg-slate-700 text-white text-xs font-black rounded-full shadow-md">
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            {/* Image */}
                            <div
                                className={`w-full aspect-square flex items-center justify-center p-8 sm:p-12 transition-transform duration-500 ${imgZoom ? 'scale-110' : 'scale-100'} cursor-zoom-in`}
                                onClick={() => setImgZoom(z => !z)}
                            >
                                {activeImage ? (
                                    <img
                                        ref={imgRef}
                                        src={activeImage}
                                        alt={productName}
                                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-all duration-700 group-hover:scale-105"
                                        onError={(e) => { if (e.target.src !== '/assets/local-placeholder.png') e.target.src = '/assets/local-placeholder.png'; }}
                                    />
                                ) : (
                                    <div className="text-slate-300 dark:text-slate-600 font-bold text-center">No Image Available</div>
                                )}
                            </div>

                            {/* Zoom hint */}
                            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-slate-900/60 text-white text-[10px] font-bold rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                Tap to zoom
                            </div>
                        </div>

                        {/* Thumbnail Strip */}
                        {allImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                                {allImages.map((imgUrl, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setActiveImage(imgUrl); setImgZoom(false); }}
                                        className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 bg-white dark:bg-slate-900 p-1.5 transition-all duration-200 ${
                                            activeImage === imgUrl
                                                ? 'border-indigo-500 ring-2 ring-indigo-400/30 scale-105 shadow-lg'
                                                : 'border-slate-200 dark:border-slate-700 opacity-55 hover:opacity-100 hover:border-slate-300'
                                        }`}
                                    >
                                        <img src={imgUrl} alt={`thumb-${i}`} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Trust Badges - visible below image on mobile */}
                        <div className="grid grid-cols-2 gap-3 lg:hidden">
                            {[
                                { icon: <FaTruck />, title: 'Free Delivery', sub: 'On orders above ₹499', color: 'emerald' },
                                { icon: <FaGift />, title: 'Gift Wrap', sub: 'Available on checkout', color: 'rose' },
                                { icon: <FaShieldAlt />, title: '100% Genuine', sub: 'Certified safe materials', color: 'indigo' },
                                { icon: <FaBolt />, title: 'Fast Dispatch', sub: 'Ships within 24 hours', color: 'amber' },
                            ].map(({ icon, title, sub, color }) => (
                                <div key={title} className={`flex items-center gap-2.5 p-3 rounded-2xl bg-${color}-50 dark:bg-${color}-950/30 border border-${color}-100 dark:border-${color}-900/50`}>
                                    <div className={`w-8 h-8 rounded-xl bg-${color}-500 text-white flex items-center justify-center text-sm shrink-0 shadow-sm`}>{icon}</div>
                                    <div>
                                        <p className={`text-[11px] font-black text-${color}-900 dark:text-${color}-300 uppercase tracking-wide leading-none`}>{title}</p>
                                        <p className={`text-[10px] text-${color}-700/70 dark:text-${color}-400/70 mt-0.5 leading-tight`}>{sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ══════════════════════════════════════
                        RIGHT: PRODUCT INFO & BUYING BOX
                    ══════════════════════════════════════ */}
                    <div className="flex flex-col gap-6">

                        {/* Product Header */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 tracking-widest uppercase bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full">Zappit Store</span>
                                <MdVerified className="text-indigo-500" size={16} />
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                {productName}
                            </h1>
                            {/* Rating Row */}
                            <div className="flex items-center gap-2 mt-3 flex-wrap">
                                <div className="flex items-center gap-0.5 text-amber-400">
                                    {[...Array(5)].map((_, i) => <FaStar key={i} size={13} />)}
                                </div>
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">4.9 • 2,450 reviews</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                    <FaCheckCircle size={11} /> Verified Seller
                                </span>
                            </div>
                        </div>

                        {/* Price Card */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-5 sm:p-6 shadow-xl">
                            <div className="flex items-center justify-between flex-wrap gap-3">
                                <div>
                                    {specialPrice ? (
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-3xl sm:text-4xl font-black text-white">₹{Number(specialPrice).toFixed(0)}</span>
                                            <span className="text-base font-bold text-slate-400 line-through">₹{Number(price).toFixed(0)}</span>
                                        </div>
                                    ) : (
                                        <span className="text-3xl sm:text-4xl font-black text-white">₹{Number(price).toFixed(0)}</span>
                                    )}
                                    <p className="text-xs font-semibold text-slate-400 mt-1">Inclusive of all taxes</p>
                                </div>
                                {discount > 0 && (
                                    <span className="px-4 py-2 bg-gradient-to-r from-rose-500 to-orange-400 text-white font-black text-sm rounded-2xl shadow-lg">
                                        Save {discount}%
                                    </span>
                                )}
                            </div>

                            {isAvailable && (
                                <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between text-xs font-bold">
                                    <span className="text-emerald-400 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        {quantity} units in stock
                                    </span>
                                    <span className="text-amber-400">⚡ Express Dispatch Available</span>
                                </div>
                            )}
                        </div>

                        {/* Variations */}
                        {hasVariations && (
                            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-5 sm:p-6 space-y-5">
                                {hasSizes && (
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-xs font-black text-slate-800 dark:text-slate-200 tracking-wider uppercase">Size</label>
                                            {selectedSize && (
                                                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full">
                                                    {selectedSize}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {sizes.map(size => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`min-w-[44px] h-11 px-4 rounded-xl text-sm font-black transition-all duration-200 border-2 ${
                                                        selectedSize === size
                                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg scale-105'
                                                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
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
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-xs font-black text-slate-800 dark:text-slate-200 tracking-wider uppercase">Color</label>
                                            {selectedColor && (
                                                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-full border border-slate-300" style={{ backgroundColor: selectedColor.hex }} />
                                                    {selectedColor.name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-2.5">
                                            {colorOptions.map((color, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                                                        selectedColor?.name === color.name
                                                            ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800 shadow-lg scale-105'
                                                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                                                    }`}
                                                >
                                                    <span className="w-4 h-4 rounded-full border border-slate-300 shadow-inner shrink-0" style={{ backgroundColor: color.hex }} />
                                                    <span className={`text-xs font-bold ${selectedColor?.name === color.name ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                                        {color.name}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {!canAddToCart && isAvailable && (
                                    <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl text-amber-800 dark:text-amber-300 text-xs font-bold">
                                        ⚠️ Please select all required options to continue
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Quantity + Add to Cart */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-5 sm:p-6 space-y-4">
                            {/* Quantity */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide">Quantity</span>
                                <div className="flex items-center rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800">
                                    <button
                                        onClick={() => setQty(p => Math.max(1, p - 1))}
                                        disabled={qty <= 1}
                                        className="w-11 h-11 font-black text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors text-xl"
                                    >
                                        −
                                    </button>
                                    <span className="w-10 text-center font-extrabold text-base text-slate-900 dark:text-white">{qty}</span>
                                    <button
                                        onClick={() => setQty(p => Math.min(quantity, p + 1))}
                                        disabled={qty >= quantity}
                                        className="w-11 h-11 font-black text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors text-xl"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!canAddToCart}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm tracking-wider uppercase transition-all duration-300 shadow-lg ${
                                    canAddToCart
                                        ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.01] active:scale-[0.98]'
                                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                                }`}
                            >
                                <FaShoppingCart size={16} />
                                {!isAvailable ? 'Out of Stock' : !canAddToCart ? 'Select Options First' : 'Add to Cart'}
                            </button>
                        </div>

                        {/* Trust Badges - visible only on desktop */}
                        <div className="hidden lg:grid grid-cols-2 gap-3">
                            {[
                                { icon: <FaTruck />, title: 'Free Delivery', sub: 'On orders above ₹499', color: 'emerald' },
                                { icon: <FaGift />, title: 'Gift Wrap', sub: 'Available on checkout', color: 'rose' },
                                { icon: <FaShieldAlt />, title: '100% Genuine', sub: 'Certified safe materials', color: 'indigo' },
                                { icon: <FaBolt />, title: 'Fast Dispatch', sub: 'Ships within 24 hours', color: 'amber' },
                            ].map(({ icon, title, sub, color }) => (
                                <div key={title} className={`flex items-center gap-2.5 p-3.5 rounded-2xl bg-${color}-50 dark:bg-${color}-950/30 border border-${color}-100 dark:border-${color}-900/50 hover:-translate-y-0.5 transition-transform`}>
                                    <div className={`w-9 h-9 rounded-xl bg-${color}-500 text-white flex items-center justify-center text-sm shrink-0 shadow-md`}>{icon}</div>
                                    <div>
                                        <p className={`text-[11px] font-black text-${color}-900 dark:text-${color}-300 uppercase tracking-wide`}>{title}</p>
                                        <p className={`text-[10px] text-${color}-700/70 dark:text-${color}-400/70 mt-0.5`}>{sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ══════════════════════════════════════
                    BOTTOM TABS: Description & Policy
                ══════════════════════════════════════ */}
                <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 overflow-hidden shadow-md">
                    {/* Tab Switcher */}
                    <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-hide">
                        {[
                            { key: 'description', label: 'Description' },
                            { key: 'policy', label: 'Return Policy' },
                        ].map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex-shrink-0 px-6 py-4 text-sm font-black tracking-wide transition-colors border-b-2 ${
                                    activeTab === tab.key
                                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20'
                                        : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 sm:p-10">
                        {activeTab === 'description' && (
                            <div className="text-slate-600 dark:text-slate-300 space-y-5 leading-relaxed text-sm sm:text-base">
                                <p>{description || 'No extended description provided for this product.'}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                                    {[
                                        '🧸 Crafted with premium, child-safe, non-toxic materials',
                                        '🎨 Vibrant, fade-resistant finishes for longevity',
                                        '🎁 Perfect gift for birthdays, festivals & home decor',
                                        '✅ Rigorous quality inspection before shipping',
                                    ].map(point => (
                                        <div key={point} className="flex items-start gap-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {point}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'policy' && (
                            <div className="space-y-4">
                                <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50">
                                    <h4 className="font-black text-rose-900 dark:text-rose-200 text-base mb-2 flex items-center gap-2">🎁 Strict No-Return Policy on Toys & Gifts</h4>
                                    <p className="text-sm text-rose-800/80 dark:text-rose-200/70 leading-relaxed">
                                        To maintain strict hygiene, safety, and quality assurance standards, we do not accept general returns or "change of mind" requests for items in the Toys & Gifts category.
                                    </p>
                                </div>
                                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
                                    <h4 className="font-black text-emerald-900 dark:text-emerald-200 text-base mb-2 flex items-center gap-2">🛡️ 7-Day Defect & Damage Protection</h4>
                                    <p className="text-sm text-emerald-800/80 dark:text-emerald-200/70 leading-relaxed">
                                        In the rare event your product arrives damaged or has a proven manufacturing defect, we offer a hassle-free 7-day replacement guarantee. Record an unboxing video and submit it to our support team for a swift replacement.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
