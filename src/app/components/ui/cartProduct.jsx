import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProductById } from "../../store/products";
import { getCategoryById } from "../../store/categories";

const CartProduct = ({ item, onClick, increment, decrement }) => {
    console.log("item", item);
    const prod = useSelector(getProductById(item.prodId));
    const category = useSelector(getCategoryById(prod?.categories));
    return (
        prod &&
        category && (
            <div>
                <div className="card mb-3 ">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div>
                                    <img
                                        src={prod.image}
                                        className="img-fluid rounded-3"
                                        alt="Shopping item"
                                        width="65"
                                    />
                                </div>
                                <div className="ms-3 text-wrap">
                                    <h5>{prod.name}</h5>
                                    <p className="small mb-0">
                                        {category &&
                                            `Категория: ${category.name}`}
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex flex-row-reverse align-items-sm-center">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => increment(prod.id)}
                                >
                                    +
                                </button>
                                <input
                                    className="w-25"
                                    min="0"
                                    name="quantity"
                                    value={item && item.count}
                                    readOnly={true}
                                    // defaultValue={item.count}
                                    type="text"
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => decrement(prod.id)}
                                >
                                    -
                                </button>
                            </div>

                            <div className="d-flex flex-row align-items-center">
                                <div width="80" className="mb-1">
                                    <h5 className="mb-0">{prod.price}</h5>
                                </div>
                                <a
                                    type="button"
                                    className="p-3 mb-0"
                                    onClick={() => onClick(prod.id)}
                                >
                                    <i
                                        className="btn btn-danger btn-sm bi bi-x-lg text-white"
                                        role="button"
                                    ></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
CartProduct.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
    increment: PropTypes.func,
    decrement: PropTypes.func
};
export default CartProduct;
