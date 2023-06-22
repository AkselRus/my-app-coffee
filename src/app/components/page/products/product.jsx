import React from "react";
import PropTypes from "prop-types";

const Product = ({ data }) => {
    console.log(data);
    return (
        <div className="card w-75 mb-3">
            <figure className="figure">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={data.image}
                            className="img-fluid rounded-start"
                            width="200"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{data.name}</h5>
                            <p className="card-text">{data.description}</p>
                            <p className="card-text">{`Количество: ${data.quantity}`}</p>
                            <p className="card-text">{`Цена: ${data.price}`}</p>

                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                >
                                    Button
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <figcaption className="figure-caption text-end">
                    {`ID: ${data.id}`}
                </figcaption>
            </figure>
        </div>
    );
};
Product.propTypes = {
    data: PropTypes.object
};
export default Product;
