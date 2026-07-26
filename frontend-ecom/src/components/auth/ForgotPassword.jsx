import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/api';
import { MdLockReset } from 'react-icons/md';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error('Please enter your email address.');
            return;
        }
        setLoader(true);
        try {
            const { data } = await api.post('/auth/forgot-password', { email: email.trim() });
            toast.success(data.message || 'Reset code sent! Check your inbox.');
            navigate('/reset-password', { state: { email: email.trim() } });
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to send reset code. Please try again.');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-slate-50 dark:bg-slate-950">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-800 overflow-hidden">
                    {/* Header gradient */}
                    <div className="bg-gradient-to-br from-rose-600 via-rose-500 to-orange-400 px-8 py-10 text-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <MdLockReset className="text-white text-3xl" />
                        </div>
                        <h1 className="text-2xl font-black text-white">Forgot Password?</h1>
                        <p className="text-rose-100 text-sm mt-2 leading-relaxed">
                            No worries! Enter your registered email and we'll send you a reset code.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
                        <div>
                            <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                Registered Email Address
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-semibold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loader}
                            className="w-full py-4 bg-gradient-to-r from-rose-600 to-orange-500 text-white font-black rounded-2xl shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 text-sm uppercase tracking-wider"
                        >
                            {loader ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Sending Reset Code...
                                </span>
                            ) : 'Send Reset Code'}
                        </button>

                        <div className="text-center pt-2">
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-semibold transition-colors"
                            >
                                <FaArrowLeft size={12} /> Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
