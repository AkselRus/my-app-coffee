import React from "react";
import PropTypes from "prop-types";

const NavProduct = ({ items, onItemSelect, selectedItem, onClick }) => {
    return (
        <div className="position-sticky pt-2">
            <ul className="nav flex-column mb-auto">
                {items.map((item) => (
                    <li key={item.id} className="nav-item">
                        <a
                            className={
                                "nav-link d-flex align-items-center gap-2 border border-primary rounded mt-2" +
                                (item === selectedItem ? " active" : "")
                            }
                            aria-current="page"
                            onClick={() => onItemSelect(item)}
                            role="button"
                        >
                            {item.name}
                        </a>
                    </li>
                ))}
                <button
                    className="btn btn-outline-primary m-2 mx-auto"
                    onClick={() => onClick()}
                >
                    Сбросить
                </button>
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
