import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList
} from "../../../store/users";
import { loadCategoriesList } from "../../../store/categories";
import { loadproductsList } from "../../../store/products";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        dispatch(loadCategoriesList());
        dispatch(loadproductsList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, []);

    if (usersStatusLoading) return "Loading";
    return children;
};
AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AppLoader;
