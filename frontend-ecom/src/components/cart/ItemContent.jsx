import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProductImage = ({ src, alt, className }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const fallbackImage = "/assets/local-placeholder.png";

    const handleError = () => {
        if (imgSrc !== fallbackImage) {
            setImgSrc(fallbackImage);
        }
    };

    return (
        <img
            src={imgSrc || fallbackImage}
            alt={alt}
            className={className}
            onError={handleError}
        />
    );
};

const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    cartId,
}) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);

    const removeFromCartHandler = () => {
        dispatch({ type: "REMOVE_FROM_CART", payload: productId });
        const updatedCart = cart.filter((item) => item.productId !== productId);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        toast.error(`${productName} removed from cart`);
    };


    const displayPrice = Number(specialPrice || price);
    const total = (displayPrice * currentQuantity).toFixed(2);

    return (
        // Must match Cart.jsx header: md:grid-cols-5, col-span-2 for Product
        <div className="flex flex-col md:grid md:grid-cols-5 gap-4 items-center border-b border-slate-300 py-6 lg:px-4 px-2 hover:bg-slate-50 transition-colors">

            {/* ── Product Info (Image + Name + Remove) ── */}
            <div className="w-full md:col-span-2 flex justify-start items-center gap-4">
                <div className="w-24 h-24 shrink-0 bg-white border border-slate-200 rounded-lg p-2 flex items-center justify-center shadow-sm">
                    <ProductImage
                        src={image}
                        alt={productName}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>
                <div className="flex flex-col gap-2 grow">
                    <h3 className="text-base sm:text-[17px] font-bold text-slate-800 leading-tight">
                        {productName}
                    </h3>

                    {/* Mobile Only: Show Price inline */}
                    <div className="md:hidden text-sm font-semibold text-slate-600 mt-1">
                        Price: <span className="text-blue-600">${displayPrice.toFixed(2)}</span>
                    </div>

                    <button
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium border border-red-200 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200 w-fit mt-1"
                        onClick={removeFromCartHandler}>
                        <HiOutlineTrash size={16} />
                        Remove
                    </button>
                </div>
            </div>

            {/* ── Desktop Price ── */}
            <div className="hidden md:block justify-self-center text-base font-semibold text-slate-700">
                ${displayPrice.toFixed(2)}
            </div>

            {/* ── Quantity Controls ── */}
            <div className="w-full md:w-auto flex justify-between md:justify-center items-center mt-2 md:mt-0 px-2 md:px-0">
                <span className="md:hidden text-sm font-medium text-slate-500">Quantity</span>
                <div className="flex items-center gap-3 bg-white border border-slate-300 rounded-full px-2 py-1 shadow-sm">
                    <button
                        onClick={() => {
                            const newQty = Math.max(1, currentQuantity - 1);
                            setCurrentQuantity(newQty);
                            dispatch({ type: "UPDATE_CART_QUANTITY", payload: { productId, quantity: newQty } });
                            const updated = cart.map(i => i.productId === productId ? { ...i, quantity: newQty } : i);
                            localStorage.setItem("cartItems", JSON.stringify(updated));
                        }}
                        className="w-7 h-7 rounded-full text-slate-600 flex items-center justify-center hover:bg-slate-200 text-lg font-bold transition-colors"
                    >−</button>
                    <span className="text-sm font-bold text-slate-800 w-6 text-center">
                        {currentQuantity}
                    </span>
                    <button
                        onClick={() => {
                            const newQty = currentQuantity + 1;
                            setCurrentQuantity(newQty);
                            dispatch({ type: "UPDATE_CART_QUANTITY", payload: { productId, quantity: newQty } });
                            const updated = cart.map(i => i.productId === productId ? { ...i, quantity: newQty } : i);
                            localStorage.setItem("cartItems", JSON.stringify(updated));
                        }}
                        className="w-7 h-7 rounded-full text-slate-600 flex items-center justify-center hover:bg-slate-200 text-lg font-bold transition-colors"
                    >+</button>
                </div>
            </div>

            {/* ── Total Price ── */}
            <div className="w-full md:w-auto flex justify-between md:justify-center items-center mt-2 md:mt-0 pt-3 md:pt-0 border-t border-slate-200 md:border-none px-2 md:px-0">
                <span className="md:hidden text-sm font-semibold text-slate-700">Total</span>
                <div className="text-base md:text-lg font-bold text-slate-900 bg-slate-100 md:bg-transparent px-3 py-1 md:px-0 md:py-0 rounded-md">
                    ${total}
                </div>
            </div>

        </div>
    );
};

export default ItemContent;