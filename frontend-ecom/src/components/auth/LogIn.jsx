import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaBolt } from "react-icons/fa";
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
                    <InputField
                        label="UserName"
                        required
                        id="username"
                        type="text"
                        message="*UserName is required"
                        placeholder="Enter your username"
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

                <button
                    disabled={loader}
                    className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500
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

            </form>
        </div>
    );
}

export default LogIn;