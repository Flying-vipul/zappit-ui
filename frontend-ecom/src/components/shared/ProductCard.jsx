import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
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


  // --- FIX: AGGRESSIVE URL CLEANER ---
  // This logic fixes the "Double URL" bug by stripping everything except the filename
  const getCleanImageUrl = (imgData) => {
    if (!imgData) return "http://localhost:8080/images/default.png";

    // Split by '/' and take the last part. 
    // This turns "http://localhost:8080/images/pic.png" -> "pic.png"
    // And turns "pic.png" -> "pic.png"
    const filename = imgData.split('/').pop();

    return `http://localhost:8080/images/${filename}`;
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
    <div className='border rounded-lg shadow-md bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-row sm:flex-col'>
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
      }} className='w-2/5 sm:w-full shrink-0 overflow-hidden aspect-square flex items-center justify-center bg-slate-50 p-2 sm:p-6'>

        <img
          className='w-full h-full object-contain mix-blend-multiply cursor-pointer transition-transform duration-500 transform hover:scale-110'
          src={fullImageUrl}
          onError={(e) => {
            // Prevent infinite loop if the default image also fails
            if (e.target.src !== "/assets/local-placeholder.png") {
              e.target.src = "/assets/local-placeholder.png";
            }
          }}
        />
      </div>

      <div className='w-3/5 sm:w-full p-3 sm:p-4 flex flex-col justify-between'>
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
          className='text-base sm:text-lg font-semibold sm:mb-2 cursor-pointer line-clamp-2 sm:line-clamp-none'
        >{productName}
        </h2>
        <div className='hidden sm:block min-h-20 max-h-20'>
          <p className='text-gray-600 text-sm'>
            {truncateText(description, 45)}
          </p>
        </div>


        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mt-2 sm:mt-4'>
          {specialPrice ? (
            <div className='flex flex-col'>
              <span className='text-gray-400 line-through text-sm'>
                ${Number(price).toFixed(2)}
              </span>
              <span className='text-xl font-bold text-slate-800'>
                ${Number(specialPrice).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className='text-xl font-bold text-slate-800'>
              ${Number(price).toFixed(2)}
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
            className={`bg-blue-600 ${isAvailable ? "opacity-100 hover:bg-blue-700" : "opacity-70 cursor-not-allowed"}
                      text-white font-medium py-1.5 sm:py-2.5 px-3 sm:px-4 text-sm sm:text-base rounded-lg w-full sm:w-auto flex justify-center items-center transition-all duration-300 shadow-md hover:shadow-lg active:scale-95`}>
            <FaShoppingCart className='mr-1.5 sm:mr-2' />
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