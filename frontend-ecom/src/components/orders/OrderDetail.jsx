import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../store/actions';
import { Stepper, Step, StepLabel, Box, Typography, Button } from '@mui/material';
import Spinners from '../shared/Spinners';

const steps = [
  'Payment Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

const getActiveStep = (status) => {
  const index = steps.indexOf(status);
  return index !== -1 ? index : 0; // Default to 0 if unknown
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.order);
  const { isLoading } = useSelector((state) => state.errors);

  useEffect(() => {
    if (!userOrders || userOrders.length === 0) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, userOrders]);

  if (isLoading) return <Spinners />;

  const order = userOrders?.find((o) => o.orderId === Number(orderId));

  if (!order && !isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center text-slate-800 min-h-[60vh] flex flex-col justify-center items-center">
        <Typography variant="h5" color="error" gutterBottom>
          Order not found.
        </Typography>
        <Link to="/profile/orders" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">Back to My Orders</Button>
        </Link>
      </div>
    );
  }

  if (!order) return null;

  const activeStep = getActiveStep(order.orderStatus);

  return (
    <div className="container mx-auto p-4 md:p-8 text-slate-800 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-slate-800">
          Tracking Order #{order.orderId}
        </h1>
        <Link to="/profile/orders" className="text-blue-600 hover:text-blue-800 font-semibold underline">
          &larr; Back to Orders
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-10 mb-8">
        <Typography variant="h6" className="mb-8 font-semibold text-slate-700" style={{ marginBottom: '2rem', fontWeight: 600 }}>
          Order Status
        </Typography>
        
        <Box sx={{ width: '100%', overflowX: 'auto', paddingBottom: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              
              if (order.orderStatus === 'Cancelled' && index === activeStep) {
                 labelProps.error = true;
                 label = 'Cancelled';
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>

        {order.orderStatus === 'Delivered' && (
           <Box mt={4} textAlign="center" className="bg-green-50 p-4 rounded-lg border border-green-200">
             <Typography variant="h6" color="success.main" fontWeight="bold">
               🎉 This order has been delivered!
             </Typography>
           </Box>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-8">
          <Typography variant="h6" className="mb-4 font-semibold text-slate-700 border-b pb-2">
            Items Ordered
          </Typography>
          <div className="flex flex-col gap-4 mt-4">
            {order.orderItems?.map((item) => {
              // Handle both field names: entity sends 'orderedProductPrice', DTO sends 'orderProductPrice'
              const itemPrice = item.orderedProductPrice ?? item.orderProductPrice ?? item.product?.specialPrice ?? 0;
              // Cloud-aware image URL
              const imgUrl = item.product?.image
                ? (item.product.image.startsWith('http') ? item.product.image : `${import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080'}/images/${item.product.image}`)
                : '/assets/local-placeholder.png';
              return (
              <div key={item.orderItemId} className="flex gap-4 items-center border p-4 rounded-lg bg-slate-50">
                <img 
                  src={imgUrl} 
                  alt={item.product?.productName} 
                  className="w-20 h-20 object-cover rounded-md border"
                  onError={(e) => { if (e.target.src !== '/assets/local-placeholder.png') e.target.src = '/assets/local-placeholder.png'; }}
                />
                <div className="flex-1">
                  <Typography variant="subtitle1" fontWeight="bold" className="text-slate-800">
                    {item.product?.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                  {/* Show variation details if present */}
                  {(item.selectedSize || item.selectedColor) && (
                    <div className="flex items-center gap-1.5 mt-1">
                      {item.selectedSize && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">Size: {item.selectedSize}</span>
                      )}
                      {item.selectedColor && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                          <span className="w-2.5 h-2.5 rounded-full border border-slate-400" style={{ backgroundColor: item.selectedColor.split(':')[1] || '#ccc' }} />
                          {item.selectedColor.split(':')[0]}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <Typography variant="subtitle1" fontWeight="bold" className="text-blue-600">
                  ₹{(Number(itemPrice) * Number(item.quantity)).toFixed(2)}
                </Typography>
              </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-8 self-start">
          <Typography variant="h6" className="mb-4 font-semibold text-slate-700 border-b pb-2">
            Order Summary
          </Typography>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-between text-slate-600">
              <Typography>Order Date:</Typography>
              <Typography fontWeight="bold">{new Date(order.orderDate).toLocaleDateString()}</Typography>
            </div>
            <div className="flex justify-between text-slate-600">
              <Typography>Payment Method:</Typography>
              <Typography fontWeight="bold">{order.payment?.paymentMethod || 'N/A'}</Typography>
            </div>
            {order.payment?.paymentMethod === 'Razorpay' && (
               <div className="flex justify-between text-slate-600">
                <Typography>Transaction ID:</Typography>
                <Typography variant="caption" className="mt-1 font-mono tracking-tighter" title={order.payment?.pgPaymentId}>{order.payment?.pgPaymentId?.substring(0,10)}...</Typography>
              </div>
            )}
            
            <hr className="my-2" />
            
            <div className="flex justify-between items-center">
              <Typography variant="h6" fontWeight="bold" className="text-slate-800">Total:</Typography>
              <Typography variant="h5" fontWeight="bold" className="text-blue-600">₹{Number(order.totalAmount || 0).toFixed(2)}</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
