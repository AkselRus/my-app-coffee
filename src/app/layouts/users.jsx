import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserProvider from "../hooks/useUsers";
import Login from "./login";
const Users = () => {
    const params = useParams();
    const { userId } = params;
    console.log(userId);
    return (
        <>
            <UserProvider>
                {userId ? <UserPage userId={userId} /> : <Login />}
            </UserProvider>
        </>
    );
};

export default Users;
