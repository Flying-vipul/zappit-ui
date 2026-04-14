import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../store/actions';
import { Link } from 'react-router-dom';

const OrderSkeleton = () => (
  <div className="container mx-auto p-4 md:p-8 text-slate-800 min-h-screen">
    <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">My Orders</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-slate-200 animate-pulse">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-6 bg-slate-200 rounded-full w-1/4"></div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          </div>
          <div className="h-10 bg-slate-200 rounded w-full mt-4"></div>
        </div>
      ))}
    </div>
  </div>
);

const MyOrders = () => {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.order);
  const { isLoading } = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (isLoading) return <OrderSkeleton />;

  return (
    <div className="container mx-auto p-4 md:p-8 text-slate-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">My Orders</h1>
      
      {!userOrders || userOrders.length === 0 ? (
        <div className="text-center text-slate-500 mt-10">
          <p className="text-lg">You haven't placed any orders yet.</p>
          <Link to="/products" className="text-blue-500 hover:underline mt-4 inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userOrders.map((order) => (
            <div key={order.orderId} className="bg-white rounded-lg shadow-md p-6 border border-slate-200 transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <span className="font-semibold text-slate-600">Order #{order.orderId}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                  order.orderStatus === 'Payment Confirmed' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {order.orderStatus}
                </span>
              </div>
              
              <div className="mb-4 text-sm text-slate-600">
                <p className="mb-1"><span className="font-semibold">Date:</span> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p className="mb-1"><span className="font-semibold">Total:</span> ₹{order.totalAmount.toFixed(2)}</p>
                <p><span className="font-semibold">Items:</span> {order.orderItems?.length || 0}</p>
              </div>

              <Link to={`/profile/orders/${order.orderId}`} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
                Track Order
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
