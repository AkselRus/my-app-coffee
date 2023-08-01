import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCategories } from "../../../store/categories";
import NavProduct from "../Navigation/navProduct";

const MainCategory = ({
    onClick,
    handleCategorySelect,
    selectedCateg,
    label
}) => {
    const categories = useSelector(getCategories());

    return (
        categories && (
            <nav
                id="sidebarMenu"
                className="col-md-3 col-lg-2 d-md-block bg-light sidebar border border-2 rounded collapse"
            >
                <div className="mb-2 m-3">
                    <span>{label}</span>
                </div>
                {categories && (
                    <NavProduct
                        items={categories}
                        onItemSelect={handleCategorySelect}
                        selectedItem={selectedCateg}
                        onClick={onClick}
                    />
                )}
            </nav>
        )
    );
};
MainCategory.propTypes = {
    onClick: PropTypes.func,
    selectedCateg: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleCategorySelect: PropTypes.func,
    label: PropTypes.string
};
export default MainCategory;
