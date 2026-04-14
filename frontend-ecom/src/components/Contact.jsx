import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaBolt } from "react-icons/fa";
import React from 'react';

const contactInfo = [
    { icon: <FaPhone className="text-indigo-400" size={18} />, text: "+91 8600 683 959", href: "tel:+918600683959" },
    { icon: <FaEnvelope className="text-indigo-400" size={18} />, text: "choudharyvipul722@gmail.com", href: "mailto:choudharyvipul722@gmail.com" },
    { icon: <FaMapMarkedAlt className="text-indigo-400" size={18} />, text: "123 Main, Town, USA", href: null },
];

const Contact = () => {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-[#0a0a1a] dark:via-[#0f0c29] dark:to-[#1a1040]" />
            <div className="absolute top-20 -left-20 w-72 h-72 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 -right-20 w-96 h-96 bg-violet-300/20 dark:bg-violet-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

            <div className="relative flex flex-col items-center justify-center min-h-screen py-16 px-4">
                {/* Header */}
                <div className="text-center mb-10 animate-fade-in-down">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-800/40 mb-4">
                        <FaBolt size={10} />
                        Get In Touch
                    </span>
                    <h1 className="text-4xl font-extrabold gradient-text">Contact Us</h1>
                    <p className="text-slate-500 dark:text-gray-400 mt-2 max-w-md mx-auto text-sm">
                        We would love to hear from you! Fill out the form below or contact us directly.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50
                    shadow-xl shadow-indigo-500/5 dark:shadow-indigo-500/10 rounded-2xl p-8 w-full max-w-lg animate-scale-in">

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">
                                Name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full bg-gray-50 dark:bg-gray-800/80 text-slate-800 dark:text-gray-100
                                    border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400
                                    transition-all duration-300 text-sm" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full bg-gray-50 dark:bg-gray-800/80 text-slate-800 dark:text-gray-100
                                    border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400
                                    transition-all duration-300 text-sm" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">
                                Message
                            </label>
                            <textarea
                                rows="4"
                                required
                                className="w-full bg-gray-50 dark:bg-gray-800/80 text-slate-800 dark:text-gray-100
                                    border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400
                                    transition-all duration-300 text-sm resize-none" />
                        </div>

                        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500
                            text-white font-semibold shadow-lg shadow-indigo-500/30
                            hover:from-indigo-600 hover:to-violet-600 hover:shadow-xl hover:shadow-indigo-500/40
                            transition-all duration-300 hover:-translate-y-0.5 group">
                            Send Message
                            <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>

                    </form>

                    {/* Contact Info */}
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700/50">
                        <h2 className="text-sm font-semibold text-slate-800 dark:text-gray-100 mb-4 text-center uppercase tracking-wide">Contact Information</h2>
                        <div className="flex flex-col gap-4">
                            {contactInfo.map(({ icon, text, href }, i) => (
                                <div key={i} className="flex items-center gap-3 group">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center
                                        group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors duration-300">
                                        {icon}
                                    </div>
                                    {href ? (
                                        <a href={href} className="text-slate-600 dark:text-gray-400 text-sm hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200">{text}</a>
                                    ) : (
                                        <span className="text-slate-600 dark:text-gray-400 text-sm">{text}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default Contact;