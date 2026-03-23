import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from './ProductReducer'; // or wherever your product logic is
import { errorReducer } from './errorReducers';
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import paymentMethodReducer from "./paymentMethodReducer";

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;


const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const intialState = {
    auth: { user: user },
    carts: { cart: cartItems },
};

import cartSliceReducer from "../../components/cart/cartSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer,
        cartSlice: cartSliceReducer,
        auth: authReducer,
        payment: paymentMethodReducer
    },
    preloadedState: intialState,
});

export default store;