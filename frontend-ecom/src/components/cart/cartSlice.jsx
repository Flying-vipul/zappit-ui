import { createSlice } from '@reduxjs/toolkit';

// Check if there is already a cart in local storage when the app loads
const initialState = {
  cartItems: localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ... your other reducers like addToCart, removeFromCart, etc. ...

    // The absolute cinema logout clear function
    clearCart(state) {
      // 1. Empty the Redux state
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      
      // 2. Nuke it from Local Storage so the next user starts fresh
      localStorage.removeItem('cartItems');
    },
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;