import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/users";
import CartProduct from "./cartProduct";
import {
    countDecrement,
    countIncrement,
    getCartLoadingStatus,
    getShopList,
    removeProdCart
} from "../../store/cart";
import SpinerLoader from "../SpinerLoader";

const ShopingCarts = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getUser());
    const shopStatus = useSelector(getCartLoadingStatus());
    const shopList = useSelector(getShopList());
    console.log("shopList", shopList);
    console.log("shopStatus", shopStatus);

    const handleIncrement = (id) => {
        console.log("handleIncrement", id);
        dispatch(countIncrement(id));
    };
    const handleDecrement = (id) => {
        console.log("handleDecrement", id);
        dispatch(countDecrement(id));
    };

    const handleDelete = (id) => {
        dispatch(removeProdCart(id));
        console.log(id);
    };

    if (shopList?.length === 0) return "Корзина пуста";

    return (
        <div>
            <section className="h-100 h-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <h5 className="mb-3">
                                                <a
                                                    href="/"
                                                    className="text-body"
                                                >
                                                    <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                    Back to Main Page
                                                </a>
                                            </h5>
                                            <hr />

                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p className="mb-1">
                                                        Shopping cart
                                                    </p>
                                                    <p className="mb-0">
                                                        {`You have ${
                                                            shopList?.length ||
                                                            "0"
                                                        } items in your cart`}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="mb-0">
                                                        <span className="text-muted">
                                                            Sort by:
                                                        </span>{" "}
                                                        <a
                                                            href="#!"
                                                            className="text-body"
                                                        >
                                                            price{" "}
                                                            <i className="fas fa-angle-down mt-1"></i>
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            {shopList && !shopStatus ? (
                                                shopList.map((prod) => (
                                                    <CartProduct
                                                        key={prod.prodId}
                                                        item={prod}
                                                        increment={
                                                            handleIncrement
                                                        }
                                                        decrement={
                                                            handleDecrement
                                                        }
                                                        onClick={handleDelete}
                                                    />
                                                ))
                                            ) : (
                                                <SpinerLoader />
                                            )}
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

                                                    <p className="small mb-2">
                                                        Card type
                                                    </p>
                                                    <a
                                                        href="#!"
                                                        type="submit"
                                                        className="text-white"
                                                    >
                                                        <i className="fab fa-cc-mastercard fa-2x me-2"></i>
                                                    </a>
                                                    <a
                                                        href="#!"
                                                        type="submit"
                                                        className="text-white"
                                                    >
                                                        <i className="fab fa-cc-visa fa-2x me-2"></i>
                                                    </a>
                                                    <a
                                                        href="#!"
                                                        type="submit"
                                                        className="text-white"
                                                    >
                                                        <i className="fab fa-cc-amex fa-2x me-2"></i>
                                                    </a>
                                                    <a
                                                        href="#!"
                                                        type="submit"
                                                        className="text-white"
                                                    >
                                                        <i className="fab fa-cc-paypal fa-2x"></i>
                                                    </a>

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

                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">
                                                            Subtotal
                                                        </p>
                                                        <p className="mb-2">
                                                            $4798.00
                                                        </p>
                                                    </div>

                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">
                                                            Shipping
                                                        </p>
                                                        <p className="mb-2">
                                                            $20.00
                                                        </p>
                                                    </div>

                                                    <div className="d-flex justify-content-between mb-4">
                                                        <p className="mb-2">
                                                            Total(Incl. taxes)
                                                        </p>
                                                        <p className="mb-2">
                                                            $4818.00
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="btn btn-info btn-block btn-lg"
                                                    >
                                                        <div className="d-flex justify-content-between">
                                                            <span>
                                                                $4818.00
                                                            </span>
                                                            <span>
                                                                Checkout{" "}
                                                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                                            </span>
                                                        </div>
                                                    </button>
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
