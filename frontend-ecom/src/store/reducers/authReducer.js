const initialState = {
    user: null,
    address: [],
    selectedUserAddress: null,
    isSessionExpired: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload, isSessionExpired: false }

        case "USER_ADDRESS":
            return { ...state, address: action.payload }

        case "SELECT_CHECKOUT_ADDRESS":
            return { ...state, selectedUserAddress: action.payload }

        case "UPDATE_PROFILE_IMAGE":
            // Also securely update local storage without breaking other fields
            const authStr = localStorage.getItem("auth");
            if (authStr) {
                const authData = JSON.parse(authStr);
                authData.profileImage = action.payload;
                localStorage.setItem("auth", JSON.stringify(authData));
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    profileImage: action.payload
                }
            };

        case "LOG_OUT":
            return {
                user: null,
                address: null,
                selectedUserAddress: null,
                isSessionExpired: false,
            };

        case "SESSION_EXPIRED":
            return { ...state, isSessionExpired: true };

        case "CLEAR_SESSION_EXPIRED":
            return { ...state, isSessionExpired: false };

        default:
            return state;
    }
}