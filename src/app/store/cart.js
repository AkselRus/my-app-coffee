import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        cartRequested: (state) => {
            state.isLoading = true;
        },
        cartReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        cartRequesFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addInCart: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        removeItemCart: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p.prodId === action.payload
            );
            state.isLoading = false;
        },
        incrementCount: (state, action) => {
            const elIndex = state.entities.findIndex(
                (i) => i.prodId === action.payload
            );
            state.entities[elIndex].count = state.entities[elIndex].count + 1;
        },
        decrementCount: (state, action) => {
            const elIndex = state.entities.findIndex(
                (i) => i.prodId === action.payload
            );
            state.entities[elIndex].count = state.entities[elIndex].count - 1;
        }
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const {
    addInCart,
    cartRequested,
    cartReceved,
    cartRequesFailed,
    removeItemCart,
    incrementCount,
    decrementCount
} = actions;

export const loadCartList = () => async (dispatch) => {
    dispatch(cartRequested());
    try {
        const { content } = await userService.getCart();
        dispatch(cartReceved(content));
    } catch (error) {
        dispatch(cartRequesFailed(error.message));
    }
};
export const removeProdCart = (payload) => async (dispatch) => {
    dispatch(cartRequested());
    dispatch(removeItemCart(payload));
    try {
        await userService.deleteItemPurchases(payload);
    } catch (error) {
        console.log(error);
    }
};

export const addInCartBy = (payload) => async (dispatch) => {
    dispatch(addInCart(payload));
    try {
        await userService.addCart(payload);
    } catch (error) {
        console.log(error);
    }
};
export const countIncrement = (payload) => (dispatch) => {
    dispatch(incrementCount(payload));
};
export const countDecrement = (payload) => (dispatch) => {
    dispatch(decrementCount(payload));
};
export const getShopList = () => (state) => state.cart.entities;
export const getShopListLength = () => (state) => state.cart.entities?.length;

export const getCartLoadingStatus = () => (state) => state.cart.isLoading;

export default cartReducer;
