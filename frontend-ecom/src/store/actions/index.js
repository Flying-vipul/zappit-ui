import api from "../../api/api";
import toast from "react-hot-toast";
import { clearCart } from '../../components/cart/cartSlice';


export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log("Error detected:", error.message);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch Products",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/public/categories?pageSize=50`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log("Error detected:", error.message);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch Categories",
    });
  }
};

export const addTocart = (data, qty = 1, toast) =>
  (dispatch, getState) => {
    // Find the Product
    const { products } = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId
    );
    //Check for stocks
    const isQuantityExist = getProduct.quantity >= qty;

    //If in Stock -> add
    if (isQuantityExist) {
      dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
      toast.success(`${data?.productName} added to the cart`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));

    } else {
      //If not in Stock ->error
      toast.error("Out of Stock");
    }
  }

export const authenticateSignInUser
  = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signin", sendData);
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset()
      toast.success("Login Success");
      navigate("/");

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");

    } finally {
      setLoader(false);
    }
  }



export const registerNewUser
  = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset()
      // Removed the initial registration success toast so it only shows upon OTP verification
      navigate("/verify-otp", { state: { email: sendData.email } });

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");

    } finally {
      setLoader(false);
    }
  }

export const verifyOtp = (sendData, toast, navigate, setLoader) => async (dispatch) => {
  try {
    setLoader(true);
    const { data } = await api.post("/auth/verify-otp", sendData);
    toast.success(data?.message || "Account successfully verified! You can now log in.");
    navigate("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Verification failed");
  } finally {
    setLoader(false);
  }
}

export const logOutUser = (navigate) => (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  dispatch({ type: "CLEAR_CART" });

  // Dispatch the exact toolkit action logic requested
  dispatch(clearCart());

  // Clear out auth tokens
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  // existing keys
  localStorage.removeItem("auth");
  localStorage.removeItem("cartItems");

  navigate("/login");
};

export const addUpdateUserAddress = (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState) => {

  // const { user }  = getState().auth;
  dispatch({ type: "BUTTON_LOADER" });

  try {
    if (addressId) {
      await api.put(`/addresses/${addressId}`, sendData);
      toast.success("Address Updated Successfully");
    } else {
      await api.post("/addresses", sendData);
      toast.success("Address Saved Successfully");
    }

    dispatch(getUserAddresses());
    dispatch({ type: "IS_SUCCESS" });

  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Internal Server Error");
    dispatch({ type: "IS_ERROR", payload: null });

  } finally {
    setOpenAddressModal(false);
  }


}

export const deleteUserAddress = (addressId, toast, setLoader) => async (dispatch) => {
  try {
    if (setLoader) setLoader(true);
    await api.delete(`/addresses/${addressId}`);
    toast.success("Address Deleted Successfully");
    dispatch(getUserAddresses());
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Failed to delete address");
  } finally {
    if (setLoader) setLoader(false);
  }
}

export const getUserAddresses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/user/addresses`);
    dispatch({ type: "USER_ADDRESS", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log("Error detected:", error.message);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch user addresses",
    });
  }
};

export const selectUserCheckoutAddress = (address) => {
  return {
    type: "SELECT_CHECKOUT_ADDRESS",
    payload: address,
  }
}

export const addPaymentMethod = (method) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: method,
  }
}

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETECHING" });
    await api.post('/carts/create', sendCartItems);
    await dispatch(getUserCart());


  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to create cart items"
    });

  }
}

export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETECHING" });
    const { data } = await api.get('/carts/users/cart');

    dispatch({
      type: "GET_USER_CART_PRODUCTS",
      payload: data.products,
      totalPrice: data.totalPrice,
      cartId: data.cartId,
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    dispatch({ type: "IS_SUCCESS" });


  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch cart items"
    });

  }
}

