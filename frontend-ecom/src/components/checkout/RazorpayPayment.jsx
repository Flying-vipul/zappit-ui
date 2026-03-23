import React, { useState } from "react";
import api from "../../api/api"; 
import { useRazorpay } from "react-razorpay";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RazorpayPayment = ({ cartTotal, addressId }) => {
  const { Razorpay } = useRazorpay();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handlePayment = async () => {
    setLoading(true);

    try {
      // ====================================================================
      // STEP 1: Get the Secure Order ID from your Spring Boot Backend
      // ====================================================================
      const { data } = await api.post(
        `/order/users/payments/instantiate?amount=${cartTotal}`
      );

      // The backend returns order.toString(), which might be a raw JSON string
      const orderData = typeof data === 'string' ? JSON.parse(data) : data;
      const razorpayOrderId = orderData.id;

      // ====================================================================
      // STEP 2: Configure the Razorpay Modal
      // ====================================================================
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your public key from .env
        amount: cartTotal * 100, // Razorpay expects amount in paise (multiply by 100)
        currency: "INR",
        name: "Your Epic Brand Name", // Put your new brand name here!
        description: "E-Commerce Order Payment",
        order_id: razorpayOrderId, // The secure ID from Spring Boot
        
        // ====================================================================
        // STEP 3: The Success Handler (Sends proof back to Spring Boot)
        // ====================================================================
        handler: async function (response) {
          try {
            // Pack the security signatures and the order details
            const orderRequestDTO = {
              addressId: addressId,
              pgName: "Razorpay",
              pgPaymentId: response.razorpay_payment_id,
              pgStatus: "SUCCESS",
              pgResponseMessage: "Payment Verified via React",
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            // Call your final verification & saving endpoint
            const verifyResponse = await api.post(
              "/order/users/payments/Razorpay",
              orderRequestDTO
            );

            toast.success("Payment Successful & Order Placed!");
            navigate("/payment-success"); // Or wherever your order confirmation page is
            
          } catch (error) {
            console.error("Payment Verification Failed:", error);
            toast.error("Payment Verification Failed. Please contact support.");
          }
        },
        theme: {
          color: "#3399cc", // Customize your brand color here
        },
      };

      // ====================================================================
      // STEP 4: Open the Modal
      // ====================================================================
      const rzp = new Razorpay(options);
      
      // If payment fails on the Razorpay modal itself
      rzp.on("payment.failed", function (response) {
        toast.error(`Payment Failed! Reason: ${response.error.description}`);
      });

      rzp.open();

    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      toast.error("Could not initiate checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={loading}
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
    >
      {loading ? "Processing..." : `Pay ₹${cartTotal} with Razorpay`}
    </button>
  );
};

export default RazorpayPayment;