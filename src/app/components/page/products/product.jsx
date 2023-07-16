import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCategoryById } from "../../../store/categories";

const Product = ({ data, onClick }) => {
    const categori = useSelector(getCategoryById(data.categories));

    return (
        data && (
            <div className="d-flex text-muted pt-3">
                <img
                    src={data.image}
                    width="100"
                    height="100"
                    className="rounded float-start bd-placeholder-img flex-shrink-0 me-2 rounded"
                    alt="..."
                ></img>

                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div className="d-flex justify-content-between">
                        <strong className="text-white">{data.name}</strong>
                    </div>
                    {/* <span className="d-block">{`Описание ${data.description}`}</span> */}
                    <span className="d-block">{`Количество: ${data.quantity}`}</span>
                    <span className="d-block">{`Категория: ${
                        categori && categori.name
                    }`}</span>
                    <span className="d-block">{`Цена: ${data.price}`}</span>
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-primary"
                            onClick={() => onClick(data)}
                        >
                            Pay
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};
Product.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func
};
export default Product;
