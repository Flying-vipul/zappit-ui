import React, { useEffect, useState } from 'react'
import ProductCard from '../shared/ProductCard';
import { FaExclamationTriangle } from 'react-icons/fa';
import { fetchCategories } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './Filter';
import useProductFilter from '../../hooks/useProductFilter';
import ProductCardSkeleton from '../shared/ProductCardSkeleton';
import Paginations from '../shared/Paginations';
const Product = () => {

  // Add || {} to prevent the "undefined" crash
  const { isLoading, errorMessage } = useSelector((state) => state.errors || {});

  const { products, categories, pagination } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  useProductFilter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  //     const products = [
  // {
  //       productId: 652,
  //       productName: "Iphone Xs max",
  //       image: "https://placehold.co/600x400",
  //       description: "Experience the latest in mobile technology with advanced cameras, powerful processing, and an all-day battery.",
  //       quantity: 10,
  //       price: 1450.0,
  //       discount: 10.0,
  //       specialPrice: 1305.0,
  //     },
  //     {
  //       productId: 654,
  //       productName: "MacBook Air M2s",
  //       image: "https://placehold.co/600x400",
  //       description: "Ultra-thin laptop with Apple's M2 chip, providing fast performance in a lightweight, portable design.",
  //       quantity: 0,
  //       price: 2550.0,
  //       discount: 20.0,
  //       specialPrice: 2040.0,
  //     }
  // ]; 
  return (
    <div className='lg:px-14 sm:px-8 px-2 py-6 sm:py-14 2xl:w-[90%] 2xl:mx-auto'>
      <Filter categories={categories ? categories : []} />
      {isLoading ? (
        <div className='pb-6 pt-6 sm:pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-3 sm:gap-y-6 gap-x-6'>
          {Array(8).fill(null).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : errorMessage ? (
        <div className='flex justify-center items-center h-50'>
          <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
          <span className='text-slate-800 text-lg font-medium'>
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className='min-h-175'>
          <div className='pb-6 pt-6 sm:pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-3 sm:gap-y-6 gap-x-6'>
            {products &&
              products.map((item) => <ProductCard key={item.productId} {...item} />
              )}
          </div>
          <div className='flex justify-center pt-10'>
            <Paginations
              numberOfPage={pagination?.totalPages}
              totalProducts={pagination?.totalElements} />
          </div>
        </div>
      )}

    </div>
  )
}

export default Product;
