import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../../store/users";

const UserImage = () => {
    const currentUser = useSelector(getCurrentUserData());
    return (
        <div>
            <img
                src={currentUser.image}
                className="rounded float-start"
                alt={currentUser.name}
                height="300"
            />
        </div>
    );
};

export default UserImage;
