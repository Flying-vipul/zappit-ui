import React, { useState } from 'react'
import { FaBuilding, FaCheckCircle, FaEdit, FaStreetView, FaTrash } from 'react-icons/fa';
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAddress, selectUserCheckoutAddress } from '../../store/actions';
import toast from 'react-hot-toast';
import AddressInfoModal from './AddressInfoModal';

const AddressList = ({ addresses, setSelectedAddress, setOpenAddressModal }) => {
    const dispatch = useDispatch();
    const { selectedUserAddress } = useSelector((state) => state.auth);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [loader, setLoader] = useState(false);

    const handleAddressSelection = (address) => {
        dispatch(selectUserCheckoutAddress(address));
    };

    const onEditButtonHandler = (address) => {
        setCurrentAddress(address);
        setOpenEditModal(true);
    };

    const onDeleteButtonHandler = (address) => {
        setCurrentAddress(address);
        setOpenDeleteModal(true);
    };

    const confirmEdit = () => {
        setSelectedAddress(currentAddress);
        setOpenEditModal(false);
        setOpenAddressModal(true);
    };

    const confirmDelete = () => {
        dispatch(deleteUserAddress(currentAddress?.addressId, toast, setLoader));
        setOpenDeleteModal(false);
    };

    return (
        <div className='space-y-4'>
            {addresses.map((address) => (
                <div
                    key={address.addressId}
                    onClick={() => handleAddressSelection(address)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 relative ${selectedUserAddress?.addressId === address.addressId
                        ? "border-green-500 bg-green-50 ring-1 ring-green-500 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                        }`}  >

                    {selectedUserAddress?.addressId === address.addressId && (
                        <div className="absolute top-4 right-18 text-green-500">
                            <FaCheckCircle size={22} />
                        </div>
                    )}

                    <div className='flex items-start'>
                        <div className='space-y-2.5 w-full pr-10'>
                            <div className='flex items-start'>
                                <FaBuilding size={16} className='mr-3 mt-1 shrink-0 text-slate-500' />
                                <p className='text-base font-semibold text-slate-800'>{address.buildingName}</p>
                            </div>

                            <div className='flex items-start'>
                                <FaStreetView size={18} className='mr-3 mt-0.5 shrink-0 text-slate-500' />
                                <p className='text-sm text-slate-600 leading-relaxed'>{address.street}</p>
                            </div>

                            <div className='flex items-start'>
                                <MdLocationCity size={18} className='mr-3 mt-0.5 shrink-0 text-slate-500' />
                                <p className='text-sm text-slate-600'>{address.city}, {address.state}</p>
                            </div>

                            <div className='flex items-start'>
                                <MdPinDrop size={18} className='mr-3 mt-0.5 shrink-0 text-slate-500' />
                                <p className='text-sm text-slate-600'>{address.pincode}</p>
                            </div>

                            <div className='flex items-start'>
                                <MdPublic size={18} className='mr-3 mt-0.5 shrink-0 text-slate-500' />
                                <p className='text-sm text-slate-600'>{address.country}</p>
                            </div>

                        </div>
                    </div>

                    <div className='flex gap-3 absolute top-4 right-2'>
                        <button onClick={(e) => { e.stopPropagation(); onEditButtonHandler(address); }}>
                            <FaEdit size={18} className='text-teal-700' />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); onDeleteButtonHandler(address); }}>
                            <FaTrash size={17} className='text-rose-600' />
                        </button>
                    </div>

                </div>
            ))}

            {/* Edit Confirmation Modal */}
            <AddressInfoModal open={openEditModal} setOpen={setOpenEditModal}>
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900">Edit Address</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Are you sure you want to edit this address?
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                        <button
                            onClick={() => setOpenEditModal(false)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmEdit}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Yes, Edit
                        </button>
                    </div>
                </div>
            </AddressInfoModal>

            {/* Delete Confirmation Modal */}
            <AddressInfoModal open={openDeleteModal} setOpen={setOpenDeleteModal}>
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900">Delete Address</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Are you sure you want to delete this address? This action cannot be undone.
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                        <button
                            onClick={() => setOpenDeleteModal(false)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                            disabled={loader}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                            disabled={loader}
                        >
                            {loader ? 'Deleting...' : 'Yes, Delete'}
                        </button>
                    </div>
                </div>
            </AddressInfoModal>
        </div>
    )
}

export default AddressList