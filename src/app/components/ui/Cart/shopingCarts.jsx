import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/users";
import CartProduct from "./cartProduct";
import {
    getCartLoadingStatus,
    getShopList,
    loadCartList,
    removeProdCart
} from "../../../store/cart";
import SpinerLoader from "../../SpinerLoader";
import Total from "./Total";
import CardType from "./CardType";
import SortBy from "../SortBy";

const ShopingCarts = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getUser());
    const shopStatus = useSelector(getCartLoadingStatus());

    const shopList = useSelector(getShopList());

    useEffect(() => {
        if (!shopStatus) {
            dispatch(loadCartList());
        }
    }, [shopList?.length]);

    const handleDelete = (id) => {
        dispatch(removeProdCart(id));
    };
    if (shopStatus) return <SpinerLoader />;

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
                                                arr={shopList}
                                                label="Shoping cart"
                                            />

                                            {shopList && shopList?.length !== 0
                                                ? shopList.map((prod) => (
                                                      <CartProduct
                                                          key={prod.prodId}
                                                          item={prod}
                                                          onClick={handleDelete}
                                                      />
                                                  ))
                                                : "Корзина пуста"}
                                        </div>

                                        <div className="col-lg-5">
                                            <div className="card bg-primary text-white rounded-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="mb-0">
                                                            Card details
                                                        </h5>
                                                        <img
                                                            src={
                                                                currentUser.image
                                                            }
                                                            className="img-fluid rounded-3"
                                                            width="45"
                                                            alt="Avatar"
                                                        />
                                                    </div>

                                                    <CardType />

                                                    <form className="mt-4">
                                                        <div className="form-outline form-white mb-4">
                                                            <input
                                                                type="text"
                                                                id="typeName"
                                                                className="form-control form-control-lg"
                                                                siez="17"
                                                                placeholder="Cardholder's Name"
                                                            />
                                                            <label
                                                                className="form-label"
                                                                htmlFor="typeName"
                                                            >
                                                                Cardholders Name
                                                            </label>
                                                        </div>

                                                        <div className="form-outline form-white mb-4">
                                                            <input
                                                                type="text"
                                                                id="typeText"
                                                                className="form-control form-control-lg"
                                                                siez="17"
                                                                placeholder="1234 5678 9012 3457"
                                                                minLength="19"
                                                                maxLength="19"
                                                            />
                                                            <label
                                                                className="form-label"
                                                                htmlFor="typeText"
                                                            >
                                                                Card Number
                                                            </label>
                                                        </div>

                                                        <div className="row mb-4">
                                                            <div className="col-md-6">
                                                                <div className="form-outline form-white">
                                                                    <input
                                                                        type="text"
                                                                        id1="typeExp"
                                                                        className="form-control form-control-lg"
                                                                        placeholder="MM/YYYY"
                                                                        size="7"
                                                                        id="exp"
                                                                        minLength="7"
                                                                        maxLength="7"
                                                                    />
                                                                    <label
                                                                        className="form-label"
                                                                        htmlFor="typeExp"
                                                                    >
                                                                        Expiration
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-outline form-white">
                                                                    <input
                                                                        type="password"
                                                                        id="typeTextPass"
                                                                        className="form-control form-control-lg"
                                                                        placeholder="&#9679;&#9679;&#9679;"
                                                                        size="1"
                                                                        minLength="3"
                                                                        maxLength="3"
                                                                    />
                                                                    <label
                                                                        className="form-label"
                                                                        htmlFor="typeTextPass"
                                                                    >
                                                                        Cvv
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>

                                                    <hr className="my-4" />

                                                    <Total />
                                                </div>
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
