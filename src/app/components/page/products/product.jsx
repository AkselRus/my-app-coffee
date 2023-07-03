import React from "react";
import PropTypes from "prop-types";
import { useCategories } from "../../../hooks/useCategories";

const Product = ({ data }) => {
    const { getCategories } = useCategories();
    const categori = getCategories(data.categories);

    return (
        data && (
            <div className="d-flex text-muted pt-3">
                <svg
                    className="bd-placeholder-img flex-shrink-0 me-2 rounded"
                    width="32"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: 32x32"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#007bff" />
                    <text x="50%" y="50%" fill="#007bff" dy=".3em">
                        32x32
                    </text>
                </svg>

                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div className="d-flex justify-content-between">
                        <strong className="text-gray-dark">{data.name}</strong>
                        <button className="btn btn-primary">Pay</button>
                    </div>
                    <span className="d-block">{`Описание ${data.description}`}</span>
                    <span className="d-block">{`Количество: ${data.quantity}`}</span>
                    <span className="d-block">{`Категория: ${
                        categori && categori.name
                    }`}</span>
                    <span className="d-block">{`Цена: ${data.price}`}</span>
                </div>
            </div>
        )
    );
};
Product.propTypes = {
    data: PropTypes.object
};
export default Product;
