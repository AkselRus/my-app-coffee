import React, { useState } from "react";
import Product from "../page/products/product";
import NavProduct from "./navProduct";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/categories";
import { getProductsList } from "../../store/products";
import { addInCartBy } from "../../store/cart";

const MainPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProductsList());
    const categories = useSelector(getCategories());

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
        dispatch(addInCartBy({ prodId: data.id, count: 1 }));
    };
    const filterProd =
        selectedCateg &&
        products.filter((prod) => prod.categories === selectedCateg.id);

    const newProducts = selectedCateg ? filterProd : products;

    return (
        <>
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

                {categories && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <NavProduct
                            items={categories}
                            onItemSelect={handleCategorySelect}
                            selectedItem={selectedCateg}
                            onClick={clearFilter}
                        />
                    </div>
                )}

                <div className="my-3 p-3 bg-body text-white rounded shadow-sm">
                    <h6 className="border-bottom pb-2 mb-0">Предложения</h6>

                    {newProducts
                        ? newProducts.map((p) => (
                              <Product
                                  key={p.id}
                                  data={p}
                                  onClick={handleClickPay}
                              />
                          ))
                        : "Loading..."}

                    <small className="d-block text-end mt-3">
                        <a onClick={() => setSelectedCateg()}>
                            Все предложения
                        </a>
                    </small>
                </div>
            </main>
        </>
    );
};

export default MainPage;
