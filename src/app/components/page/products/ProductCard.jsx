import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../store/products";
import SpinerLoader from "../../SpinerLoader";
import { addInCartBy } from "../../../store/cart";
// import PropTypes from 'prop-types'

const ProductCard = () => {
    const { prodId } = useParams();
    const dispatch = useDispatch();

    const product = useSelector(getProductById(prodId));
    console.log("product", product);

    const handleClickPay = (data) => {
        dispatch(addInCartBy({ prodId: data.id, count: 1, price: data.price }));
    };
    if (product) {
        return (
            <section className="py-5">
                <div className="container shadow p-3 mb-5 bg-white rounded">
                    <div className="mx-auto">
                        <div className="row g-0 ">
                            <div className="col-md-4">
                                <img
                                    src={product.image}
                                    className="img-fluid rounded-start"
                                    alt="..."
                                />
                            </div>
                            <div className="col-md-8 position-relative">
                                <div className="card-body p-2">
                                    <h3 className="card-title">
                                        {product.name}
                                    </h3>
                                    <p className="card-text">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="p-2">
                                    <p className="small mb-0">
                                        Количество: {product.quantity}
                                    </p>
                                    <p className="small mb-0">
                                        Цена: {product.price}
                                    </p>
                                </div>
                                <div className="d-flex align-items-end p-2">
                                    {/* <p>
                                        <small>id {product.id}</small>
                                    </p> */}
                                    <button
                                        className="btn btn-primary ms-auto position-absolute bottom-0 end-0"
                                        onClick={() => handleClickPay(product)}
                                    >
                                        Добавить в корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    } else return <SpinerLoader />;
};

// ProductCard.propTypes = {}

export default ProductCard;
