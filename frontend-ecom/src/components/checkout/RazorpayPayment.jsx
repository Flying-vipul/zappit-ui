import React, { useState } from "react";
import api from "../../api/api";
import { useRazorpay } from "react-razorpay";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../cart/cartSlice";
import toast from "react-hot-toast";
import { FaLock, FaShieldAlt } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";

const RazorpayPayment = ({ cartTotal, addressId }) => {
  const { Razorpay } = useRazorpay();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePayment = async () => {
    setLoading(true);

    try {
      // STEP 1: Get the Secure Razorpay Order ID from Spring Boot backend.
      // The backend calculates the amount from the user's cart in DB — no tampering possible.
      const { data } = await api.post("/order/users/payments/instantiate");

      // Backend returns the Razorpay Order ID directly as a string
      const razorpayOrderId = typeof data === "string" ? data.trim() : (data?.id || data?.razorpayOrderId);

      if (!razorpayOrderId) {
        throw new Error("Failed to retrieve Razorpay Order ID from backend.");
      }

      // STEP 2: Configure Razorpay modal options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: cartTotal * 100, // Displayed amount in paise (for UI only)
        currency: "INR",
        name: "Zappit",
        description: "Secure Order Payment",
        image: "/vite.svg",
        order_id: razorpayOrderId,

        // STEP 3: On successful payment — verify with backend
        handler: async function (response) {
          // Declare outside try so it's accessible in the catch block for logging
          const orderRequestDTO = {
            addressId: addressId,
            pgName: "Razorpay",
            pgPaymentId: response.razorpay_payment_id,
            pgStatus: "SUCCESS",
            pgResponseMessage: "Payment verified on client",
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          try {
            await api.post("/order/users/payments/Razorpay", orderRequestDTO);

            // ✅ Clear cart everywhere: Redux badge (cartReducer) + cartSlice + localStorage
            dispatch({ type: "CLEAR_CART" });
            dispatch(clearCart());
            localStorage.removeItem("cartItems");

            toast.success("🎉 Payment Successful! Order Placed.");
            navigate("/payment-success");
          } catch (verifyError) {
            const status = verifyError.response?.status;
            const backendMsg = verifyError.response?.data?.message 
              || (typeof verifyError.response?.data === 'string' ? verifyError.response.data : null)
              || verifyError.message;

            console.error("=== PAYMENT VERIFICATION FAILED ===");
            console.error("HTTP Status:", status);
            console.error("Backend Message:", backendMsg);
            console.error("Full Error:", verifyError.response?.data);
            console.error("Request Payload Sent:", orderRequestDTO);

            toast.error(`Verification Failed (${status || 'Network'}): ${backendMsg || "Check console for details."}`);
          }
        },

        prefill: {
          name: "Zappit",
          email: "zappit",
          contact: "8600683959",
        },
        theme: {
          color: "#6366f1", // Indigo — Zappit brand color
        },
        modal: {
          ondismiss: () => {
            toast("Payment cancelled.", { icon: "ℹ️" });
            setLoading(false);
          },
        },
      };

      // STEP 4: Open Razorpay modal
      const rzp = new Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment Failed:", response.error);
        toast.error(`Payment Failed: ${response.error.description}`);
        setLoading(false);
      });

      rzp.open();
    } catch (error) {
      console.error("Checkout Error:", error);
      console.error("Response:", error.response?.data);
      const msg =
        error.response?.data?.message ||
        (typeof error.response?.data === "string" ? error.response?.data : null) ||
        error.message ||
        "Could not initiate checkout.";
      toast.error(`Checkout Failed: ${msg}`);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center px-4 pt-6 pb-36 min-h-[60vh]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-5">
          <div className="flex items-center gap-3">
            <FaLock className="text-white text-xl shrink-0" />
            <div>
              <h2 className="text-white text-lg font-bold leading-tight">Secure Payment</h2>
              <p className="text-indigo-200 text-xs mt-0.5">256-bit SSL encrypted checkout</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Amount Display */}
          <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
            <p className="text-slate-500 text-sm">Total Amount Payable</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">₹{cartTotal?.toLocaleString("en-IN")}</p>
          </div>

          {/* Payment Gateway badge */}
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <span>Powered by</span>
            <SiRazorpay className="text-blue-500 text-2xl" />
            <span className="font-semibold text-blue-600">Razorpay</span>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-200 flex items-center justify-center gap-2
              ${loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95 shadow-md hover:shadow-lg"
              }`}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FaLock className="text-sm" />
                Pay ₹{cartTotal?.toLocaleString("en-IN")} Securely
              </>
            )}
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs">
            <FaShieldAlt className="text-green-500" />
            <span>Your payment info is 100% secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RazorpayPayment;