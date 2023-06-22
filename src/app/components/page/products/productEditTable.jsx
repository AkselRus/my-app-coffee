import React from "react";
import PropTypes from "prop-types";
import Table from "../common/table";
import { Link } from "react-router-dom";
import AddProduct from "../../../layouts/addProduct";

const ProductEditTable = ({ users, onSort, selectedSort }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        }
        // qualities: {
        //     name: "Качества",
        //     component: (user) => <Qualities qualities={user.qualities} />
        // },
        // professions: {
        //     name: "Профессия",
        //     component: (user) => <Profession id={user.profession} />
        // },
        // completedMeetings: {
        //     path: "completedMeetings",
        //     name: "Встретился, раз"
        // },
        // rate: { path: "rate", name: "Оценка" },
        // bookmark: {
        //     path: "bookmark",
        //     name: "Избранное",
        //     component: (user) => (
        //         <BookMark
        //             status={user.bookmark}
        //             onClick={() => onToggleBookMark(user._id)}
        //         />
        //     )
        // }
        // delete: {
        //     component: (user) => (
        //         <button
        //             onClick={() => onDelete(user._id)}
        //             className="btn btn-danger"
        //         >
        //             delete
        //         </button>
        //     )
        // }
    };
    return (
        <div>
            <AddProduct />
            <Table
                onSort={onSort}
                selectedSort={selectedSort}
                columns={columns}
                data={users}
            />
        </div>
    );
};

ProductEditTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default ProductEditTable;
