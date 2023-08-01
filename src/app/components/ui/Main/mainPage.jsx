import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList } from "../../../store/products";
import { addInCartBy } from "../../../store/cart";
import ProductList from "../../page/products/productList";
import MainCategory from "./mainCategory";
import Search from "../Search";

const MainPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProductsList());

    const [searchProd, setSearchProd] = useState("");
    const [selectedCateg, setSelectedCateg] = useState();
    const handleCategorySelect = (item) => {
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
    const handleClickPay = (data) => {
        dispatch(addInCartBy({ prodId: data.id, count: 1, price: data.price }));
    };
    const filterProd =
        selectedCateg &&
        products?.filter((prod) => prod.categories === selectedCateg.id);

    const newProducts = selectedCateg ? filterProd : products;

    return (
        <>
            {/* menu */}
            <div className="container-fluid">
                <div className="row">
                    <Search />
                    <MainCategory
                        label="Категории"
                        selectedCateg={selectedCateg}
                        onClick={clearFilter}
                        handleCategorySelect={handleCategorySelect}
                    />

                    <ProductList
                        data={newProducts}
                        handleClic={handleClickPay}
                        setCateg={setSelectedCateg}
                    />
                    {/*
                    <div className="my-3 p-3 bg-body text-white rounded shadow-sm">
                        <h6 className="border-bottom pb-2 mb-0">Предложения</h6>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default MainPage;
