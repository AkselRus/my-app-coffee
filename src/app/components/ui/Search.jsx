import React from "react";

const Search = () => {
    return (
        <div className="d-flex align-items-center p-3 my-3 text-white bg-dark rounded shadow-sm">
            <input
                className="form-control form-control-dark bg-dark text-white border-0"
                type="text"
                placeholder="Поиск"
                aria-label="Поиск"
            />
        </div>
    );
};

export default Search;
