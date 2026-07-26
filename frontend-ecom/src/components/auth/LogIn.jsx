import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaBolt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },

    } = useForm({
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        console.log("Login Click");
        dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));

    };


    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-[#0a0a1a] dark:via-[#0f0c29] dark:to-[#1a1040]" />
            <div className="absolute top-20 -left-20 w-72 h-72 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 -right-20 w-96 h-96 bg-violet-300/20 dark:bg-violet-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

            <form className="relative sm:w-[440px] w-[350px] bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl
                border border-gray-200/50 dark:border-gray-700/50
                py-8 sm:px-8 px-5 rounded-2xl shadow-xl shadow-indigo-500/5 dark:shadow-indigo-500/10
                animate-scale-in"
                onSubmit={handleSubmit(loginHandler)}
            >
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
                        <FaBolt className="text-white text-2xl" />
                    </div>
                    <h1 className="text-2xl font-extrabold gradient-text">
                        Welcome Back
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Sign in to your Zappit account</p>
                </div>

                <div className="flex flex-col gap-4">

                    {/* ── Google OAuth2 Button ── */}
                    <a
                        href={`${import.meta.env.VITE_BACK_END_URL || 'https://demo-deployment-xwwp.onrender.com'}/oauth2/authorization/google`}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl
                            border border-gray-200 dark:border-gray-700
                            bg-white dark:bg-gray-800
                            text-gray-700 dark:text-gray-200 font-semibold text-sm
                            hover:bg-gray-50 dark:hover:bg-gray-700
                            hover:border-gray-300 dark:hover:border-gray-600
                            hover:shadow-md transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    >
                        <FcGoogle className="text-xl flex-shrink-0" />
                        Continue with Google
                    </a>

                    {/* ── Divider ── */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                        <span className="text-xs text-slate-400 dark:text-gray-500 font-medium">or sign in with</span>
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                    </div>

                    <InputField
                        label="Username or Email"
                        required
                        id="username"
                        type="text"
                        message="*Username or Email is required"
                        placeholder="Enter your username or email"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required"
                        placeholder="Enter your password"
                        register={register}
                        errors={errors}
                    />
                </div>

                <div className="flex justify-end mt-1">
                    <Link
                        to="/forgot-password"
                        className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-bold"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <button
                    disabled={loader}
                    className="w-full mt-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500
                        text-white font-semibold shadow-lg shadow-indigo-500/30
                        hover:from-indigo-600 hover:to-violet-600 hover:shadow-xl hover:shadow-indigo-500/40
                        transition-all duration-300 hover:-translate-y-0.5
                        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    type="submit"
                >{loader ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Signing in...
                    </span>
                ) : (
                 <>Login</>
                 )}
                </button>

                <p className="text-center text-sm text-slate-500 dark:text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <Link className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors duration-200"
                        to="/register">
                        <span>Sign Up</span></Link>
                </p>

                <p className="text-center text-xs text-slate-400 dark:text-gray-500 mt-2">
                    Need to verify your email or resend OTP?{" "}
                    <Link className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                        to="/verify-otp">
                        <span>Verify Account</span></Link>
                </p>

            </form>
        </div>
    );
}

export default LogIn;