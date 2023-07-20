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
        }
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const { addInCart, cartRequested, cartReceved, cartRequesFailed } = actions;

export const loadCartList = () => async (dispatch) => {
    dispatch(cartRequested());
    try {
        const { content } = await userService.getCart();
        dispatch(cartReceved(content));
    } catch (error) {
        dispatch(cartRequesFailed(error.message));
    }
};

export const addInCartBy = (payload) => async (dispatch, getState) => {
    console.log(payload);
    dispatch(addInCart(payload));
    try {
        const currentState = getState();
        console.log("currentState", currentState);

        // console.log("currentState", currentState.user.entities);
        // const { content } = await userService.update();
        // dispatch(userUpdate(content));
    } catch (error) {
        console.log(error);
    }
};

export default cartReducer;
