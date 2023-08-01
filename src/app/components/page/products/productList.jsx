import React from "react";
import PropTypes from "prop-types";
import Product from "./product";
import SpinerLoader from "../../SpinerLoader";
import SortBy from "../../ui/SortBy";
// import BreadCrumb from "./BreadCrumb";

const ProductList = ({ data, handleClic, setCateg }) => {
    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 border border-2 rounded">
            <div className="align-items-center pt-3 pb-2 mb-3">
                <div className="table-responsive">
                    <SortBy arr={data} label="Menu" />
                    {/* <BreadCrumb /> */}

                    {data ? (
                        data.map((p) => (
                            <Product key={p.id} data={p} onClick={handleClic} />
                        ))
                    ) : (
                        <SpinerLoader />
                    )}

                    <small className="d-block text-end mt-3">
                        <a onClick={() => setCateg()}>Все предложения</a>
                    </small>
                </div>
            </div>
        </main>
    );
};
ProductList.propTypes = {
    data: PropTypes.array,
    handleClic: PropTypes.func,
    setCateg: PropTypes.func
};
export default ProductList;
