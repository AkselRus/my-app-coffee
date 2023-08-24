import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/users";

const UserCard = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(getUser());
    const handleClick = () => {
        navigate(`/user/${currentUser._id}/edit`);
    };
    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser && (
                    <a
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleClick}
                    >
                        <i className="bi bi-gear"></i>
                    </a>
                )}

                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={currentUser.image}
                        className="rounded-circle"
                        width="250"
                    />
                </div>
            </div>
        </div>
    );
};

export default UserCard;
