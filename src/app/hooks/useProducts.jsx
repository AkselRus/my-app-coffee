import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import productService from "../services/product.service";

const ProductsContext = React.createContext();

export const useProducts = () => {
    return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        getProducts();
    }, []);
    // const getQuality = (id) => {
    //     return products.find((q) => q._id === id);
    // };
    const getProducts = async () => {
        try {
            const { content } = await productService.fetchAll();
            setProducts(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };
    async function createProduct(data) {
        try {
            const { content } = await productService.create(data);
            console.log(content);
            setProducts(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        if (error.response) {
            const { message } = error.response.data;
            setError(message);
        }
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <ProductsContext.Provider
            value={{
                products,
                createProduct,
                isLoading
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

ProductsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
