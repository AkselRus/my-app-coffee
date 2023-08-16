import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginate } from "../../../utils/paginate";
import CartProduct from "./cartProduct";
import {
    getCartLoadingStatus,
    getShopList,
    loadCartList,
    removeProdCart
} from "../../../store/cart";
import SpinerLoader from "../../SpinerLoader";
import SortBy from "../SortBy";
import Pagination from "../pagination";
import CardPay from "./CardPay";

const ShopingCarts = () => {
    const dispatch = useDispatch();
    const shopStatus = useSelector(getCartLoadingStatus());
    const shopList = useSelector(getShopList());

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    const [sort, setSort] = useState(shopList);
    useEffect(() => {
        setSort(shopList);
    }, [shopList]);

    const handleSort = (params) => {
        console.log(params);

        if (params === "max") {
            const sortData = shopList.toSorted(
                (a, b) => parseFloat(b.price) - parseFloat(a.price)
            );
            return setSort(sortData);
        }
        if (params === "min") {
            const sortData = shopList.toSorted(
                (a, b) => parseFloat(a.price) - parseFloat(b.price)
            );

            return setSort(sortData);
        }
        if (params === "bookmark") {
            const trueFirst = shopList.toSorted(
                (a, b) => Number(b.bookmark) - Number(a.bookmark)
            );

            return setSort(trueFirst);
        } else return setSort(shopList);
    };

    useEffect(() => {
        if (!shopStatus) {
            dispatch(loadCartList());
        }
    }, [shopList?.length]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleDelete = (id) => {
        dispatch(removeProdCart(id));
    };
    if (shopStatus) return <SpinerLoader />;

    const productCrop = paginate(sort, currentPage, pageSize);

    const count = shopList?.length;

    return (
        <div>
            <section className="py-5 h-custom">
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <h5>
                                                <a
                                                    href="/"
                                                    className="text-body"
                                                >
                                                    <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                    Back to Main Page
                                                </a>
                                            </h5>
                                            <hr />

                                            <SortBy
                                                num={shopList?.length}
                                                onSort={handleSort}
                                                label="Shoping cart"
                                            />

                                            {shopList
                                                ? productCrop?.map((prod) => (
                                                      <CartProduct
                                                          key={prod.prodId}
                                                          item={prod}
                                                          onClick={handleDelete}
                                                      />
                                                  ))
                                                : "Корзина пуста"}
                                            <div className="d-flex justify-content-center">
                                                <Pagination
                                                    itemsCount={
                                                        count || currentPage
                                                    }
                                                    pageSize={pageSize}
                                                    currentPage={currentPage}
                                                    onPageChange={
                                                        handlePageChange
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-5">
                                            <div className="card bg-primary text-white rounded-3">
                                                <CardPay />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShopingCarts;
