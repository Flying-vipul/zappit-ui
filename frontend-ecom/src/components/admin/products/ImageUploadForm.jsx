import React, { useRef, useState } from 'react'
import { FaCloudUploadAlt, FaTrash, FaCheckCircle } from 'react-icons/fa'
import Spinners from '../../shared/Spinners';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductImagesFromDashboard } from '../../../store/actions';

const ImageUploadForm = ({ setOpen, product }) => {
    const [loader, setLoader] = useState(false);
    const fileInputRef = useRef();
    const [previewImages, setPreviewImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

    // Existing gallery count
    const existingImages = product?.images && product.images.length > 0
        ? product.images
        : (product?.image && product.image !== "default.png" && !product.image.includes("default.png") ? [product.image] : []);
    const existingCount = existingImages.length;

    const onHandleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => ["image/jpeg", "image/jpg", "image/png"].includes(file.type));

        if (validFiles.length !== files.length) {
            toast.error("Please select valid image files (.jpeg, .jpg, .png)");
        }

        if (validFiles.length === 0) return;

        const totalAfterSelection = existingCount + selectedFiles.length + validFiles.length;
        if (totalAfterSelection > 5) {
            const allowed = Math.max(0, 5 - (existingCount + selectedFiles.length));
            toast.error(`Cannot exceed 5 images total! You already have ${existingCount} existing and ${selectedFiles.length} selected. You can add at most ${allowed} more.`);
            return;
        }

        const newFiles = [...selectedFiles, ...validFiles];
        setSelectedFiles(newFiles);

        // Generate data URL previews
        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages(prev => [...prev, { name: file.name, url: reader.result }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemovePreview = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    const addNewImageHandler = async (event) => {
        event.preventDefault();
        const totalCount = existingCount + selectedFiles.length;

        if (selectedFiles.length === 0) {
            toast.error("Please select at least one image to upload.");
            return;
        }

        if (totalCount < 2) {
            toast.error(`A product must have at least 2 images! Currently total is ${totalCount} (${existingCount} existing + ${selectedFiles.length} new). Please select more images.`);
            return;
        }

        if (totalCount > 5) {
            toast.error(`A product can have at most 5 images! Currently total is ${totalCount}.`);
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append("images", file);
        });

        dispatch(updateProductImagesFromDashboard(formData, product.id, toast, setLoader, setOpen, isAdmin));
    };

    const handleClearImages = () => {
        setPreviewImages([]);
        setSelectedFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    return (
        <div className='py-5 relative h-full flex flex-col justify-between'>
            <form className='space-y-4 flex-1 flex flex-col' onSubmit={addNewImageHandler}>
                <div className='flex flex-col gap-4 w-full flex-1 overflow-y-auto max-h-[60vh] pr-1'>
                    
                    {/* Guidance / Status Bar */}
                    <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 flex justify-between items-center'>
                        <span><strong>Requirement:</strong> Minimum 2, Maximum 5 images per product.</span>
                        <span className='font-semibold px-2 py-0.5 bg-blue-100 rounded text-blue-900'>
                            Total: {existingCount + selectedFiles.length} / 5
                        </span>
                    </div>

                    {/* Existing Gallery Display */}
                    {existingImages.length > 0 && (
                        <div className='border border-gray-200 rounded-lg p-3 bg-gray-50'>
                            <p className='text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                                <FaCheckCircle className='text-green-600' /> Existing Preserved Gallery ({existingImages.length} image{existingImages.length > 1 ? 's' : ''}):
                            </p>
                            <div className='flex flex-wrap gap-2'>
                                {existingImages.map((imgUrl, idx) => (
                                    <div key={idx} className='relative group w-16 h-16 rounded border border-gray-300 overflow-hidden bg-white shadow-sm'>
                                        <img src={imgUrl} alt={`Existing ${idx}`} className='w-full h-full object-cover' />
                                        {idx === 0 && (
                                            <span className='absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] text-center py-0.5 font-medium'>Cover</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upload Dropzone */}
                    {existingCount + selectedFiles.length < 5 ? (
                        <label className='flex flex-col items-center gap-2 cursor-pointer text-custom-blue border-2 border-dashed border-custom-blue/70 hover:border-custom-blue rounded-xl p-6 w-full justify-center bg-blue-50/30 hover:bg-blue-50/60 transition-all'>
                            <FaCloudUploadAlt size={32} className='animate-bounce' />
                            <span className='font-semibold text-sm'>Select Gallery Images to Add</span>
                            <span className='text-xs text-gray-500'>You can select up to {5 - (existingCount + selectedFiles.length)} more image(s) (.jpg, .png)</span>
                            <input 
                                type='file'
                                ref={fileInputRef}
                                onChange={onHandleImageChange}
                                className='hidden'
                                multiple
                                accept='.jpeg, .jpg, .png'/>
                        </label>
                    ) : (
                        <div className='text-center p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs font-medium'>
                            Maximum limit of 5 images reached. Remove some selected files if you wish to choose different ones.
                        </div>
                    )}

                    {/* Selected Files Preview Grid */}
                    {previewImages.length > 0 && (
                        <div className='border border-gray-200 rounded-lg p-3 bg-white shadow-sm'>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-xs font-semibold text-gray-700'>
                                    New Images to Upload ({previewImages.length}):
                                </p>
                                <button
                                    type='button'
                                    onClick={handleClearImages}
                                    className='text-xs text-rose-600 hover:text-rose-700 font-medium underline'>
                                    Clear All
                                </button>
                            </div>
                            <div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
                                {previewImages.map((item, idx) => (
                                    <div key={idx} className='relative group rounded-lg border border-gray-200 overflow-hidden bg-gray-50 aspect-square flex items-center justify-center'>
                                        <img
                                            src={item.url}
                                            alt={item.name}
                                            className='w-full h-full object-cover'/>
                                        <button
                                            type='button'
                                            onClick={() => handleRemovePreview(idx)}
                                            title="Remove image"
                                            className='absolute top-1 right-1 bg-rose-600 text-white rounded-full p-1 opacity-85 hover:opacity-100 transition-opacity shadow'>
                                            <FaTrash size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className='flex w-full justify-between items-center pt-4 border-t border-gray-100 mt-auto'>
                    <Button disabled={loader}
                            onClick={() => setOpen(false)}
                            variant='outlined'
                            className='text-gray-600 border-gray-300 py-2 px-5 text-sm font-medium rounded-lg hover:bg-gray-50'>
                        Cancel
                    </Button>

                    <Button
                        disabled={loader || selectedFiles.length === 0}
                        type='submit'
                        variant='contained'
                        color='primary'
                        className='bg-custom-blue hover:bg-blue-700 text-white py-2 px-6 text-sm font-semibold rounded-lg shadow-md transition-all disabled:opacity-50 disabled:bg-gray-400'>
                        {loader ? (
                            <div className='flex gap-2 items-center'>
                                <Spinners /> Uploading...
                            </div>
                        ) : (
                            `Upload ${selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}`
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ImageUploadForm