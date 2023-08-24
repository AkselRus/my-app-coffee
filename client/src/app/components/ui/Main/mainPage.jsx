import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList } from "../../../store/products";

import ProductList from "../../page/products/productList";
import MainCategory from "./mainCategory";
import SpinerLoader from "../../SpinerLoader";
import Carusel from "../../Carusel";
import { getUser, updateUser } from "../../../store/users";

const MainPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProductsList());
    const user = useSelector(getUser());

    const [searchProd, setSearchProd] = useState("");
    const [selectedCateg, setSelectedCateg] = useState();
    const handleCategorySelect = (item) => {
        if (searchProd !== "") setSearchProd("");
        setSelectedCateg(item);
    };
    // const handleSearchProd = ({ target }) => {
    //     setSearchProd(target.value);
    // };
    const clearFilter = () => {
        setSelectedCateg();
    };
    const handleClickPay = (data) => {
        const newUser = {
            ...user,
            purchases: [
                ...user.purchases,
                { prodId: data._id, count: 1, price: data.price }
            ]
        };
        dispatch(updateUser(newUser));
    };

    if (products) {
        const filteredProducts = searchProd
            ? products.filter(
                  (prod) =>
                      prod.name
                          .toLowerCase()
                          .indexOf(searchProd.toLowerCase()) !== -1
              )
            : selectedCateg
            ? products.filter((prod) => prod.categories === selectedCateg._id)
            : products;

        // const newProducts = selectedCateg ? filteredProducts : products;
        const count = filteredProducts?.length;
        console.log("filteredProducts", filteredProducts);

        return (
            <>
                <main>
                    {/* menu */}
                    <div className="row">
                        {/* <Search
                            handleChange={handleSearchProd}
                            serch={searchProd}
                        /> */}
                        <Carusel />
                        <MainCategory
                            label="Категории"
                            selectedCateg={selectedCateg}
                            onClick={clearFilter}
                            handleCategorySelect={handleCategorySelect}
                        />
                        <ProductList
                            data={filteredProducts}
                            handleClic={handleClickPay}
                            setCateg={setSelectedCateg}
                            count={count}
                            searchProd={searchProd}
                        />
                        {/* <div className="d-flex justify-content-center"></div> */}

                        {/*
                    <div className="my-3 p-3 bg-body text-white rounded shadow-sm">
                        <h6 className="border-bottom pb-2 mb-0">Предложения</h6>
                    </div> */}
                    </div>
                </main>
            </>
        );
    }
    return <SpinerLoader />;
};

export default MainPage;
