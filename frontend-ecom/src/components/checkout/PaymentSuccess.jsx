import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
    return (
        <div className="min-h-[calc(100vh-100px)] flex justify-center items-center py-14">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border text-center">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>
                <div className="space-y-3">
                    <Link 
                        to="/orders" 
                        className="block w-full bg-custom-blue text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                    >
                        View Orders
                    </Link>
                    <Link 
                        to="/" 
                        className="block w-full bg-gray-100 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-200 transition border"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
