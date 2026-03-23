const intialState = {
    cart: [],
    intitalPrice: 0,
    cartId: null,
}
export const cartReducer = (state = intialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            const productToAdd = action.payload;
            const existingProduct = state.cart.find(
                (item) => item.productId === productToAdd.productId
            );

            if (existingProduct) {
                const updatedCart = state.cart.map((item) => {
                    if (item.productId === productToAdd.productId) {
                        return { ...productToAdd, quantity: item.quantity + productToAdd.quantity };
                    } else {
                        return item;
                    }
                });
                return {
                    ...state,
                    cart: updatedCart,
                }
            } else {
                const newCart = [...state.cart, productToAdd];
                return {
                    ...state,
                    cart: newCart,
                }
            }

        case "CLEAR_CART":
            return { ...state, cart: [] };

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((item) => item.productId !== action.payload),
            };

        case "UPDATE_CART_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.productId === action.payload.productId
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };

        case "GET_USER_CART_PRODUCTS":
            return {
                ...state,
                cart : action.payload,
                totalPrice: action.totalPrice,
                cartId: action.cartId,
                
            }    

        default:
            return state;
    }
    return state;
}