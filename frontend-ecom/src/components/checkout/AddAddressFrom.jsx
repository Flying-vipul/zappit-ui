import React, { useEffect, useState } from 'react'
import InputField from '../shared/InputField';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { addUpdateUserAddress } from '../../store/actions';
import toast from 'react-hot-toast';

const AddAddressFrom = ({ address, setOpenAddressModal }) => {

    const { btnLoader } = useSelector((state) => state.errors || {});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    useEffect(() => {
        if (address) {
            reset(address);
        } else {
            reset({
                buildingName: "",
                city: "",
                state: "",
                pincode: "",
                street: "",
                country: ""
            });
        }
    }, [address, reset]);

    const onSaveAddressHandler = async (data) => {
        dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModal,
        ))
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSaveAddressHandler)}>
                <div className="flex justify-center flex-col items-center mb-6 font-semibold text-2xl text-slate-800 py-2 px-4 border-b pb-4">
                    <div className='flex items-center justify-center'>
                        <FaAddressCard className="text-2xl mr-2 text-blue-600" />
                        {address ? "Edit Address" : "Add Address"}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                    <InputField
                        label="Building Name"
                        required
                        id="buildingName"
                        type="text"
                        message="*Building Name is required"
                        placeholder="Enter Building Name"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="City"
                        required
                        id="city"
                        type="text"
                        message="*City is required"
                        placeholder="Enter City"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="State"
                        required
                        id="state"
                        type="text"
                        message="*State is required"
                        placeholder="Enter State"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="Pincode"
                        required
                        id="pincode"
                        type="text"
                        message="*Pincode is required"
                        placeholder="Enter Pincode"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="Street"
                        required
                        id="street"
                        type="text"
                        message="*Street is required"
                        placeholder="Enter Street"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="Country"
                        required
                        id="country"
                        type="text"
                        message="*Country is required"
                        placeholder="Enter Country"
                        register={register}
                        errors={errors}
                    />
                </div>

                <div className="flex justify-end mt-6 pt-4 border-t gap-3">
                    <button
                        onClick={() => setOpenAddressModal(false)}
                        type="button"
                        className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={btnLoader}
                        className="text-white bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700 transition-all font-medium"
                        type="submit"
                    >
                        {btnLoader ? "Loading..." : "Save Address"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddAddressFrom;