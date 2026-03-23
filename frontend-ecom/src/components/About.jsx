import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './shared/ProductCard'; 

const About = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                // Fetch specific products from your new backend endpoint
                const response = await axios.get('http://localhost:8080/api/public/products/featured');
                setFeaturedProducts(response.data); 
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching featured products:", error);
                setIsLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* --- Top Section (Static Content) --- */}
            <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">About Us</h1>
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <p className="text-lg mb-4 text-gray-700 leading-relaxed">
                        Welcome to our e-commerce store! We are dedicated to providing the best products 
                        and services to our customers. Our mission is to offer a seamless shopping 
                        experience while ensuring the highest quality of offerings.
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <img
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80"
                        alt="About Us Office"
                        className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </div>

            {/* --- Featured Products Section (Dynamic Content) --- */}
            <div>
                <h2 className="text-slate-800 text-4xl font-bold text-center pb-8">
                    Our Top Picks
                </h2>
                
                {isLoading ? (
                    <div className="text-center text-xl text-gray-500">Loading specific picks...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map((product) => (
                                <ProductCard
                                    key={product.productId}
                                    productId={product.productId}
                                    productName={product.productName}
                                    image={product.image} 
                                    description={product.description}
                                    quantity={product.quantity}
                                    price={product.price}
                                    discount={product.discount}
                                    specialPrice={product.specialPrice}
                                    about={true} 
                                />
                            ))
                        ) : (
                            <p className="text-center col-span-3 text-gray-500">
                                No featured products found. (Make sure you ran the SQL update!)
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;