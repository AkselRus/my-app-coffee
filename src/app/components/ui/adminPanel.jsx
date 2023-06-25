import React, { useState } from "react";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import { useProducts } from "../../hooks/useProducts";
import Paginate from "./pagination";
import AddProduct from "./addProduct";
import ProductTable from "./productTable";

const AdminPanel = () => {
    const { products } = useProducts();
    console.log(products);
    const [searchProd, setSearchProd] = useState("");
    const [selectedCategory, setSelectedCategory] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearchProd = ({ target }) => {
        setSelectedCategory(undefined);
        setSearchProd(target.value);
    };
    if (products) {
        const filteredProducts = searchProd
            ? products.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchProd.toLowerCase()) !== -1
              )
            : selectedCategory
            ? products.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedCategory)
              )
            : products;
        const sortedProd = _.orderBy(
            filteredProducts,
            [sortBy.path],
            [sortBy.order]
        );
        const productCrop = paginate(sortedProd, currentPage, pageSize);

        // const clearFilter = () => {
        //     setSelectedCategory();
        // };
        const count = filteredProducts.length;
        return (
            <div className="d-flex">
                <div className="d-flex flex-column flex-shrink-0 p-2">
                    <AddProduct />
                </div>
                <div className="d-flex flex-column">
                    <input
                        type="text"
                        name="searchProd"
                        placeholder="Search..."
                        className="form-control"
                        onChange={handleSearchProd}
                        value={searchProd}
                    />
                    <ProductTable
                        products={productCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />
                    {/* <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        /> */}
                    <div className="d-flex justify-content-center">
                        <Paginate
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

export default AdminPanel;
