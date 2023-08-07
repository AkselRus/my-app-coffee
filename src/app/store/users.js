import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import history from "../utils/hystory";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequesFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestedSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoading = true;
        },
        authRequestedFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = null;
        },
        userUpdate: (state, action) => {
            // const elIndex = state.entities.findIndex(
            //     (u) => u._id === action.payload._id
            // );
            state.entities = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequesFailed,
    authRequestedSuccess,
    authRequestedFailed,
    userCreated,
    userLoggedOut,
    userUpdate
} = actions;

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.getCurrentUser();

        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequesFailed(error.message));
    }
};

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    window.location.assign("/");
};
export const logIn =
    ({ payload }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.logIn({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestedSuccess({ userId: data?.localId }));
            window.location.assign("/");
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestedFailed(errorMessage));
            } else {
                dispatch(authRequestedFailed(error.message));
            }
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestedSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestedFailed(error.message));
        }
    };
function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push(`/users/${content._id}`);
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}
export const updateUser = (payload) => async (dispatch) => {
    console.log("updateUser", payload);
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdate(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

// export const deleteUser = (userId) => (state) => {
//     if (state.user.entities) {
//         return state.user.entities.filter((user) => user._id !== userId);
//     }
// };
export const getUser = () => (state) => state.user.entities;

export const getUsersLoadingStatus = () => (state) => state.user.isLoading;
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getDataStatus = () => (state) => state.user.dataLoaded;
export const getCurrentUserId = () => (state) => state.user.auth.userId;
export const getAuthErrors = () => (state) => state.user.error;

export default usersReducer;
