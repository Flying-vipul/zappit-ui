import { Link, useLocation } from "react-router-dom";
import {
    FaFacebookF, FaTwitter, FaInstagram, FaYoutube,
    FaShoppingBag, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaBolt,
} from "react-icons/fa";

const Footer = () => {
    const location = useLocation();

    return (
        <footer className="relative bg-[#0a0a1a] text-slate-300 overflow-hidden">

            {/* Background mesh gradient */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl" />
            </div>

            {/* ── Top Strip (Hidden on Checkout) ── */}
            {location.pathname !== "/checkout" && (
                <div className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 py-4 px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-white font-semibold text-base">
                        <FaShoppingBag size={18} />
                        <span>Free shipping on orders over <strong>$50</strong></span>
                    </div>
                    <Link
                        to="/products"
                        className="text-sm font-semibold bg-white text-indigo-700 px-6 py-1.5 rounded-full hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Shop Now →
                    </Link>
                </div>
            )}

            {/* ── Main Grid ── */}
            <div className="relative lg:px-14 sm:px-8 px-6 py-16 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">

                {/* Brand */}
                <div className="space-y-5">
                    <Link to="/" className="flex items-center gap-2 text-white text-2xl font-extrabold group">
                        <div className="relative">
                            <FaBolt size={22} className="text-amber-400 group-hover:animate-pulse" />
                        </div>
                        <span className="bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                            Zappit
                        </span>
                    </Link>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Your premium destination for the latest products at unbeatable prices. Quality you can trust, delivered fast.
                    </p>
                    {/* Social icons */}
                    <div className="flex gap-3 pt-2">
                        {[
                            { icon: <FaFacebookF size={14} />, href: "#" },
                            { icon: <FaTwitter size={14} />, href: "#" },
                            { icon: <FaInstagram size={14} />, href: "#" },
                            { icon: <FaYoutube size={14} />, href: "#" },
                        ].map(({ icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-indigo-500 border border-white/10 hover:border-indigo-400
                                    flex items-center justify-center text-slate-400 hover:text-white
                                    transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-5 uppercase tracking-widest text-xs">Quick Links</h3>
                    <ul className="space-y-3 text-sm">
                        {[
                            { label: "Home", to: "/" },
                            { label: "Products", to: "/products" },
                            { label: "About Us", to: "/about" },
                            { label: "Contact", to: "/contact" },
                            { label: "Cart", to: "/cart" },
                        ].map(({ label, to }) => (
                            <li key={label}>
                                <Link
                                    to={to}
                                    className="text-slate-400 hover:text-indigo-400 hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 group-hover:bg-indigo-400 transition-colors duration-300" />
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-white font-semibold mb-5 uppercase tracking-widest text-xs">Customer Service</h3>
                    <ul className="space-y-3 text-sm">
                        {[
                            "FAQ",
                            "Shipping & Returns",
                            "Order Tracking",
                            "Size Guide",
                            "Privacy Policy",
                            "Terms & Conditions",
                        ].map((item) => (
                            <li key={item}>
                                <a href="#" className="text-slate-400 hover:text-indigo-400 hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 group-hover:bg-violet-400 transition-colors duration-300" />
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-semibold mb-5 uppercase tracking-widest text-xs">Contact Us</h3>
                    <ul className="space-y-4 text-sm text-slate-400">
                        <li className="flex items-start gap-3">
                            <div className="w-8 h-8 shrink-0 rounded-lg bg-indigo-500/10 flex items-center justify-center mt-0.5">
                                <FaMapMarkerAlt className="text-indigo-400" size={14} />
                            </div>
                            <span>123 Commerce Street,<br />New York, NY 10001, USA</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 shrink-0 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                <FaPhoneAlt className="text-indigo-400" size={13} />
                            </div>
                            <a href="tel:+11234567890" className="hover:text-indigo-400 transition duration-200">+1 (123) 456-7890</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 shrink-0 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                <FaEnvelope className="text-indigo-400" size={13} />
                            </div>
                            <a href="mailto:support@zappit.com" className="hover:text-indigo-400 transition duration-200">support@zappit.com</a>
                        </li>
                    </ul>

                    {/* Newsletter */}
                    <div className="mt-7">
                        <p className="text-xs text-slate-400 mb-3 uppercase tracking-wide font-semibold">Newsletter</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 px-4 py-2.5 rounded-l-xl
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all duration-300"
                            />
                            <button className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white text-sm px-5 py-2.5 rounded-r-xl transition-all duration-300 font-semibold">
                                Go
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="relative border-t border-white/5 py-5 px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                <span>© {new Date().getFullYear()} Zappit. All rights reserved.</span>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-indigo-400 transition-colors duration-200">Privacy Policy</a>
                    <a href="#" className="hover:text-indigo-400 transition-colors duration-200">Terms of Use</a>
                    <a href="#" className="hover:text-indigo-400 transition-colors duration-200">Sitemap</a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
