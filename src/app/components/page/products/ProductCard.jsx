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
    const handleClickPay = (data) => {
        console.log("data", data);
        dispatch(addInCartBy({ prodId: data.id, count: 1, price: data.price }));
    };
    if (product) {
        return (
            <div className="container shadow p-3 mb-5 bg-white rounded">
                <div className=" mx-auto">
                    <div className="row g-0 ">
                        <div className="col-md-4">
                            <img
                                src={product.image}
                                className="img-fluid rounded-start"
                                alt="..."
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">
                                    {product.description}
                                </p>
                                <div className="row">
                                    <div className="col">
                                        <p className="small mb-0">
                                            Количество: {`1`}
                                        </p>
                                        <p className="small mb-0">
                                            {`Цена: ${product.price}`}
                                        </p>
                                    </div>
                                    <div className="col">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                                handleClickPay(product)
                                            }
                                        >
                                            Купить
                                        </button>
                                    </div>
                                </div>

                                <p className="card-text position-absolute bottom-0 end-0">
                                    <small className="text-muted">
                                        id: <span>{product.id}</span>
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return <SpinerLoader />;
};

// ProductCard.propTypes = {}

export default ProductCard;
