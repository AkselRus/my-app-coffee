import { createAction, createSlice } from "@reduxjs/toolkit";
import history from "../utils/hystory";
import productService from "../services/product.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        productsRequesFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        productLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = null;
        },
        productUpdate: (state, action) => {
            const elIndex = state.entities.findIndex(
                (u) => u.id === action.payload.id
            );
            state.entities[elIndex] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceved,
    productsRequesFailed,
    productCreated,
    productUpdate
} = actions;

export const loadproductsList = () => async (dispatch) => {
    dispatch(productsRequested());
    try {
        const { content } = await productService.get();
        dispatch(productsReceved(content));
    } catch (error) {
        dispatch(productsRequesFailed(error.message));
    }
};

const productCreateRequested = createAction("products/productCreateRequested");
const createproductFailed = createAction("products/createProductFailed");
const updateProductFailed = createAction("products/updateProductFailed");

export function createProduct(payload) {
    return async function (dispatch) {
        dispatch(productCreateRequested());
        try {
            const { content } = await productService.create(payload);
            dispatch(productCreated(content));
            history.push("/products");
        } catch (error) {
            dispatch(createproductFailed(error.message));
        }
    };
}
export const updateProduct = (payload) => async (dispatch) => {
    try {
        const { content } = await productService.update(payload);
        dispatch(productUpdate(content));
        history.push(`/products/${content.id}`);
    } catch (error) {
        dispatch(updateProductFailed(error.message));
    }
};

export const deleteProduct = (productId) => (state) => {
    if (state.products.entities) {
        return state.products.entities.filter(
            (product) => product.id !== productId
        );
    }
};

// export const addProductInCart = (productId) => (dispatch) => {
//     dispatch(addInCart(productId));
// };

export const getProductsList = () => (state) => state.products.entities;
export const getProductById = (productId) => (state) => {
    if (state.products.entities) {
        return state.products.entities.find((u) => u.id === productId);
    }
};

export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;
export const getIsLoggedIn = () => (state) => state.products.isLoggedIn;
export const getDataStatus = () => (state) => state.products.dataLoaded;

export default productsReducer;