import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../../store/actions';
import InputField from '../shared/InputField';
import toast from 'react-hot-toast';
import { MdOutlineMailOutline } from 'react-icons/md';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    // Get the email that was passed from the successful registration
    const userEmail = location.state?.email || '';

    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const verifyHandler = async (data) => {
        if (!userEmail) {
            toast.error("Missing email. Please register again.");
            return;
        }

        const sendData = {
            email: userEmail,
            otp: data.otp
        };

        dispatch(verifyOtp(sendData, toast, navigate, setLoader));
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form className="sm:w-[450px] w-[350px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
                onSubmit={handleSubmit(verifyHandler)}
            >
                <div className="flex flex-col items-center justify-center">
                    <MdOutlineMailOutline className="text-slate-800 text-5xl mb-2" />
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                        Verify Your Email
                    </h1>
                </div>
                <hr className="mt-2 mb-5 text-black" />

                <p className="text-center text-sm text-slate-700 mb-6">
                    We've sent an OTP to <span className="font-semibold text-black">{userEmail || 'your email address'}</span>. Please enter it below to verify your account.
                </p>

                <div className="flex flex-col gap-3">
                    <InputField
                        label="Enter OTP"
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
                    className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3 mt-6"
                    type="submit"
                >
                    {loader ? <>Verifying...</> : <>Verify Account</>}
                </button>
            </form>
        </div>
    );
}

export default VerifyOtp;
