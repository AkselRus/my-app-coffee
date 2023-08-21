import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProductById } from "../../../store/products";
import { getCategoryById } from "../../../store/categories";

const CartProduct = ({ item, onClick }) => {
    const prod = useSelector(getProductById(item.prodId));
    const category = useSelector(getCategoryById(prod?.categories));
    if (prod) {
        return (
            <div>
                <div className="card mb-3 ">
                    <div className="card-body position-relative">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div>
                                    <img
                                        src={prod.image}
                                        className="img-fluid rounded-3"
                                        alt="Image product"
                                        width="80"
                                        height="90"
                                    />
                                </div>
                                <div className="p-2 text-wrap">
                                    <h5>{prod.name}</h5>
                                    <p className="small mb-2">
                                        {category &&
                                            `Категория: ${category.name}`}
                                    </p>
                                </div>
                                <div className="p-2 mt-4">
                                    <p className="small mb-0">
                                        {category &&
                                            `Количество: ${item.count}`}
                                    </p>
                                </div>
                                <div className="p-2 mt-4">
                                    <p className="small mb-0">
                                        {`Стоимость ${prod.price}`}
                                    </p>
                                </div>
                            </div>
                            <div className="position-absolute top-0 end-0">
                                <a
                                    type="button"
                                    className="p-3 mb-0"
                                    onClick={() => onClick(prod._id)}
                                >
                                    <i
                                        className="btn btn-danger btn-sm bi bi-trash text-white"
                                        role="button"
                                    ></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return "Корзина пуста";
};
CartProduct.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func
};
export default CartProduct;
