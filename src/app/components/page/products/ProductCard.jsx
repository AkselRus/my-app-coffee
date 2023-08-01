import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../store/products";
import SpinerLoader from "../../SpinerLoader";
// import PropTypes from 'prop-types'

const ProductCard = () => {
    const { prodId } = useParams();
    const product = useSelector(getProductById(prodId));
    console.log("product", product);
    if (product) {
        return (
            <div className="container">
                <div className="card mb-3 max-width: 540px">
                    <div className="row g-0">
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
                                <div className="p-2 mt-4">
                                    <p className="small mb-0">
                                        Количество: {`1`}
                                    </p>
                                    <p className="small mb-0">
                                        {`Цена: ${product.price}`}
                                    </p>
                                </div>
                                <div className="d-flex flex-row-reverse">
                                    <button className="btn btn-primary ">
                                        Купить
                                    </button>
                                </div>
                                <p className="card-text">
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
