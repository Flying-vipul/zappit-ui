import { Badge } from "@mui/material";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaSignInAlt, FaBolt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "../UserMenu";
import { adminNavigation } from "../../utils";
import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

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
    const { isDark, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    const close = () => setNavbarOpen(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* ── Main bar ── */}
            <div className={`h-[70px] z-50 flex items-center sticky top-0 transition-all duration-500
                ${scrolled
                    ? "bg-[#0f0c29]/95 backdrop-blur-xl shadow-lg shadow-indigo-500/10"
                    : "bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
                }`}>
                <div className="lg:px-14 md:px-8 px-4 w-full flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" onClick={close} className="flex items-center gap-2 text-2xl font-bold group">
                        <div className="relative">
                            <FaBolt className="text-amber-400 text-2xl group-hover:animate-pulse transition-all duration-300" />
                            <div className="absolute inset-0 bg-amber-400/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="bg-gradient-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent font-extrabold tracking-tight">
                            Zappit
                        </span>
                    </Link>

                    {/* ── Desktop nav ── */}
                    <ul className="hidden md:flex md:gap-8 items-center">
                        {navLinks.map(({ label, to }) => (
                            <li key={label}>
                                <Link
                                    to={to}
                                    className={`relative py-2 px-1 text-sm font-medium tracking-wide transition-all duration-300
                                        ${path === to
                                            ? "text-white"
                                            : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {label}
                                    {/* Animated underline */}
                                    <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full transition-all duration-300
                                        ${path === to ? "w-full" : "w-0 group-hover:w-full"}`}
                                    />
                                </Link>
                            </li>
                        ))}

                        {/* Theme Toggle */}
                        <li className="flex items-center">
                            <button
                                onClick={toggleTheme}
                                className="relative w-9 h-9 rounded-full flex items-center justify-center
                                    bg-white/10 hover:bg-white/20 text-white transition-all duration-300
                                    hover:shadow-lg hover:shadow-indigo-500/20"
                                aria-label="Toggle Theme"
                            >
                                {isDark ? <FiSun size={18} className="text-amber-400" /> : <FiMoon size={18} />}
                            </button>
                        </li>

                        {/* Cart */}
                        <li>
                            <Link to="/cart" className="relative group">
                                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300
                                    hover:shadow-lg hover:shadow-indigo-500/20">
                                    <Badge showZero badgeContent={cartCount} color="primary" overlap="circular"
                                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                        sx={{
                                            '& .MuiBadge-badge': {
                                                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                                fontWeight: 700,
                                                fontSize: '0.65rem',
                                            }
                                        }}>
                                        <FaShoppingCart size={18} className="text-white" />
                                    </Badge>
                                </div>
                            </Link>
                        </li>

                        {/* Login / User */}
                        {(user && user.id) ? (
                            <li className="font-medium transition-all duration-150">
                                <UserMenu />
                            </li>
                        ) : (
                            <li className="font-medium">
                                <Link
                                    className="flex items-center gap-2 px-5 py-2
                                    bg-gradient-to-r from-indigo-500 to-violet-500
                                    text-white text-sm font-semibold rounded-full shadow-lg
                                    hover:from-indigo-400 hover:to-violet-400
                                    hover:shadow-indigo-500/40 hover:shadow-xl
                                    transition-all duration-300 hover:-translate-y-0.5"
                                    to="/login"
                                >
                                    <FaSignInAlt size={14} />
                                    <span>Login</span>
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* ── Mobile: cart icon + theme + hamburger ── */}
                    <div className="md:hidden flex items-center gap-3">
                        <button onClick={toggleTheme}
                            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300">
                            {isDark ? <FiSun size={18} className="text-amber-400" /> : <FiMoon size={18} />}
                        </button>
                        <Link to="/cart">
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                                <Badge showZero badgeContent={cartCount} color="primary" overlap="circular"
                                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                            fontWeight: 700,
                                            fontSize: '0.6rem',
                                            minWidth: '18px', height: '18px',
                                        }
                                    }}>
                                    <FaShoppingCart size={16} className="text-white" />
                                </Badge>
                            </div>
                        </Link>
                        <button onClick={() => setNavbarOpen(true)} aria-label="Open menu"
                            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">
                            <IoIosMenu className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Mobile overlay backdrop ── */}
            <div
                className={`md:hidden fixed inset-0 z-998 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${navbarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={close}
            />

            {/* ── Mobile slide-in glassmorphism panel ── */}
            <div
                className={`md:hidden fixed top-0 right-0 h-full w-[80%] max-w-xs z-999
                    bg-[#0f0c29]/90 backdrop-blur-2xl border-l border-white/10 shadow-2xl
                    flex flex-col px-7 py-8 gap-6
                    transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${navbarOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <Link to="/" onClick={close} className="flex items-center gap-2 text-xl font-bold">
                        <FaBolt className="text-amber-400" />
                        <span className="bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent font-extrabold">
                            Zappit
                        </span>
                    </Link>
                    <button onClick={close} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300">
                        <RxCross2 size={18} />
                    </button>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-1 overflow-y-auto">
                    {path.startsWith('/admin') ? (
                        <>
                            <div className="text-indigo-400/60 text-xs font-bold uppercase tracking-wider px-4 mb-2 mt-2">Admin Dashboard</div>
                            {adminNavigation.map((item, i) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={close}
                                    style={{ animationDelay: `${i * 0.07}s` }}
                                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 animate-fade-in-up
                                        ${path === item.href
                                            ? "bg-indigo-500/20 text-white font-semibold border border-indigo-500/30"
                                            : "text-white/70 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <item.icon className="text-lg" />
                                    {item.name}
                                </Link>
                            ))}
                            <div className="border-t border-white/10 my-4" />
                            <div className="text-indigo-400/60 text-xs font-bold uppercase tracking-wider px-4 mb-2">Main Site</div>
                            <Link to="/" onClick={close} className="py-2 px-4 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5">Back to Store</Link>
                        </>
                    ) : (
                        navLinks.map(({ label, to }, i) => (
                            <Link
                                key={label}
                                to={to}
                                onClick={close}
                                style={{ animationDelay: `${i * 0.07}s` }}
                                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 animate-fade-in-up
                                    ${path === to
                                        ? "bg-indigo-500/20 text-white font-semibold border border-indigo-500/30"
                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {label}
                            </Link>
                        ))
                    )}
                </nav>

                <div className="border-t border-white/10 mt-auto" />

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
                            bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold
                            shadow-lg hover:shadow-indigo-500/40 transition-all duration-300"
                    >
                        <FaSignInAlt />
                        Login
                    </Link>
                )}

                <p className="text-white/30 text-xs text-center mt-2 font-inter">
                    © {new Date().getFullYear()} Zappit
                </p>
            </div>
        </>
    );
};

export default Navbar;