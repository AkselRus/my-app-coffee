import React from "react";
import PropTypes from "prop-types";
import Table from "../page/table";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import Category from "./category";
// import { Link } from "react-router-dom";

const ProductTable = ({ products, onSort, selectedSort }) => {
    const columns = {
        id: {
            name: "id",
            component: (prod) => (
                <Popup
                    trigger={
                        <button className="btn btn-secondary">
                            {products.indexOf(prod) + 1}
                        </button>
                    }
                    position="right center"
                >
                    <div>{prod.id}</div>
                </Popup>
            )
        },
        name: {
            path: "name",
            name: "Имя"
            // component: (user) => (
            //     <Link to={`/users/${user._id}`}>{user.name}</Link>
            // )
        },
        categories: {
            name: "Категория",
            component: (products) => <Category id={products.categories} />
        },
        price: { path: "price", name: "Цена" },
        quantity: { path: "quantity", name: "Кол-во" },
        image: {
            path: "image",
            name: "Фото",
            component: (products) => (
                <button
                    onClick={() => console.log(products.id)}
                    className="btn btn-secondary"
                >
                    <i className="bi bi-camera"></i>
                </button>
            )
        },
        action: {
            name: "Действие",
            component: (products) => (
                <button
                    onClick={() => console.log(products._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={products}
        />
    );
};

ProductTable.propTypes = {
    products: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default ProductTable;
