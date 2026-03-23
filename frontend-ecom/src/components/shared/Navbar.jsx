import { Badge } from "@mui/material";
import { useState } from "react";
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "../UserMenu";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
];

const Navbar = () => {
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { cart } = useSelector((state) => state.carts);
    const cartCount = cart?.length || 0;
    const { user } = useSelector((state) => state.auth);

    const close = () => setNavbarOpen(false);

    return (
        <>
            {/* ── Main bar ── */}
            <div className="h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0">
                <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" onClick={close} className="flex items-center text-2xl font-bold">
                        <FaStore className="mr-2 text-3xl" />
                        <span>E-Shop</span>
                    </Link>

                    {/* ── Desktop nav ── */}
                    <ul className="hidden sm:flex sm:gap-10 items-center">
                        {navLinks.map(({ label, to }) => (
                            <li key={label}>
                                <Link
                                    to={to}
                                    className={`transition-all duration-150 font-medium ${path === to ? "text-white font-semibold" : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}

                        {/* Cart */}
                        <li>
                            <Link to="/cart">
                                <Badge showZero badgeContent={cartCount} color="primary" overlap="circular"
                                    anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                                    <FaShoppingCart size={25} />
                                </Badge>
                            </Link>
                        </li>

                        {/* Login */}
                        {(user && user.id) ? (
                            <li className="font-medium transition-all duration-150">
                                <UserMenu />
                            </li>
                        ) : (


                            <li className="font-medium transition-all duration-150">
                                <Link
                                    className="flex items-center space-x-2 px-4 py-[6px]
                                    bg-linear-to-r from-purple-600 to-pink-500
                                    text-white font-semibold rounded-md shadow-lg
                                    hover:from-purple-500 hover:to-red-400 transition duration-300"
                                    to="/login"
                                >
                                    <FaSignInAlt />
                                    <span>Login</span>
                                </Link>
                            </li>)}
                    </ul>

                    {/* ── Mobile: cart icon + hamburger ── */}
                    <div className="sm:hidden flex items-center gap-4">
                        <Link to="/cart">
                            <Badge showZero badgeContent={cartCount} color="primary" overlap="circular"
                                anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                                <FaShoppingCart size={22} className="text-white" />
                            </Badge>
                        </Link>
                        <button onClick={() => setNavbarOpen(true)} aria-label="Open menu">
                            <IoIosMenu className="text-white text-3xl" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Mobile overlay backdrop ── */}
            <div
                className={`sm:hidden fixed inset-0 z-998 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${navbarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={close}
            />

            {/* ── Mobile slide-in glassmorphism panel ── */}
            <div
                className={`sm:hidden fixed top-0 right-0 h-full w-[75%] max-w-xs z-999
                    bg-white/10 backdrop-blur-2xl border-l border-white/20 shadow-2xl
                    flex flex-col px-7 py-8 gap-6
                    transition-transform duration-300 ease-in-out
                    ${navbarOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <Link to="/" onClick={close} className="flex items-center gap-2 text-white text-xl font-bold">
                        <FaStore size={22} />
                        E-Shop
                    </Link>
                    <button onClick={close} className="text-white/80 hover:text-white transition">
                        <RxCross2 size={26} />
                    </button>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-1">
                    {navLinks.map(({ label, to }) => (
                        <Link
                            key={label}
                            to={to}
                            onClick={close}
                            className={`py-3 px-4 rounded-xl text-base font-medium transition-all duration-150
                                ${path === to
                                    ? "bg-white/20 text-white font-semibold"
                                    : "text-white/80 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="border-t border-white/20" />

                {/* Login button / User Menu */}
                {(user && user.id) ? (
                    <div className="flex justify-center w-full">
                        <UserMenu />
                    </div>
                ) : (
                    <Link
                        to="/login"
                        onClick={close}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl
                            bg-linear-to-r from-purple-600 to-pink-500 text-white font-semibold
                            shadow-lg hover:from-purple-500 hover:to-red-400 transition duration-300"
                    >
                        <FaSignInAlt />
                        Login
                    </Link>
                )}

                <p className="text-white/40 text-xs text-center mt-auto">
                    © {new Date().getFullYear()} E-Shop
                </p>
            </div>
        </>
    );
};

export default Navbar;