import React, { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import Product from "../page/products/product";
import NavProduct from "./navProduct";
import { useCategories } from "../../hooks/useCategories";

const MainPage = () => {
    const { products } = useProducts();
    const { categories } = useCategories();
    const [searchProd, setSearchProd] = useState("");
    const [selectedCateg, setSelectedCateg] = useState();

    const handleProfessionSelect = (item) => {
        if (searchProd !== "") setSearchProd("");
        setSelectedCateg(item);
    };
    const handleSearchProd = ({ target }) => {
        setSelectedCateg(undefined);
        setSearchProd(target.value);
    };
    const clearFilter = () => {
        setSelectedCateg();
    };
    return (
        <div>
            <div className="d-flex">
                {categories && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <NavProduct
                            items={categories}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedCateg}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    {/* <div className="col-9"> */}
                    <input
                        type="text"
                        name="searchProd"
                        className="form-control"
                        placeholder="Search..."
                        onChange={handleSearchProd}
                        value={searchProd}
                    />
                    {products
                        ? products.map((p) => <Product key={p.id} data={p} />)
                        : "Loading..."}
                    <div className="d-flex justify-content-center">
                        Сдесь должна быть погинация
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
