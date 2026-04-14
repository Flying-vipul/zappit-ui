import React, { useState, useEffect } from 'react';
import api from '../api/api';
import ProductCard from './shared/ProductCard'; 
import { FaBolt, FaHeart, FaGlobe, FaAward } from 'react-icons/fa';

const values = [
    { icon: <FaHeart size={22} />, title: "Customer First", desc: "Everything we do starts with our customers in mind." },
    { icon: <FaGlobe size={22} />, title: "Global Reach", desc: "Shipping to 100+ countries worldwide with fast delivery." },
    { icon: <FaAward size={22} />, title: "Quality Assured", desc: "Every product is verified and tested for quality." },
];

const About = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                // Fetch specific products from your new backend endpoint
                const response = await api.get('/public/products/featured');
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
        <div className="overflow-hidden">
            {/* ── Hero Section ── */}
            <div className="relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] py-20 lg:py-28 px-4">
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
                </div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 mb-6 animate-fade-in-down">
                        <FaBolt size={10} />
                        Our Story
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 animate-fade-in-up">
                        About <span className="text-amber-400">Zappit</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        We are dedicated to providing the best products and services to our customers. 
                        Our mission is to offer a seamless shopping experience while ensuring the highest quality of offerings.
                    </p>
                </div>
            </div>

            {/* ── Values Section ── */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-6">
                    {values.map(({ icon, title, desc }, i) => (
                        <div key={title} className="group bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center hover-lift transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${i * 0.15}s` }}>
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white mb-5 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                                {icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-gray-100 mb-2">{title}</h3>
                            <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Image Section ── */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/2 animate-slide-in-left">
                        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Who We Are</span>
                        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-gray-100 mt-2 mb-4">
                            Building the <span className="gradient-text">future</span> of shopping
                        </h2>
                        <p className="text-slate-500 dark:text-gray-400 leading-relaxed">
                            Welcome to our e-commerce store! We are dedicated to providing the best products 
                            and services to our customers. Our mission is to offer a seamless shopping 
                            experience while ensuring the highest quality of offerings. With thousands of 
                            satisfied customers, we continue to grow and innovate.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 animate-slide-in-right">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80"
                                alt="About Us Office"
                                className="relative w-full h-auto rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Featured Products Section (Dynamic Content) --- */}
            <div className="bg-slate-50/80 dark:bg-[#0e0e24] border-y border-slate-100 dark:border-gray-800 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold gradient-text mb-2">
                            Our Top Picks
                        </h2>
                        <p className="text-slate-500 dark:text-gray-400 text-sm">Handpicked items our team loves</p>
                    </div>
                    
                    {isLoading ? (
                        <div className="text-center text-lg text-gray-400 dark:text-gray-500 py-10">
                            <div className="inline-block w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
                            <p>Loading picks...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredProducts.length > 0 ? (
                                featuredProducts.map((product, i) => (
                                    <div key={product.productId} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.12}s` }}>
                                        <ProductCard
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
                                    </div>
                                ))
                            ) : (
                                <p className="text-center col-span-3 text-gray-400 dark:text-gray-500 py-10">
                                    No featured products found.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default About;