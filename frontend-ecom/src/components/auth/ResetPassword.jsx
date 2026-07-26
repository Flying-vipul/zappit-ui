import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/api';
import { MdLockReset } from 'react-icons/md';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialEmail = location.state?.email || '';

    const [email, setEmail] = useState(initialEmail);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loader, setLoader] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);

    const handleResend = async () => {
        if (!email.trim()) {
            toast.error('Please enter your email address first.');
            return;
        }
        setResendLoader(true);
        try {
            const { data } = await api.post('/auth/forgot-password', { email: email.trim() });
            toast.success(data.message || 'A new reset code has been sent!');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to resend. Please try again.');
        } finally {
            setResendLoader(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !otp.trim() || !newPassword) {
            toast.error('All fields are required.');
            return;
        }
        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters.');
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        setLoader(true);
        try {
            const { data } = await api.post('/auth/reset-password', {
                email: email.trim(),
                otp: otp.trim(),
                newPassword,
            });
            toast.success(data.message || 'Password reset successful!');
            navigate('/login');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-slate-50 dark:bg-slate-950">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-800 overflow-hidden">
                    {/* Header gradient */}
                    <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-8 py-10 text-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <MdLockReset className="text-white text-3xl" />
                        </div>
                        <h1 className="text-2xl font-black text-white">Reset Your Password</h1>
                        <p className="text-indigo-200 text-sm mt-2 leading-relaxed">
                            Enter the 6-digit code sent to your email and choose a new password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3.5 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-semibold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                            />
                        </div>

                        {/* OTP */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                    6-Digit Reset Code
                                </label>
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={resendLoader}
                                    className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline disabled:opacity-50"
                                >
                                    {resendLoader ? 'Sending...' : 'Resend Code'}
                                </button>
                            </div>
                            <input
                                type="text"
                                required
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                placeholder="e.g. 472910"
                                className="w-full px-4 py-3.5 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-center text-xl font-black tracking-[0.5em] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="At least 6 characters"
                                    className="w-full pl-4 pr-12 py-3.5 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-semibold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(p => !p)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter new password"
                                    className={`w-full pl-4 pr-12 py-3.5 border-2 rounded-2xl text-sm font-semibold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all ${
                                        confirmPassword && newPassword !== confirmPassword
                                            ? 'border-rose-400 focus:border-rose-500'
                                            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(p => !p)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                                >
                                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {confirmPassword && newPassword !== confirmPassword && (
                                <p className="text-xs text-rose-500 font-semibold mt-1.5 pl-1">Passwords do not match</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loader || (confirmPassword && newPassword !== confirmPassword)}
                            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 text-sm uppercase tracking-wider mt-2"
                        >
                            {loader ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Resetting Password...
                                </span>
                            ) : 'Reset Password'}
                        </button>

                        <div className="text-center pt-1">
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

export default ResetPassword;
