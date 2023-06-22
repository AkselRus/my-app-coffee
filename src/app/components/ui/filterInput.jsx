import React, { useState } from "react";

const FilterInput = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                name="searchQuery"
                placeholder="Search..."
                onChange={handleSearchQuery}
                value={searchQuery}
                className="form-control"
                aria-describedby="basic-addon1"
            />
        </div>
    );
};

export default FilterInput;
