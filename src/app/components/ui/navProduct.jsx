import React from "react";
import PropTypes from "prop-types";

const NavProduct = ({ items, onItemSelect, selectedItem, onClick }) => {
    return (
        <div>
            <div className="nav-scroller bg-body shadow-sm rounded">
                <nav
                    className="nav nav-underline"
                    aria-label="Secondary navigation"
                >
                    {items.map((i) => (
                        <a
                            className="nav-link active"
                            type="button"
                            key={i.id}
                            aria-current="page"
                            onClick={() => onItemSelect(i)}
                        >
                            {i.name}
                        </a>
                    ))}
                    <a className="nav-link text-end" onClick={onClick}>
                        Очистить
                    </a>

                    {/* <a className="nav-link" href="#">
                        Друзья
                        <span className="badge bg-light text-dark rounded-pill align-text-bottom">
                            27
                        </span>
                    </a> */}
                    {/* <ul className="list-group">
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
                    </ul> */}
                </nav>
            </div>
        </div>
    );
};
NavProduct.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func,
    onClick: PropTypes.func,
    selectedItem: PropTypes.object
};
export default NavProduct;
