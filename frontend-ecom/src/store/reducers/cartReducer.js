// Helper: Check if two cart items represent the same product variation
const isSameCartItem = (a, b) => {
    return a.productId === b.productId 
        && (a.selectedSize || null) === (b.selectedSize || null)
        && (a.selectedColor || null) === (b.selectedColor || null);
};

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
                (item) => isSameCartItem(item, productToAdd)
            );

            if (existingProduct) {
                const updatedCart = state.cart.map((item) => {
                    if (isSameCartItem(item, productToAdd)) {
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
                cart: state.cart.filter((item) => 
                    !(item.productId === action.payload 
                      && (item.selectedSize || null) === (action.selectedSize || null) 
                      && (item.selectedColor || null) === (action.selectedColor || null))
                ),
            };

        case "UPDATE_CART_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    (item.productId === action.payload.productId
                      && (item.selectedSize || null) === (action.payload.selectedSize || null)
                      && (item.selectedColor || null) === (action.payload.selectedColor || null))
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
}