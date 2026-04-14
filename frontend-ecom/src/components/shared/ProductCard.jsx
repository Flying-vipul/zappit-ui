import React, { useState } from 'react'
import { FaShoppingCart, FaBolt } from 'react-icons/fa';
import ProductViewModal from './ProductViewModal';
import truncateText from '../../utils/truncateText';
import { useDispatch } from 'react-redux';
import { addTocart } from '../../store/actions';
import toast from "react-hot-toast";

const ProductCard = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  about,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch = useDispatch();


  // --- FIX: CLOUD-AWARE URL CLEANER ---
const getCleanImageUrl = (imgData) => {
  const BASE = import.meta.env.VITE_BACK_END_URL || "http://localhost:8080";
  
  // 1. If no image, return default
  if (!imgData) return `${BASE}/images/default.png`;
  
  // 2. If it's already a full Cloudinary/External URL, return it as is!
  if (imgData.startsWith("http")) {
    return imgData;
  }
  
  // 3. If it's an old local filename (like "sofa.jpg"), append the backend path
  return `${BASE}/images/${imgData}`;
};


  const fullImageUrl = getCleanImageUrl(image);
  // -----------------------------------

  const handleProductView = (product) => {
    if (!about) {
      setSelectedViewProduct(product);
      setOpenProductViewModal(true);
    }

  }

  const addToCartHandler = (cartItems) => {
    dispatch(addTocart(cartItems, 1, toast));
  };

  return (
    <div className='group relative border border-gray-200/60 dark:border-gray-700/50 rounded-2xl bg-white dark:bg-gray-900/50 overflow-hidden
        hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 transition-all duration-500 flex flex-row sm:flex-col
        hover:-translate-y-1'>

      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg animate-scale-in">
          <FaBolt size={10} />
          {discount}% OFF
        </div>
      )}

      {/* Out of Stock overlay */}
      {!isAvailable && (
        <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px] flex items-center justify-center sm:rounded-2xl">
          <span className="bg-slate-900/80 text-white text-xs font-bold px-4 py-1.5 rounded-full">
            Out of Stock
          </span>
        </div>
      )}

      {/* IMAGE WRAPPER */}
      <div onClick={() => {
        handleProductView({
          id: productId,
          productName,
          image: fullImageUrl,
          description,
          quantity,
          price,
          discount,
          specialPrice,
        })
      }} className='w-2/5 sm:w-full shrink-0 overflow-hidden aspect-square flex items-center justify-center bg-gradient-to-br from-slate-50 to-white dark:from-gray-800 dark:to-gray-900 p-2 sm:p-6'>

        <img
          className='w-full h-full object-contain cursor-pointer transition-all duration-700 transform group-hover:scale-110'
          src={fullImageUrl}
          onError={(e) => {
            // Prevent infinite loop if the default image also fails
            if (e.target.src !== "/assets/local-placeholder.png") {
              e.target.src = "/assets/local-placeholder.png";
            }
          }}
        />
      </div>

      <div className='w-3/5 sm:w-full p-3 sm:p-5 flex flex-col justify-between grow'>
        <div>
          <h2 onClick={() => {
            handleProductView({
              id: productId,
              productName,
              image: fullImageUrl,
              description,
              quantity,
              price,
              discount,
              specialPrice,
              about: false,
            })
          }}
            className='text-base sm:text-lg font-semibold sm:mb-2 cursor-pointer line-clamp-2 sm:line-clamp-none text-slate-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200'
          >{productName}
          </h2>
          <div className='hidden sm:block min-h-20 max-h-20'>
            <p className='text-gray-500 dark:text-gray-400 text-sm leading-relaxed'>
              {truncateText(description, 45)}
            </p>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 sm:mt-4 mt-auto'>
          {specialPrice ? (
            <div className='flex flex-col'>
              <span className='text-gray-400 dark:text-gray-500 line-through text-xs'>
                ₹{Number(price).toFixed(2)}
              </span>
              <span className='text-xl font-bold text-slate-800 dark:text-gray-100'>
                ₹{Number(specialPrice).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className='text-xl font-bold text-slate-800 dark:text-gray-100'>
              ₹{Number(price).toFixed(2)}
            </span>
          )}
          <button
            disabled={!isAvailable || btnLoader}
            onClick={() => addToCartHandler({
              image: fullImageUrl,
              productName,
              description,
              specialPrice,
              price,
              productId,
              quantity,
            })}
            className={`${isAvailable
              ? "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30"
              : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
              }
              text-white font-medium py-2 sm:py-2.5 px-4 sm:px-5 text-sm rounded-xl w-full sm:w-auto flex justify-center items-center transition-all duration-300 active:scale-95`}>
            <FaShoppingCart className='mr-1.5 sm:mr-2' size={14} />
            {isAvailable ? "Add to Cart" : "Stock Out"}
          </button>
        </div>
      </div>
      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </div>
  )
}

export default ProductCard;