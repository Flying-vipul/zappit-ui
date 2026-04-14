import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    const newCart = { ...cart };

    newCart.totalPrice = cart?.reduce(
        (acc, curr) => acc + Number(curr?.specialPrice || curr?.price) * Number(curr?.quantity), 0
    );

    const clearCartHandler = () => {
        dispatch({ type: "CLEAR_CART" });
        localStorage.removeItem("cartItems");
    };

    const isEmpty = !cart || cart.length === 0;

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-10 min-h-[80vh]">

            {/* ── Header ── */}
            <div className="flex flex-col items-center mb-10 animate-fade-in-down">
                <h1 className="text-3xl sm:text-4xl font-extrabold flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <MdShoppingCart size={24} className="text-white" />
                    </div>
                    <span className="gradient-text">Your Cart</span>
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 mt-3">
                    {isEmpty ? "Your cart is empty" : "All your items selected"}
                </p>
                {!isEmpty && (
                    <button
                        onClick={clearCartHandler}
                        className="mt-4 text-sm text-rose-500 border border-rose-200 dark:border-rose-800/50 hover:bg-rose-50 dark:hover:bg-rose-900/20 px-5 py-2 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-rose-500/10">
                        🗑️ Clear Cart
                    </button>
                )}
            </div>

            {/* ── Empty Cart State ── */}
            {isEmpty ? (
                <div className="flex flex-col items-center justify-center py-16 gap-6 animate-fade-in-up">
                    {/* Big cart icon */}
                    <div className="relative">
                        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center animate-float">
                            <BsCartX size={72} className="text-indigo-300/60 dark:text-gray-600" />
                        </div>
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-lg">
                            0
                        </span>
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-700 dark:text-gray-200 mb-2">
                            Nothing here yet!
                        </h2>
                        <p className="text-slate-500 dark:text-gray-400 text-sm max-w-xs">
                            Looks like you haven't added anything to your cart. Browse our products and find something you love!
                        </p>
                    </div>

                    <Link to="/products">
                        <button className="btn-zappit flex items-center gap-2 px-8 py-3 text-sm">
                            <MdShoppingCart size={20} />
                            Start Shopping
                        </button>
                    </Link>

                    <Link to="/" className="text-slate-400 text-sm hover:text-indigo-500 flex items-center gap-1 transition-colors duration-200">
                        <MdArrowBack size={16} />
                        Back to Home
                    </Link>
                </div>
            ) : (
                <>
                    {/* ── Column Headers (Hidden on Mobile) ── */}
                    <div className="hidden md:grid md:grid-cols-5 grid-cols-4 gap-4 pb-4 font-semibold items-center border-b border-slate-200 dark:border-gray-700/50 animate-fade-in-up">
                        <div className="md:col-span-2 justify-self-start text-lg text-slate-700 dark:text-gray-200 lg:ps-4">
                            Product
                        </div>
                        <div className="justify-self-center text-lg text-slate-700 dark:text-gray-200 hidden md:block">
                            Price
                        </div>
                        <div className="justify-self-center text-lg text-slate-700 dark:text-gray-200">
                            Quantity
                        </div>
                        <div className="justify-self-center text-lg text-slate-700 dark:text-gray-200">
                            Total
                        </div>
                    </div>

                    {/* ── Cart Items ── */}
                    <div>
                        {cart.map((item, i) => (
                            <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                                <ItemContent {...item} />
                            </div>
                        ))}
                    </div>

                    {/* ── Footer: Subtotal + Checkout ── */}
                    <div className="border-t border-slate-200 dark:border-gray-700/50 py-6 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4 animate-fade-in-up">
                        <div></div>
                        <div className="flex text-sm gap-2 flex-col bg-slate-50/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 dark:border-gray-800">
                            <div className="flex justify-between w-full md:text-lg text-sm font-bold dark:text-gray-200 gap-10">
                                <span>SubTotal</span>
                                <span className="gradient-text text-xl">${Number(newCart.totalPrice || 0).toFixed(2)}</span>
                            </div>
                            <p className="text-slate-400 dark:text-gray-500 text-xs">
                                Taxes and shipping calculated at checkout
                            </p>
                            <Link className="w-full flex justify-end mt-3" to="/checkout">
                                <button className="font-semibold w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500
                                    text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30
                                    hover:from-indigo-600 hover:to-violet-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
                                    <MdShoppingCart size={20} />
                                    Checkout
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </button>
                            </Link>
                            <Link className="flex gap-2 items-center mt-2 text-slate-400 hover:text-indigo-500 transition-colors duration-200 text-sm" to="/products">
                                <MdArrowBack />
                                <span className="cursor-pointer">Continue Shopping</span>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;