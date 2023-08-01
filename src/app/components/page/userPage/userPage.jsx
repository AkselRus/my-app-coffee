import React from "react";
import UserCard from "./userCard";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/users";
import SpinerLoader from "../../SpinerLoader";

const UserPage = () => {
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
        return <SpinerLoader />;
    }
};

export default UserPage;
