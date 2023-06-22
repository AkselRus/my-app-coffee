import React from "react";
import { useAuth } from "../../../hooks/useAuth";

const UserImage = () => {
    const { currentUser } = useAuth();
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
