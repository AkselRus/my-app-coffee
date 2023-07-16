import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/users";

const UserPage = ({ userId }) => {
    console.log(userId);
    const user = useSelector(getUser());

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                    </div>
                    <div className="col-md-8">
                        <div className="mt-3">
                            <h4>{user.name}</h4>
                            <h6>{`Дата рождения: ${user.birthDay}`}</h6>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
