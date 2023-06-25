import React from "react";
import PropTypes from "prop-types";

const NavProduct = ({ items, onItemSelect, selectedItem }) => {
    return (
        <div>
            <div className="card">
                {/* <div className="card-header">Категории</div> */}
                <ul className="list-group list-group-flush">
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
        </div>
    );
};
NavProduct.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};
export default NavProduct;
