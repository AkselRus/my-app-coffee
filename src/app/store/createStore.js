import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import usersReducer from "./users";

const rootReducer = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    user: usersReducer
});

export function createSrore() {
    return configureStore({
        reducer: rootReducer
    });
}
