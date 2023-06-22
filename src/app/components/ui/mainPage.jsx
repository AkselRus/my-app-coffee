import React from "react";
import FilterInput from "./filterInput";
import { useProducts } from "../../hooks/useProducts";
import Product from "../page/products/product";

const MainPage = () => {
    const { products } = useProducts();
    console.log("products", products);
    return (
        <div>
            <FilterInput />
            <div className="container">
                {products
                    ? products.map((p) => <Product key={p.id} data={p} />)
                    : "Loading..."}
            </div>
        </div>
    );
};

export default MainPage;
