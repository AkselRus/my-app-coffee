import React from "react";
import PropTypes from "prop-types";

const NavProduct = ({ items, onItemSelect, selectedItem, onClick }) => {
    function MouseOver(event) {
        event.target.style.background = "red";
    }
    function MouseOut(event) {
        event.target.style.background = "";
    }
    return (
        <div className="list-group list-group-flush border-bottom scrollarea">
            {items.map((item) => (
                <a
                    className={
                        "list-group-item list-group-item-action lh-tight border-bottom" +
                        (item === selectedItem ? " active" : "")
                    }
                    key={item.id}
                    aria-current="page"
                    onMouseOver={MouseOver}
                    onMouseOut={MouseOut}
                    onClick={() => onItemSelect(item)}
                    role="button"
                >
                    {item.name}
                </a>
            ))}
            <a className="nav-link m-2 mx-auto" onClick={() => onClick()}>
                Сбросить
            </a>
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
