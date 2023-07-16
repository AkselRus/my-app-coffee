// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         entities: null,
//         isLoading: true,
//         error: null
//     },
//     reducers: {
//         cartRequested: (state) => {
//             state.isLoading = true;
//         },
//         cartReceved: (state, action) => {
//             state.entities = action.payload;
//             state.isLoading = false;
//         },
//         cartRequesFailed: (state, action) => {
//             state.error = action.payload;
//             state.isLoading = false;
//         }
//     }
// });

// const { reducer: cartReducer, actions } = cartSlice;
// const { cartRequested, cartReceved, cartRequesFailed } = actions;

// export default cartReducer;
