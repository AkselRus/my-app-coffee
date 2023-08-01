import React from "react";
import PropTypes from "prop-types";

const NavProduct = ({ items, onItemSelect, selectedItem, onClick }) => {
    return (
        <div className="position-sticky pt-3">
            <ul className="list-group">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={
                            "list-group-item" +
                            (item === selectedItem ? " active" : "")
                        }
                        onClick={() => onItemSelect(item)}
                        role="button"
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
NavProduct.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func,
    onClick: PropTypes.func,
    selectedItem: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export default NavProduct;
