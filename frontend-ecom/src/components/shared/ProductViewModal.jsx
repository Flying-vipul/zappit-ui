import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useState, Fragment, useEffect } from 'react'
import { Divider } from '@mui/material'
import Status from './Status';
import { MdDone, MdClose } from "react-icons/md";
import { FaShoppingCart, FaTruck, FaGift, FaShieldAlt, FaBolt, FaExternalLinkAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addTocart } from '../../store/actions';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ProductViewModal({ open, setOpen, product, isAvailable }) {
    const { id, productName, image, images, description, quantity, price, discount, specialPrice, sizes, colors } = product;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allImages = images && images.length > 0 ? images : (image ? [image] : []);
    const [activeImage, setActiveImage] = useState(allImages[0] || image);
    const [qty, setQty] = useState(1);

    // Variation selection state
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const hasVariations = (sizes && sizes.length > 0) || (colors && colors.length > 0);
    const hasSizes = sizes && sizes.length > 0;
    const hasColors = colors && colors.length > 0;

    // Reset selections when modal opens with a new product
    useEffect(() => {
        if (open) {
            setSelectedSize(null);
            setSelectedColor(null);
            setQty(1);
            const imgs = product?.images && product.images.length > 0 ? product.images : (product?.image ? [product.image] : []);
            setActiveImage(imgs[0] || product?.image);
        }
    }, [open, id, product]);

    // Check if required selections are made
    const canAddToCart = isAvailable && (!hasSizes || selectedSize) && (!hasColors || selectedColor);

    // Parse colors from "Name:#HEX" format
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
        setOpen(false);
    };

    const handleViewFullPage = () => {
        setOpen(false);
        navigate(`/product/${id}`, { state: { product } });
    };

    return (
        <Transition show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <DialogBackdrop className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-3 sm:p-6 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-3xl bg-white dark:bg-slate-900 text-left shadow-2xl transition-all md:max-w-4xl lg:max-w-5xl w-full max-h-[92vh] overflow-y-auto flex flex-col md:flex-row border border-gray-100 dark:border-slate-800">
                                
                                {/* LEFT COLUMN: GALLERY & PREVIEW (50% width on Desktop) */}
                                <div className="w-full md:w-1/2 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800/80 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200/60 dark:border-slate-800 relative">
                                    
                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                                        {discount > 0 && (
                                            <span className="px-3 py-1 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-black rounded-full shadow-md flex items-center gap-1 animate-pulse">
                                                <FaBolt size={10} /> {discount}% OFF
                                            </span>
                                        )}
                                        <span className="px-3 py-1 bg-slate-900/80 dark:bg-slate-800 text-amber-400 text-[10px] font-extrabold tracking-wider uppercase rounded-full shadow-sm border border-amber-400/30">
                                            🎁 Toys & Gifts Edition
                                        </span>
                                    </div>

                                    {/* Main Image Viewport */}
                                    <div className="w-full h-72 sm:h-96 my-auto flex items-center justify-center p-4 relative group overflow-hidden">
                                        {activeImage ? (
                                            <img
                                                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal cursor-pointer transition-transform duration-700 transform group-hover:scale-110"
                                                src={activeImage}
                                                alt={productName}
                                                onError={(e) => {
                                                    if (e.target.src !== "/assets/local-placeholder.png") {
                                                        e.target.src = "/assets/local-placeholder.png";
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div className="text-gray-400">No Image Available</div>
                                        )}
                                    </div>

                                    {/* Interactive Thumbnail Gallery Bar */}
                                    {allImages.length > 1 && (
                                        <div className="mt-4 pt-4 border-t border-gray-200/60 dark:border-slate-700/60 flex items-center justify-center gap-2.5 overflow-x-auto pb-1">
                                            {allImages.map((imgUrl, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => setActiveImage(imgUrl)}
                                                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white dark:bg-slate-800 p-1 shadow-sm ${
                                                        activeImage === imgUrl 
                                                            ? 'border-custom-blue scale-105 ring-2 ring-custom-blue/30 shadow-md' 
                                                            : 'border-gray-200 dark:border-slate-700 opacity-60 hover:opacity-100 hover:border-gray-400'
                                                    }`}
                                                >
                                                    <img src={imgUrl} alt={`${productName} thumb ${index}`} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* RIGHT COLUMN: ENTERPRISE DETAILS & BUYING BOX (50% width on Desktop) */}
                                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between max-h-[92vh] overflow-y-auto">
                                    <div>
                                        {/* Header & Title */}
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <span className="text-xs font-extrabold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                                                Premium Collection
                                            </span>
                                            <button
                                                onClick={handleViewFullPage}
                                                type="button"
                                                className="text-xs font-bold text-slate-500 hover:text-custom-blue flex items-center gap-1 transition-colors underline underline-offset-2"
                                            >
                                                View Full Page <FaExternalLinkAlt size={10} />
                                            </button>
                                        </div>

                                        <DialogTitle as="h1" className="text-2xl sm:text-3xl font-black leading-tight text-slate-900 dark:text-white mb-3">
                                            {productName}
                                        </DialogTitle>

                                        {/* Price & Stock Row */}
                                        <div className="flex items-center justify-between gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/60 mb-5">
                                            <div>
                                                {specialPrice ? (
                                                    <div className="flex items-baseline gap-2.5">
                                                        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                                                            ₹{Number(specialPrice).toFixed(2)}
                                                        </span>
                                                        <span className="text-sm font-semibold text-gray-400 line-through">
                                                            ₹{Number(price).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                                                        ₹{Number(price).toFixed(2)}
                                                    </span>
                                                )}
                                                <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">Inclusive of all taxes</p>
                                            </div>

                                            <div>
                                                {isAvailable ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-sm border border-emerald-200 dark:border-emerald-800">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                                        In Stock
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-bold shadow-sm border border-rose-200 dark:border-rose-800">
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="mb-6">
                                            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Description & Highlights</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                                {description || "Explore this premium item crafted with top-tier safety standards and vibrant finishing, perfect for daily entertainment, gifts, and display collections."}
                                            </p>
                                        </div>

                                        {/* ENTERPRISE TRUST & POLICY BADGES (TOYS & GIFTS SPECIFIC) */}
                                        <div className="grid grid-cols-2 gap-2.5 mb-6">
                                            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/40">
                                                <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-sm shrink-0 mt-0.5">
                                                    <FaTruck size={14} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[11px] font-black text-emerald-950 dark:text-emerald-300 uppercase tracking-wider">COD Available</h4>
                                                    <p className="text-[10px] text-emerald-800/80 dark:text-emerald-400/80 mt-0.5 leading-tight">Cash/UPI on Doorstep</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-800/40">
                                                <div className="p-2 rounded-xl bg-rose-500 text-white shadow-sm shrink-0 mt-0.5">
                                                    <FaGift size={14} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[11px] font-black text-rose-950 dark:text-rose-300 uppercase tracking-wider">No Return Policy</h4>
                                                    <p className="text-[10px] text-rose-800/80 dark:text-rose-400/80 mt-0.5 leading-tight">For Toys & Gifts safety</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-800/40">
                                                <div className="p-2 rounded-xl bg-custom-blue text-white shadow-sm shrink-0 mt-0.5">
                                                    <FaShieldAlt size={14} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[11px] font-black text-blue-950 dark:text-blue-300 uppercase tracking-wider">100% Genuine</h4>
                                                    <p className="text-[10px] text-blue-800/80 dark:text-blue-400/80 mt-0.5 leading-tight">Kid-safe certified quality</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/40">
                                                <div className="p-2 rounded-xl bg-amber-500 text-white shadow-sm shrink-0 mt-0.5">
                                                    <FaBolt size={14} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[11px] font-black text-amber-950 dark:text-amber-300 uppercase tracking-wider">Express Dispatch</h4>
                                                    <p className="text-[10px] text-amber-800/80 dark:text-amber-400/80 mt-0.5 leading-tight">Ships in 24 hours</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ===== VARIATION SELECTORS ===== */}
                                        {hasVariations && (
                                            <div className="space-y-4 mb-6 pt-4 border-t border-gray-100 dark:border-slate-800">
                                                {hasSizes && (
                                                    <div>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
                                                                Select Size
                                                            </label>
                                                            {selectedSize && (
                                                                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                                                    {selectedSize}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {sizes.map((size) => (
                                                                <button
                                                                    key={size}
                                                                    type="button"
                                                                    onClick={() => setSelectedSize(size)}
                                                                    className={`min-w-[44px] h-11 px-3.5 rounded-xl text-xs font-black transition-all duration-200 border-2 ${
                                                                        selectedSize === size
                                                                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md scale-105"
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
                                                        <div className="flex items-center justify-between mb-2">
                                                            <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
                                                                Select Color
                                                            </label>
                                                            {selectedColor && (
                                                                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                                                                    <span className="w-2.5 h-2.5 rounded-full border border-slate-300" style={{ backgroundColor: selectedColor.hex }} />
                                                                    {selectedColor.name}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap gap-2.5">
                                                            {colorOptions.map((color, idx) => (
                                                                <button
                                                                    key={idx}
                                                                    type="button"
                                                                    onClick={() => setSelectedColor(color)}
                                                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all duration-200 ${
                                                                        selectedColor?.name === color.name
                                                                            ? "border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800 shadow-md scale-105"
                                                                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300"
                                                                    }`}
                                                                >
                                                                    <span
                                                                        className="w-5 h-5 rounded-full border border-slate-300 shadow-inner"
                                                                        style={{ backgroundColor: color.hex }}
                                                                    />
                                                                    <span className={`text-xs font-bold ${selectedColor?.name === color.name ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>
                                                                        {color.name}
                                                                    </span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {!canAddToCart && isAvailable && (
                                                    <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-300 text-xs font-medium">
                                                        ⚠️ Please choose your options above to proceed.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* BOTTOM ACTION BAR */}
                                    <div className="pt-5 border-t border-gray-200 dark:border-slate-800 mt-auto flex flex-col sm:flex-row gap-3 items-center">
                                        {/* Quantity Counter */}
                                        <div className="flex items-center border-2 border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 overflow-hidden shrink-0">
                                            <button
                                                type="button"
                                                disabled={qty <= 1}
                                                onClick={() => setQty(prev => Math.max(1, prev - 1))}
                                                className="px-3.5 py-3 font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
                                            >
                                                -
                                            </button>
                                            <span className="w-10 text-center font-bold text-sm text-slate-900 dark:text-white">
                                                {qty}
                                            </span>
                                            <button
                                                type="button"
                                                disabled={qty >= quantity}
                                                onClick={() => setQty(prev => prev + 1)}
                                                className="px-3.5 py-3 font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={!canAddToCart}
                                            className={`flex-1 w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl font-black text-sm tracking-wide uppercase transition-all duration-300 shadow-xl ${
                                                canAddToCart
                                                    ? "bg-gradient-to-r from-custom-blue via-indigo-600 to-violet-600 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.98]"
                                                    : "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed shadow-none"
                                            }`}
                                        >
                                            <FaShoppingCart size={16} />
                                            {canAddToCart ? "Add to Cart" : "Select Options / Stock Out"}
                                        </button>

                                        {/* Close Button */}
                                        <button
                                            onClick={() => setOpen(false)}
                                            type="button"
                                            className="px-5 py-3.5 text-sm font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
export default ProductViewModal;
