import React, { useState } from 'react'
import { formatPriceCalculation } from '../../utils/formatPrice'

const ProductImage = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const fallbackImage = "/assets/local-placeholder.png";

  const handleError = () => {
    // Prevent infinite loop if fallback also fails
    if (imgSrc !== fallbackImage) {
      setImgSrc(fallbackImage);
    }
  };

  return (
    <img
      src={imgSrc || fallbackImage}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {

  const getCleanImageUrl = (imgData) => {
    if (!imgData) return "/assets/local-placeholder.png";
    const filename = imgData.split('/').pop();
    return `${import.meta.env.VITE_BACK_END_URL}/images/${filename}`;
  };


  return (
    <div className='container mx-auto px-4 mb-8'>
      <div className='flex flex-wrap'>
        <div className='w-full lg:w-8/12 lg:pr-4'>
          <div className='space-y-4'>
            <div className='p-4 border rounded-lg shadow-sm'>
              <h2 className='text-2xl font-semibold mb-2'>Billing Address</h2>
              <p>
                <strong>Building Name: </strong>
                {address?.buildingName}
              </p>
              <p>
                <strong>City: </strong>
                {address?.city}
              </p>
              <p>
                <strong>Street: </strong>
                {address?.street}
              </p>
              <p>
                <strong>State: </strong>
                {address?.state}
              </p>
              <p>
                <strong>Pincode: </strong>
                {address?.pincode}
              </p>
              <p>
                <strong>Country: </strong>
                {address?.country}
              </p>
            </div>
            <div className='p-4 border rounded-lg shadow-sm'>
              <h2 className='text-2xl font-semibold mb-2'>
                Payment Method
              </h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </div>
            <div className='p-4 border rounded-lg shadow-sm'>
              <h2 className='text-2xl font-semibold mb-2'>Order Items</h2>
              <div className='space-y-4'>
                {cart?.map((item) => (
                  <div key={item?.productId} className='flex items-start sm:items-center'>
                    <ProductImage
                      src={getCleanImageUrl(item?.image)}
                      alt={item?.productName || 'Product'}
                      className='w-16 h-16 sm:w-12 sm:h-12 rounded object-cover shrink-0'
                    />
                    <div className='text-gray-600 ml-4 flex-1 min-w-0'>
                      <p className='truncate sm:whitespace-normal sm:line-clamp-2 text-sm sm:text-base font-medium'>{item?.productName}</p>
                      <p>
                        {item?.quantity} x ₹{item?.specialPrice} = ₹{
                          formatPriceCalculation(item?.quantity, item?.specialPrice)
                        }
                      </p>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className='w-full lg:w-4/12 mt-4 lg:mt-0'>
          <div className='border rounded-lg shadow-sm p-4 space-y-4 '>
            <h2 className='text-2xl font-semibold mb-2'>Order Summary</h2>

            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span>Products</span>
                <span>₹{formatPriceCalculation(totalPrice, 1)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Tax (0%)</span>
                <span>₹0.00</span>
              </div>
              <div className='flex justify-between font-semibold'>
                <span>SubTotal</span>
                <span>₹{formatPriceCalculation(totalPrice, 1)}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary