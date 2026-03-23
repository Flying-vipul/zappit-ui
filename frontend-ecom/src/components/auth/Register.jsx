import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineLogin } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../shared/InputField';
import { FaUserPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { registerNewUser } from '../../store/actions';
import toast from 'react-hot-toast';

const Register = () => {
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

    const registerHandler = async (data) => {
        console.log("Register Click");

        if (data.password !== data.confirmPassword) {
            toast.error("Password and Confirm Password must match!");
            return;
        }

        // Omit confirmPassword from the payload sent to the backend
        const { confirmPassword, ...sendData } = data;

        dispatch(registerNewUser(sendData, toast, reset, navigate, setLoader));
    };


    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form className="sm:w-[450px] w-[350px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
                onSubmit={handleSubmit(registerHandler)}
            >
                <div className="flex flex-col items-center justify-center">
                    <FaUserPlus className="text-slate-800 text-5xl" />
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                        Register Here
                    </h1>
                </div>
                <hr className="mt-2 mb-5 text-black" />
                <div className="flex flex-col gap-3">
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
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is required"
                        placeholder="Enter your Email"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="Password"
                        required
                        id="password"
                        min={6}
                        type="password"
                        message="*Password is required"
                        placeholder="Enter your password"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="Confirm Password"
                        required
                        id="confirmPassword"
                        min={6}
                        type="password"
                        message="*Confirm Password is required"
                        placeholder="Confirm your password"
                        register={register}
                        errors={errors}
                    />


                </div>

                <button
                    disabled={loader}
                    className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3 "
                    type="submit"
                >{loader ? (
                    <>Loading...</>
                ) : <>Register</>}
                </button>

                <p className="text-center text-sm text-slate-700 mt-6 ">
                    Already have an account?
                    <Link className="underline hover:text-black font-semibold"
                        to="/login">
                        <span>Login</span></Link>
                </p>

            </form>
        </div>
    );
}

export default Register;