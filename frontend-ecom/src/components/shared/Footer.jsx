import { Link, useLocation } from "react-router-dom";
import {
    FaFacebookF, FaTwitter, FaInstagram, FaYoutube,
    FaShoppingBag, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
} from "react-icons/fa";
import { MdStorefront } from "react-icons/md";

const Footer = () => {
    const location = useLocation();

    return (
        <footer className="bg-[#0f172a] text-slate-300">

            {/* ── Top Strip (Hidden on Checkout) ── */}
            {location.pathname !== "/checkout" && (
                <div className="bg-linear-to-r from-blue-600 to-indigo-700 py-4 px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-white font-semibold text-lg">
                        <FaShoppingBag size={20} />
                        <span>Free shipping on orders over <strong>$50</strong></span>
                    </div>
                    <Link
                        to="/products"
                        className="text-sm font-semibold bg-white text-blue-700 px-5 py-1.5 rounded-full hover:bg-blue-50 transition duration-200"
                    >
                        Shop Now →
                    </Link>
                </div>
            )}

            {/* ── Main Grid ── */}
            <div className="lg:px-14 sm:px-8 px-6 py-14 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">

                {/* Brand */}
                <div className="space-y-4">
                    <Link to="/" className="flex items-center gap-2 text-white text-2xl font-extrabold">
                        <MdStorefront size={28} className="text-blue-400" />
                        E-Shop
                    </Link>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Your one-stop destination for the latest products at unbeatable prices. Quality you can trust, delivered fast.
                    </p>
                    {/* Social icons */}
                    <div className="flex gap-3 pt-2">
                        {[
                            { icon: <FaFacebookF />, href: "#" },
                            { icon: <FaTwitter />, href: "#" },
                            { icon: <FaInstagram />, href: "#" },
                            { icon: <FaYoutube />, href: "#" },
                        ].map(({ icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                className="w-9 h-9 rounded-full bg-slate-700 hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition duration-200"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4 uppercase tracking-widest text-xs">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
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
                                    className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-150"
                                >
                                    → {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-white font-semibold mb-4 uppercase tracking-widest text-xs">Customer Service</h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            "FAQ",
                            "Shipping & Returns",
                            "Order Tracking",
                            "Size Guide",
                            "Privacy Policy",
                            "Terms & Conditions",
                        ].map((item) => (
                            <li key={item}>
                                <a href="#" className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-150">
                                    → {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-semibold mb-4 uppercase tracking-widest text-xs">Contact Us</h3>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-blue-400 mt-0.5 shrink-0" size={15} />
                            <span>123 Commerce Street,<br />New York, NY 10001, USA</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaPhoneAlt className="text-blue-400 shrink-0" size={14} />
                            <a href="tel:+11234567890" className="hover:text-white transition duration-150">+1 (123) 456-7890</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-blue-400 shrink-0" size={14} />
                            <a href="mailto:support@eshop.com" className="hover:text-white transition duration-150">support@eshop.com</a>
                        </li>
                    </ul>

                    {/* Newsletter */}
                    <div className="mt-6">
                        <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">Newsletter</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 bg-slate-700 text-sm text-white placeholder-slate-400 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-r-md transition duration-200">
                                Go
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="border-t border-slate-700 py-5 px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                <span>© {new Date().getFullYear()} E-Shop. All rights reserved.</span>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
                    <a href="#" className="hover:text-slate-300 transition">Terms of Use</a>
                    <a href="#" className="hover:text-slate-300 transition">Sitemap</a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
