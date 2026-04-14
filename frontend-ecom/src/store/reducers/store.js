// ✅ All imports MUST be at the top (ES Module rule)
import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from './ProductReducer';
import { errorReducer } from './errorReducers';
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import paymentMethodReducer from "./paymentMethodReducer";
import cartSliceReducer from "../../components/cart/cartSlice";
import { adminReducer } from "./adminReducer";
import { orderReducer } from "./orderReducer";
import { sellerReducer } from "./sellerReducer";

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

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer,
        cartSlice: cartSliceReducer,
        auth: authReducer,
        payment: paymentMethodReducer,
        admin: adminReducer,
        order: orderReducer,
        sellers: sellerReducer,
    },
    preloadedState: intialState,
});

export default store;