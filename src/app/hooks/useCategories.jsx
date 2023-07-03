import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import categoriesService from "../services/categories.service";

const CategoriesContext = React.createContext();

export const useCategories = () => {
    return useContext(CategoriesContext);
};

export const CategoriesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getCategoriesList();
    }, []);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function getCategories(id) {
        return categories.find((p) => p.id === id);
    }

    async function getCategoriesList() {
        try {
            const { content } = await categoriesService.get();
            setCategories(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    return (
        <CategoriesContext.Provider
            value={{ isLoading, categories, getCategories }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

CategoriesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
