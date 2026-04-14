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
    dispatch({ type: "IS_FETCHING" });
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
    dispatch({ type: "IS_FETCHING" });
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

export const analyticsAction = () => async (dispatch, getState) => {
  try {
      dispatch({type:"IS_FETCHING"});
      const { data } = await api.get('/admin/app/analytics');
      dispatch({
        type: "FETCH_ANALYTICS",
        payload:data,
      })
      dispatch({ type: "IS_SUCCESS"});
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to Fetch Analytics Data",
    });
  }
};


export const getOrdersForDashboard = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/admin/orders?${queryString}`);
    dispatch({
      type: "GET_ADMIN_ORDERS",
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
      payload: error?.response?.data?.message || "Failed to fetch orders data",
    });
  }
};

export const updateOrderStatusFromDashboard =
     (orderId, orderStatus, toast, setLoader, setOpen, isAdmin) => async (dispatch, getState) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/orders/" : "/seller/orders/";
        const { data } = await api.put(`${endpoint}${orderId}/status`, { status: orderStatus});
        toast.success(data.message || "Order updated successfully");
        if (setOpen) setOpen(false);
        await dispatch(getOrdersForDashboard(""));
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
        setLoader(false)
    }
};


export const dashboardProductsAction = (queryString, isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const endpoint = isAdmin ? "/admin/products" : "/seller/products";
        const { data } = await api.get(`${endpoint}?${queryString}`);
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
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch dashboard products",
         });
    }
};


export const updateProductFromDashboard = 
    (sendData, toast, reset, setLoader, setOpen, isAdmin) => async (dispatch) => {
    try {
        setLoader(true);
        const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
        const { data } = await api.put(`${endpoint}${sendData.id}`, sendData);
        toast.success("Product update successful");
        reset();
        setLoader(false);
        setOpen(false);
        await dispatch(dashboardProductsAction(""));
        return data; // Return data so we can chain image uploads
    } catch (error) {
        toast.error(error?.response?.data?.description || "Product update failed");
        throw error;
    }
};



export const addNewProductFromDashboard = 
    (sendData, toast, reset, setLoader, setOpen, isAdmin) => async(dispatch, getState) => {
        try {
            setLoader(true);
            const endpoint = isAdmin ? "/admin/categories/" : "/seller/categories/";
            const { data } = await api.post(`${endpoint}${sendData.categoryId}/product`,
                sendData
            );
            toast.success("Product created successfully");
            reset();
            setOpen(false);
            await dispatch(dashboardProductsAction(""));
            return data; // Return data so we can chain image uploads over the new product ID
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.description || "Product creation failed");
            throw error;
        } finally {
            setLoader(false);
        }
    }

export const deleteProduct = 
    (setLoader, productId, toast, setOpenDeleteModal, isAdmin) => async (dispatch, getState) => {
    try {
        setLoader(true)
        const url = isAdmin ? `/admin/products/${productId}` : `/seller/products/${productId}`;
        await api.delete(url);
        toast.success("Product deleted successfully");
        setLoader(false);
        setOpenDeleteModal(false);
        await dispatch(dashboardProductsAction(""));
    } catch (error) {
        console.log(error);
        toast.error(
            error?.response?.data?.message || "Some Error Occured"
        )
    }
};


export const updateProductImageFromDashboard = 
    (formData, productId, toast, setLoader, setOpen, isAdmin) => async (dispatch) => {
    try {
        setLoader(true);
        // Admin uses /product/{id}/image, seller uses /seller/products/{id}/image
        const url = isAdmin ? `/product/${productId}/image` : `/seller/products/${productId}/image`;
        await api.put(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success("Image upload successful");
        setLoader(false);
        setOpen(false);
        await dispatch(dashboardProductsAction());
    } catch (error) {
        toast.error(error?.response?.data?.description || "Product Image upload failed");
     
    }
};

export const getAllCategoriesDashboard = (queryString) => async (dispatch) => {
  dispatch({ type: "CATEGORY_LOADER" });
  try {
    const { data } = await api.get(`/public/categories?${queryString}`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data["content"],
      pageNumber: data["pageNumber"],
      pageSize: data["pageSize"],
      totalElements: data["totalElements"],
      totalPages: data["totalPages"],
      lastPage: data["lastPage"],
    });

    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (err) {
    console.log(err);

    dispatch({
      type: "IS_ERROR",
      payload: err?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const createCategoryDashboardAction =
  (sendData, setOpen, reset, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });
      await api.post("/admin/categories", sendData);
      dispatch({ type: "CATEGORY_SUCCESS" });
      reset();
      toast.success("Category Created Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to create new category"
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const updateCategoryDashboardAction =
  (sendData, setOpen, categoryID, reset, toast) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.put(`/admin/categories/${categoryID}`, sendData);

      dispatch({ type: "CATEGORY_SUCCESS" });

      reset();
      toast.success("Category Update Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to update category"
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const deleteCategoryDashboardAction =
  (setOpen, categoryID, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.delete(`/admin/categories/${categoryID}`);

      dispatch({ type: "CATEGORY_SUCCESS" });

      toast.success("Category Delete Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to delete category");
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };


  export const getAllSellersDashboard =
  (queryString) => async (dispatch, getState) => {
    const { user } = getState().auth;
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.get(`/auth/sellers?${queryString}`);
      dispatch({
        type: "GET_SELLERS",
        payload: data["content"],
        pageNumber: data["pageNumber"],
        pageSize: data["pageSize"],
        totalElements: data["totalElements"],
        totalPages: data["totalPages"],
        lastPage: data["lastPage"],
      });

      dispatch({ type: "IS_SUCCESS" });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Failed to fetch sellers data",
      });
    }
  };

export const addNewDashboardSeller =
  (sendData, toast, reset, setOpen, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      await api.post("/auth/signup", sendData);
      reset();
      toast.success("Seller registered successfully!");

      await dispatch(getAllSellersDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.password ||
          "Internal Server Error"
      );
    } finally {
      setLoader(false);
      setOpen(false);
    }
  };

export const fetchUserOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/user/orders`);
    dispatch({
      type: "FETCH_USER_ORDERS",
      payload: data,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log("Error detected:", error.message);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch user orders",
    });
  }
};

export const updateUserProfileImage = (formData, toast, setLoader) => async (dispatch) => {
  try {
    setLoader(true);
    const { data } = await api.put(`/auth/profile/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    // Dispatch to update local storage and state seamlessly
    dispatch({ type: "UPDATE_PROFILE_IMAGE", payload: data.profileImage });
    
    toast.success("Profile image updated successfully");
  } catch (error) {
    console.log("Error detected:", error);
    toast.error(error?.response?.data?.message || "Failed to update profile image");
  } finally {
    setLoader(false);
  }
};

export const submitContactForm = (sendData, toast, reset, setLoader) => async (dispatch) => {
  try {
    setLoader(true);
    const { data } = await api.post(`/public/contact`, sendData);
    toast.success(data?.message || "Message sent successfully! We generally respond within 24 hours.");
    reset(); // Clear frontend form
  } catch (error) {
    console.log("Error detected:", error);
    toast.error(error?.response?.data?.message || "Failed to send message. Please try again.");
  } finally {
    setLoader(false);
  }
};