import './App.css'
import Product from './components/products/Product'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/shared/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import { Toaster } from 'react-hot-toast';
import React, { useEffect } from 'react';
import Cart from './components/cart/Cart';
import Footer from './components/shared/Footer';
import ScrollToTop from './components/shared/ScrollToTop';
import LogIn from './components/auth/Login';
import Register from './components/auth/Register';
import VerifyOtp from './components/auth/VerifyOtp';
import PrivateRoute from './components/PrivateRoute';
import Checkout from './components/checkout/Checkout';
import PaymentSuccess from './components/checkout/PaymentSuccess';
import AdminLayout from './components/admin/AdminLayout';
import MyOrders from './components/orders/MyOrders';
import OrderDetail from './components/orders/OrderDetail';
import MyProfile from './components/user/MyProfile';
import { Navigate } from 'react-router-dom';
import Dashboard from './components/admin/dashboard/Dashboard';
import AdminProducts from './components/admin/products/AdminProducts';
import Sellers from './components/admin/sellers/Sellers';
import Category from './components/admin/categories/Category';
import Order from './components/admin/orders/Orders';
import SessionTimeoutModal from './components/auth/SessionTimeoutModal';
import { useDispatch } from 'react-redux';

const AppLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSessionExpired = () => {
      dispatch({ type: "SESSION_EXPIRED" });
    };
    window.addEventListener('session-expired', handleSessionExpired);
    return () => window.removeEventListener('session-expired', handleSessionExpired);
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <SessionTimeoutModal />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Product />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='/' element={<PrivateRoute />} >
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/profile/orders' element={<MyOrders />} />
          <Route path='/profile/orders/:orderId' element={<OrderDetail />} />
          {/* Redirect legacy /orders to /profile/orders */}
          <Route path='/orders' element={<Navigate to='/profile/orders' replace />} />
        </Route>


        <Route path='/' element={<PrivateRoute publicPage />} >
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify-otp' element={<VerifyOtp />} />
        </Route>

        <Route path='/' element={<PrivateRoute adminOnly />} >
          <Route path='/admin' element={<AdminLayout />} >
            <Route path='' element={<Dashboard />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='sellers' element={<Sellers />} />
            <Route path='categories' element={<Category />} />
            <Route path='orders' element={<Order />} />
          </Route>
        </Route>
      </Routes>
      {!location.pathname.startsWith('/admin') && !location.pathname.startsWith('/profile') && <Footer />}
    </>
  );
};

function App() {
  return (
    <React.Fragment>
      <Router>
        <AppLayout />
      </Router>
      <Toaster position='bottom-center' />
    </React.Fragment>
  );
}

export default App;
