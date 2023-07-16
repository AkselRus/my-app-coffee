import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import Login from "./login";
const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} /> : <Login />}</>;
};

export default Users;
