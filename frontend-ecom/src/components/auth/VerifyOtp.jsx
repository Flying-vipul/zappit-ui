import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../../store/actions';
import InputField from '../shared/InputField';
import toast from 'react-hot-toast';
import { MdOutlineMailOutline } from 'react-icons/md';
import api from '../../api/api';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    // Get the email that was passed from the successful registration
    const initialEmail = location.state?.email || '';
    const [userEmail, setUserEmail] = useState(initialEmail);
    const [loader, setLoader] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const verifyHandler = async (data) => {
        if (!userEmail || !userEmail.trim()) {
            toast.error("Please enter your registered email address.");
            return;
        }

        const sendData = {
            email: userEmail.trim(),
            otp: data.otp
        };

        dispatch(verifyOtp(sendData, toast, navigate, setLoader));
    };

    const handleResendOtp = async () => {
        if (!userEmail || !userEmail.trim()) {
            toast.error("Please enter your email address to resend OTP.");
            return;
        }
        setResendLoader(true);
        try {
            const { data } = await api.post("/auth/resend-otp", { email: userEmail.trim() });
            toast.success(data.message || "A new OTP has been sent to your email!");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to resend OTP.");
        } finally {
            setResendLoader(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center py-10">
            <form className="sm:w-[450px] w-[350px] shadow-custom py-8 sm:px-8 px-4 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                onSubmit={handleSubmit(verifyHandler)}
            >
                <div className="flex flex-col items-center justify-center">
                    <MdOutlineMailOutline className="text-indigo-600 dark:text-indigo-400 text-5xl mb-2 animate-bounce" />
                    <h1 className="text-slate-800 dark:text-white text-center font-montserrat lg:text-3xl text-2xl font-bold">
                        Verify Your Email
                    </h1>
                </div>
                <hr className="mt-2 mb-5 text-slate-200 dark:text-slate-700" />

                <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    We have sent a 6-digit verification code to your email. Enter it below to activate your account.
                </p>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Registered Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="e.g. you@example.com"
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <InputField
                        label="Enter 6-Digit OTP"
                        required
                        id="otp"
                        type="text"
                        message="*OTP is required"
                        placeholder="e.g. 123456"
                        register={register}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={loader}
                    className="bg-gradient-to-r from-indigo-600 to-violet-600 flex gap-2 items-center justify-center font-bold text-white w-full py-3 hover:opacity-90 transition-all duration-200 rounded-xl shadow-md my-3 mt-6 disabled:opacity-50"
                    type="submit"
                >
                    {loader ? <>Verifying...</> : <>Verify & Activate Account</>}
                </button>

                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                        Didn't receive the code or closed your browser?
                    </p>
                    <button
                        type="button"
                        disabled={resendLoader}
                        onClick={handleResendOtp}
                        className="text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:underline disabled:opacity-50"
                    >
                        {resendLoader ? "Sending new code..." : "Resend Verification Code"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default VerifyOtp;
