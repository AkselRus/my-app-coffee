import React, { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { getCategoryById } from "../../../store/categories";
import { updateProduct } from "../../../store/products";
import BookMark from "../../common/bookmark";
import SpinerLoader from "../../SpinerLoader";

const Product = ({ data, onClick }) => {
    const dispatch = useDispatch();
    const categori = useSelector(getCategoryById(data?.categories));

    const [bookmark, setBookmark] = useState(data.bookmark);
    console.log("bookmark", bookmark);
    const toogleBookmark = () => {
        setBookmark((prev) => !prev);
        const newObject = { ...data, bookmark: bookmark };
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
                        <BookMark status={bookmark} onClick={toogleBookmark} />
                        <img
                            src={data.image}
                            className="card-img-top"
                            height="250px"
                            // style={{ height: "100", with: "100" }}
                            alt="icon"
                        />

                        <div className="card-body p-2 m-2">
                            <h5 className="">
                                <a
                                    className="nav-link text-dark p-0"
                                    href={`/product/${data.id}`}
                                >
                                    {data.name}
                                </a>
                            </h5>

                            <div className="d-flex align-items-end">
                                <h5>{`${Number(data.price).toFixed(2)} ₽`}</h5>
                                <a
                                    onClick={() => onClick(data)}
                                    className="btn btn-outline-success ms-auto"
                                >
                                    <i className="bi bi-cart"></i>
                                </a>
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
