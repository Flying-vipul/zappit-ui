import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../shared/InputField';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProductFromDashboard, fetchCategories, updateProductFromDashboard, updateProductImageFromDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';
import Spinners from '../../shared/Spinners';
import SelectTextField from '../../shared/SelectTextField';
import Skeleton from '../../shared/Skeleton';
import ErrorPage from '../../shared/ErrorPage';
import { FaCloudUploadAlt } from 'react-icons/fa';

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL"];

const AddProductForm = ({ setOpen, product, update=false}) => {
const [loader, setLoader] = useState(false);
const [selectedCategory, setSelectedCategory] = useState();
const [previewImage, setPreviewImage] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);
const fileInputRef = useRef();

// --- Variation State ---
const [selectedSizes, setSelectedSizes] = useState([]);
const [productColors, setProductColors] = useState([]); // array of "Name:#HEX"
const [colorName, setColorName] = useState("");
const [colorHex, setColorHex] = useState("#6366f1");

const { categories } = useSelector((state) => state.products);
const { categoryLoader, errorMessage } = useSelector((state) => state.errors);
const { user } = useSelector((state) => state.auth);
const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        mode: "onTouched"
    });

    // Detect if selected category is "Clothes"
    const isClothesCategory = selectedCategory?.categoryName?.toLowerCase() === "clothes";

    const toggleSize = (size) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const addColor = () => {
        const name = colorName.trim();
        if (!name) {
            toast.error("Please enter a color name");
            return;
        }
        const colorEntry = `${name}:${colorHex}`;
        if (productColors.some(c => c.toLowerCase().startsWith(name.toLowerCase() + ":"))) {
            toast.error("This color name is already added");
            return;
        }
        setProductColors(prev => [...prev, colorEntry]);
        setColorName("");
        setColorHex("#6366f1");
    };

    const removeColor = (index) => {
        setProductColors(prev => prev.filter((_, i) => i !== index));
    };

    const onHandleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        } else {
            toast.error("Please select a valid image file (.jpeg, .jpg, .png)");
            setPreviewImage(null);
            setSelectedFile(null);
        }
    };

    const handleClearImage = () => {
        setPreviewImage(null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const saveProductHandler = (data) => {
        setLoader(true);
        const dummySetOpen = () => {};

        // Build variation data only for Clothes category
        const variationData = isClothesCategory ? {
            sizes: selectedSizes,
            colors: productColors,
        } : {
            sizes: [],
            colors: [],
        };

        if (!update) {
            const sendData = {
                ...data,
                ...variationData,
                categoryId: selectedCategory.categoryId,
            };
            dispatch(addNewProductFromDashboard(sendData, toast, reset, setLoader, dummySetOpen, isAdmin))
                .then((newProduct) => {
                    if (newProduct && selectedFile) {
                        const formData = new FormData();
                        formData.append("image", selectedFile);
                        dispatch(updateProductImageFromDashboard(formData, newProduct.productId, toast, setLoader, setOpen, isAdmin));
                    } else {
                        setOpen(false);
                    }
                }).catch(() => setLoader(false));
        } else {
            const sendData = {
                ...data,
                ...variationData,
                id: product.id,
            };
            dispatch(updateProductFromDashboard(sendData, toast, reset, setLoader, dummySetOpen, isAdmin))
                .then(() => {
                    if (selectedFile) {
                        const formData = new FormData();
                        formData.append("image", selectedFile);
                        dispatch(updateProductImageFromDashboard(formData, product.id, toast, setLoader, setOpen, isAdmin));
                    } else {
                        setOpen(false);
                    }
                }).catch(() => setLoader(false));
        }
    };


    useEffect(() => {
        if (update && product) {
            setValue("productName", product?.productName);
            setValue("price", product?.price);
            setValue("quantity", product?.quantity);
            setValue("discount", product?.discount);
            setValue("specialPrice", product?.specialPrice);
            setValue("description", product?.description);
            // Pre-populate variations for clothing products
            if (product?.sizes && Array.isArray(product.sizes)) {
                setSelectedSizes(product.sizes);
            }
            if (product?.colors && Array.isArray(product.colors)) {
                setProductColors(product.colors);
            }
        }
    }, [update, product]);


    useEffect(() => {
        if (!update) {
            dispatch(fetchCategories());
        }
    }, [dispatch, update]);

    useEffect(() => {
        if (!categoryLoader && categories) {
            setSelectedCategory(categories[0]);
        }
    }, [categories, categoryLoader]);

    if (categoryLoader) return <Skeleton />
    if (errorMessage) return <ErrorPage message={errorMessage} />

  return (
    <div className='py-5 relative h-full'>
        <form className='space-y-4'
            onSubmit={handleSubmit(saveProductHandler)}>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputField 
                    label="Product Name"
                    required
                    id="productName"
                    type="text"
                    message="This field is required*"
                    register={register}
                    placeholder="Product Name"
                    errors={errors}
                    />

                {!update && (
                    <SelectTextField
                        label="Select Categories"
                        select={selectedCategory}
                        setSelect={setSelectedCategory}
                        lists={categories}
                    />
                )}
            </div>

            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputField 
                    label="Price"
                    required
                    id="price"
                    type="number"
                    message="This field is required*"
                    placeholder="Product Price"
                    register={register}
                    errors={errors}
                    />

                    <InputField 
                    label="Quantity"
                    required
                    id="quantity"
                    type="number"
                    message="This field is required*"
                    register={register}
                    placeholder="Product Quantity"
                    errors={errors}
                    />
            </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Discount"
            id="discount"
            type="number"
            message="This field is required*"
            placeholder="Product Discount"
            register={register}
            errors={errors}
          />
          <InputField
            label="Special Price"
            id="specialPrice"
            type="number"
            message="This field is required*"
            placeholder="Product Discount"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
            <label htmlFor='desc'
              className='font-semibold text-sm text-slate-800'>
                Description
            </label>

            <textarea
                rows={4}
                placeholder="Add product description...."
                className={`px-4 py-2 w-full border outline-hidden bg-transparent text-slate-800 rounded-md shadow-sm focus:ring-2 focus:ring-custom-blue transition-all ${
                    errors["description"]?.message ? "border-red-500" : "border-slate-300" 
                }`}
                maxLength={255}
                {...register("description", {
                    required: {value: true, message:"Description is required"},
                })}
                />

                {errors["description"]?.message && (
                    <p className="text-sm font-semibold text-red-600 mt-0">
                        {errors["description"]?.message}
                    </p>
                )}
        </div>

        {/* ===== PRODUCT VARIATIONS (Clothes Category Only) ===== */}
        {isClothesCategory && (
            <div className="space-y-5 p-5 rounded-xl border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-violet-50/50"
                 style={{ animation: 'fadeSlideIn 0.3s ease-out' }}>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">👕</span>
                    <h3 className="text-base font-bold text-indigo-800">
                        Clothing Variations
                    </h3>
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
                        Clothes Category
                    </span>
                </div>

                {/* SIZE SELECTION */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                        Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {AVAILABLE_SIZES.map(size => (
                            <button
                                key={size}
                                type="button"
                                onClick={() => toggleSize(size)}
                                className={`
                                    w-12 h-12 rounded-xl text-sm font-bold transition-all duration-200 border-2
                                    ${selectedSizes.includes(size) 
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30 scale-105" 
                                        : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"}
                                `}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    {selectedSizes.length > 0 && (
                        <p className="text-xs text-indigo-600 mt-2 font-medium">
                            ✓ Selected: {selectedSizes.join(", ")}
                        </p>
                    )}
                </div>

                {/* COLOR SELECTION */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                        Available Colors
                    </label>
                    <div className="flex flex-wrap items-end gap-3">
                        <div className="flex-1 min-w-[140px]">
                            <label className="block text-xs text-slate-500 mb-1">Color Name</label>
                            <input
                                type="text"
                                value={colorName}
                                onChange={(e) => setColorName(e.target.value)}
                                placeholder="e.g. Royal Blue"
                                className="px-3 py-2.5 w-full border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all bg-white"
                            />
                        </div>
                        <div className="shrink-0">
                            <label className="block text-xs text-slate-500 mb-1">Pick Color</label>
                            <div className="relative">
                                <input
                                    type="color"
                                    value={colorHex}
                                    onChange={(e) => setColorHex(e.target.value)}
                                    className="w-12 h-[42px] rounded-lg border-2 border-slate-200 cursor-pointer hover:border-indigo-400 transition-colors"
                                    style={{ padding: '2px' }}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={addColor}
                            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 whitespace-nowrap"
                        >
                            + Add
                        </button>
                    </div>

                    {/* COLOR CHIPS */}
                    {productColors.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {productColors.map((colorEntry, idx) => {
                                const [name, hex] = colorEntry.split(":");
                                return (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm hover:shadow-md transition-shadow group"
                                    >
                                        <span
                                            className="w-4 h-4 rounded-full border border-slate-300 shadow-inner"
                                            style={{ backgroundColor: hex }}
                                        />
                                        {name}
                                        <button
                                            type="button"
                                            onClick={() => removeColor(idx)}
                                            className="ml-0.5 text-slate-400 hover:text-rose-500 transition-colors text-base leading-none font-bold"
                                        >
                                            ×
                                        </button>
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* INTEGRATED IMAGE UPLOAD SECTION */}
        <div className='flex flex-col gap-4 w-full pt-2'>
            <label className='flex items-center gap-2 cursor-pointer text-slate-600 bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 hover:border-slate-400 transition-colors rounded-md p-4 w-full justify-center shadow-sm'>
                <FaCloudUploadAlt size={28} className='text-custom-blue'/>
                <span className='font-medium'>{update ? "Update Product Image" : "Upload Product Image"}</span>
                <input 
                    type='file'
                    ref={fileInputRef}
                    onChange={onHandleImageChange}
                    className='hidden'
                    accept='.jpeg, .jpg, .png'/>
            </label>

            {previewImage && (
                <div className="flex flex-col items-center p-3 border border-slate-200 rounded-md bg-white shadow-sm">
                    <img
                        src={previewImage}
                        alt='Image Preview'
                        className='h-32 object-contain rounded-md mb-3'/>
                    <button
                        type='button'
                        onClick={handleClearImage}
                        className='bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white px-3 py-1 rounded-md text-sm font-medium transition-colors'>
                        Clear Selected Image
                    </button>
                </div>
            )}
        </div>

        <div className='sticky bottom-0 bg-white bg-opacity-95 backdrop-blur-sm pt-4 pb-2 mt-8 border-t flex w-full justify-between items-center z-10'>
            <Button disabled={loader}
                    onClick={() => setOpen(false)}
                    variant='outlined'
                    className='text-white py-[10px] px-4 text-sm font-medium'>
                Cancel
            </Button>

            <Button
                disabled={loader}
                type='submit'
                variant='contained'
                color='primary'
                className='bg-custom-blue text-white  py-[10px] px-4 text-sm font-medium shadow-md hover:shadow-lg'>
                {loader ? (
                    <div className='flex gap-2 items-center'>
                        <Spinners /> Processing...
                    </div>
                ) : (
                    "Save Product"
                )}
            </Button>
        </div>
        </form>
    </div>
  )
}

export default AddProductForm