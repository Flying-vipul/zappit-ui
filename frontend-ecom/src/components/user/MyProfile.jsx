import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, IconButton } from '@mui/material';
import { FaCamera, FaEnvelope, FaShoppingBag, FaUserCog } from 'react-icons/fa';
import { updateUserProfileImage } from '../../store/actions';
import toast from 'react-hot-toast';
import Spinners from '../shared/Spinners';
import { Link } from 'react-router-dom';

const MyProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [loader, setLoader] = useState(false);

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validation
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image must be less than 5MB");
                return;
            }
            if (!file.type.startsWith("image/")) {
                toast.error("Please select a valid image file");
                return;
            }

            const formData = new FormData();
            formData.append("image", file);
            dispatch(updateUserProfileImage(formData, toast, setLoader));
        }
    };

    return (
        <div className="min-h-[calc(100vh-70px)] bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl space-y-8">
                
                {/* Header Profile Card */}
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden relative">
                    <div className="h-40 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
                        {/* Optionally add an edit profile banner cover here */}
                    </div>
                    
                    <div className="px-6 py-8 flex flex-col md:flex-row items-center gap-6 -mt-20">
                        {/* Avatar Image Picker */}
                        <div 
                            className="relative group cursor-pointer border-4 border-white rounded-full bg-white shadow-xl flex-shrink-0"
                            onClick={handleAvatarClick}
                        >
                            <input 
                                type="file" 
                                className="hidden" 
                                ref={fileInputRef} 
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            
                            {loader ? (
                                <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-100">
                                    <Spinners />
                                </div>
                            ) : (
                                <Avatar 
                                    src={user?.profileImage} 
                                    sx={{ width: 128, height: 128 }} 
                                    className="transition-opacity duration-300 group-hover:opacity-75"
                                />
                            )}
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <FaCamera className="text-white text-3xl" />
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="text-center md:text-left mt-4 md:mt-16 flex-grow">
                            <h2 className="text-3xl font-extrabold text-gray-900 pb-1 flex items-center justify-center md:justify-start gap-2">
                                {user?.username} <FaUserCog className="text-gray-400 text-xl" />
                            </h2>
                            <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 text-md mt-1">
                                <FaEnvelope /> {user?.email || "Email not provided"}
                            </p>
                            
                            {/* Role Badges */}
                            <div className="mt-3 flex gap-2 justify-center md:justify-start">
                                {user?.roles?.map((role) => (
                                    <span key={role} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase">
                                        {role.replace("ROLE_", "")}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Dashboard Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Orders Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
                        <div className="flex items-center gap-4 text-custom-blue mb-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <FaShoppingBag className="text-3xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">My Orders</h3>
                                <p className="text-sm text-gray-500">Track, return, or buy things again</p>
                            </div>
                        </div>
                        <div className="mt-4 border-t pt-4">
                            <Link to="/profile/orders" className="text-blue-600 hover:text-blue-800 font-semibold w-full block text-center bg-blue-50 py-2 rounded-lg transition-colors">
                                View Order History &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Security/Settings Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
                        <div className="flex items-center gap-4 text-purple-600 mb-4">
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <FaUserCog className="text-3xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Account Security</h3>
                                <p className="text-sm text-gray-500">Manage account safety</p>
                            </div>
                        </div>
                        <div className="mt-4 border-t pt-4">
                            {/* Informational placeholder for now */}
                            <button className="text-purple-600 hover:text-purple-800 font-semibold w-full block text-center bg-purple-50 py-2 rounded-lg transition-colors" opacity="0.6">
                                Update Password (Coming Soon)
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyProfile;
