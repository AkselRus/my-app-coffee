import React from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { getCategoryById } from "../../../store/categories";
import { updateProduct } from "../../../store/products";
import BookMark from "../../common/bookmark";
import SpinerLoader from "../../SpinerLoader";
import { getIsLoggedIn } from "../../../store/users";

const Product = ({ data, onClick }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const categori = useSelector(getCategoryById(data?.categories));

    const toogleBookmark = async () => {
        const newObject = await { ...data, bookmark: !data.bookmark };
        dispatch(updateProduct(newObject));
    };

    if (categori && data) {
        return (
            <>
                <div className=" col-md-4 p-2">
                    <div
                        className="card m-2 h-100 shadow bg-body-tertiary "
                        style={{ minWidth: "100%" }}
                    >
                        <BookMark
                            status={data.bookmark}
                            onClick={toogleBookmark}
                        />
                        <img
                            src={data.image}
                            className="card-img-top"
                            height="250px"
                            alt="icon"
                        />

                        <div className="card-body p-2 m-2">
                            <h5 className="">
                                <a
                                    className="nav-link text-dark p-0"
                                    href={`/product/${data._id}`}
                                >
                                    {data.name}
                                </a>
                            </h5>

                            <div className="d-flex align-items-end">
                                <h5>{`${Number(data.price).toFixed(2)} ₽`}</h5>
                                {isLoggedIn && (
                                    <a
                                        onClick={() => onClick(data)}
                                        className="btn btn-outline-success ms-auto"
                                    >
                                        <i className="bi bi-cart"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else return <SpinerLoader />;
};
Product.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func
};
export default Product;
