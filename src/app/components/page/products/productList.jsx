import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Product from "./product";
import SpinerLoader from "../../SpinerLoader";
import SortBy from "../../ui/SortBy";
import Pagination from "../../ui/pagination";
import { paginate } from "../../../utils/paginate";

const ProductList = ({ data, handleClic, setCateg, count }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState(data);

    useEffect(() => {
        setCurrentPage(1);
        setSort(data);
    }, [data]);

    const handleSort = (params) => {
        if (params === "max") {
            const sortData = sort.toSorted(
                (a, b) => parseFloat(b.price) - parseFloat(a.price)
            );
            setSort(sortData);
        }
        if (params === "min") {
            const sortData = sort.toSorted(
                (a, b) => parseFloat(a.price) - parseFloat(b.price)
            );
            setSort(sortData);
        } else setSort(data);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const pageSize = 4;
    const productsCrop = paginate(sort, currentPage, pageSize);
    // while (productsCrop.length) {
    //     const chunk = productsCrop.splice(0, 3);
    //     console.log(chunk);
    // }

    return (
        <main className="col-md-8 ms-sm-auto col-lg-10 px-md-4 ">
            <div className="align-items-center pt-3 pb-2 mb-3">
                <div className="table-responsive">
                    <SortBy arr={data} onSort={handleSort} label="Menu" />

                    {data ? (
                        <div className="row w-100">
                            {productsCrop?.map((p) => (
                                <Product
                                    key={p.id}
                                    data={p}
                                    onClick={handleClic}
                                />
                            ))}
                        </div>
                    ) : (
                        <SpinerLoader />
                    )}
                    <Pagination
                        itemsCount={count || 1}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
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
    setCateg: PropTypes.func,
    count: PropTypes.number
};
export default ProductList;
