import './App.css'
import Product from './components/products/Product'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/shared/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import { Toaster } from 'react-hot-toast';
import React from 'react';
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

const AppLayout = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Product />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='/' element={<PrivateRoute />} >
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
        </Route>


        <Route path='/' element={<PrivateRoute publicPage />} >
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify-otp' element={<VerifyOtp />} />
        </Route>

        <Route path='/' element={<PrivateRoute  />} >
          <Route path='/admin' element={<AdminLayout />} />
        </Route>
      </Routes>
      {!location.pathname.startsWith('/admin') && <Footer />}
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
