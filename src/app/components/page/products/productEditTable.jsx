import React from "react";
import AddProduct from "../../ui/Admin/addProduct";
import { useParams } from "react-router-dom";
// import PropTypes from "prop-types";

const ProductEditTable = () => {
    const { prodId } = useParams();
    return (
        <div>
            <h1>{prodId}</h1>
            <AddProduct />
        </div>
    );
};

// ProductEditTable.propTypes = {
//     users: PropTypes.array.isRequired,
//     onSort: PropTypes.func.isRequired,
//     selectedSort: PropTypes.object.isRequired,
//     onToggleBookMark: PropTypes.func.isRequired
// };

export default ProductEditTable;
