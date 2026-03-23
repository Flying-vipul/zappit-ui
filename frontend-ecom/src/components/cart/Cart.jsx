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
            <div className="flex flex-col items-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                    <MdShoppingCart size={36} className="text-gray-700" />
                    Your Cart
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    {isEmpty ? "Your cart is empty" : "All your items selected"}
                </p>
                {!isEmpty && (
                    <button
                        onClick={clearCartHandler}
                        className="mt-4 text-sm text-red-400 border border-red-400 hover:bg-red-400/10 px-4 py-1.5 rounded-lg transition duration-200">
                        🗑️ Clear Cart
                    </button>
                )}
            </div>

            {/* ── Empty Cart State ── */}
            {isEmpty ? (
                <div className="flex flex-col items-center justify-center py-16 gap-6">
                    {/* Big cart icon */}
                    <div className="relative">
                        <div className="w-40 h-40 rounded-full bg-slate-100 flex items-center justify-center">
                            <BsCartX size={72} className="text-slate-300" />
                        </div>
                        <span className="absolute -top-1 -right-1 bg-red-400 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow">
                            0
                        </span>
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-700 mb-2">
                            Nothing here yet!
                        </h2>
                        <p className="text-slate-500 text-sm max-w-xs">
                            Looks like you haven't added anything to your cart. Browse our products and find something you love!
                        </p>
                    </div>

                    <Link to="/products">
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
                            <MdShoppingCart size={20} />
                            Start Shopping
                        </button>
                    </Link>

                    <Link to="/" className="text-slate-400 text-sm hover:text-slate-600 flex items-center gap-1 transition duration-200">
                        <MdArrowBack size={16} />
                        Back to Home
                    </Link>
                </div>
            ) : (
                <>
                    {/* ── Column Headers (Hidden on Mobile) ── */}
                    <div className="hidden md:grid md:grid-cols-5 grid-cols-4 gap-4 pb-4 font-semibold items-center border-b border-slate-300">
                        <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
                            Product
                        </div>
                        <div className="justify-self-center text-lg text-slate-800 hidden md:block">
                            Price
                        </div>
                        <div className="justify-self-center text-lg text-slate-800">
                            Quantity
                        </div>
                        <div className="justify-self-center text-lg text-slate-800">
                            Total
                        </div>
                    </div>

                    {/* ── Cart Items ── */}
                    <div>
                        {cart.map((item, i) => <ItemContent key={i} {...item} />)}
                    </div>

                    {/* ── Footer: Subtotal + Checkout ── */}
                    <div className="border-t-[1.5px] border-slate-400 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
                        <div></div>
                        <div className="flex text-sm gap-1 flex-col">
                            <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
                                <span>SubTotal</span>
                                <span>${Number(newCart.totalPrice || 0).toFixed(2)}</span>
                            </div>
                            <p className="text-slate-500">
                                Taxes and shipping calculated at checkout
                            </p>
                            <Link className="w-full flex justify-end" to="/checkout">
                                <button className="font-semibold w-[300px] py-2 px-4 rounded-sm bg-custom-blue text-white flex items-center justify-center gap-2 hover:text-gray-300 transition duration-500">
                                    <MdShoppingCart size={20} />
                                    Checkout
                                </button>
                            </Link>
                            <Link className="flex gap-2 items-center mt-2 text-slate-500" to="/products">
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