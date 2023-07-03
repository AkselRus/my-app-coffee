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
    // const handleSearchProd = ({ target }) => {
    //     setSelectedCateg(undefined);
    //     setSearchProd(target.value);
    // };
    const clearFilter = () => {
        setSelectedCateg();
    };
    const filterProd =
        selectedCateg &&
        products.filter((prod) => prod.categories === selectedCateg.id);

    const newProducts = selectedCateg ? filterProd : products;

    return (
        <>
            {categories && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <NavProduct
                        items={categories}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedCateg}
                        onClick={clearFilter}
                    />
                </div>
            )}
            {/* menu */}
            <main className="container">
                <div className="d-flex align-items-center p-3 my-3 text-white bg-dark rounded shadow-sm">
                    <img
                        className="me-3"
                        src="https://i.pinimg.com/originals/8c/10/a1/8c10a12a0210244b0e66bf20668d6fc5.png"
                        alt=""
                        width="48"
                        height="48"
                    />
                    <div className="lh-1"></div>
                    <input
                        className="form-control form-control-dark bg-dark text-white border-0"
                        type="text"
                        placeholder="Поиск"
                        aria-label="Поиск"
                    />
                </div>

                <div className="my-3 p-3 bg-body text-white rounded shadow-sm">
                    <h6 className="border-bottom pb-2 mb-0">Предложения</h6>

                    {newProducts
                        ? newProducts.map((p) => (
                              <Product key={p.id} data={p} />
                          ))
                        : "Loading..."}

                    <small className="d-block text-end mt-3">
                        <a href="#">Все предложения</a>
                    </small>
                </div>
            </main>
        </>
    );
};

export default MainPage;
