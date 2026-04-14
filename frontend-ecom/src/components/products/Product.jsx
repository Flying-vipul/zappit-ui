import React, { useEffect, useState } from 'react'
import ProductCard from '../shared/ProductCard';
import { FaExclamationTriangle, FaBolt } from 'react-icons/fa';
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

  return (
    <div className='lg:px-14 sm:px-8 px-2 py-6 sm:py-14 2xl:w-[90%] 2xl:mx-auto'>
      {/* Page header */}
      <div className="text-center mb-8 animate-fade-in-down">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-800/40 mb-3">
          <FaBolt size={10} />
          Browse & Discover
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text">
          Our Collection
        </h1>
        <p className="text-slate-500 dark:text-gray-400 text-sm mt-2 max-w-md mx-auto">
          Find exactly what you need from our curated selection of premium products.
        </p>
      </div>

      <Filter categories={categories ? categories : []} />
      {isLoading ? (
        <div className='pb-6 pt-6 sm:pt-10 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-3 sm:gap-y-6 gap-x-6'>
          {Array(8).fill(null).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : errorMessage ? (
        <div className='flex justify-center items-center h-50'>
          <FaExclamationTriangle className="text-slate-400 dark:text-gray-500 text-3xl mr-2" />
          <span className='text-slate-600 dark:text-gray-400 text-lg font-medium'>
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className='min-h-175'>
          <div className='pb-6 pt-6 sm:pt-10 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-3 sm:gap-y-6 gap-x-6'>
            {products &&
              products.map((item, i) => (
                <div key={item.productId} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
                  <ProductCard {...item} />
                </div>
              ))}
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
