const intialState = {
    adminOrder:null,
    userOrders: [],
    pagination:{},
};

export const orderReducer = (state  = intialState,action) => {
    switch (action.type) {
        case "GET_ADMIN_ORDERS":
            return {
                ...state,
                adminOrder: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize : action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },

            };
        case "FETCH_USER_ORDERS":
            return {
                ...state,
                userOrders: action.payload,
            };
            default:
                return state;
    }
};