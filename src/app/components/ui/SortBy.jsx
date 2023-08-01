import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SortBy = ({ label }) => {
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <div className="mb-1">{label}</div>
            </div>
            <div>
                <div className="dropdown" onClick={toggleMenu}>
                    <div className="btn btn-secondary btn-sm dropdown-toggle d-flex align-items-center">
                        Сортировка по стоимости
                    </div>
                    <div
                        className={
                            "w-100 dropdown-menu" + (isOpen ? " show" : "")
                        }
                    >
                        <Link className="dropdown-item">Сначало недорогие</Link>
                        <Link className="dropdown-item">Сначало дорогие</Link>
                        <Link className="dropdown-item">По популярности</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

SortBy.propTypes = {
    label: PropTypes.string
};

export default SortBy;
