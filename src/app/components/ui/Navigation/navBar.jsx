import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../../store/users";
import NavProfile from "./navProfile";
import { getShopListLength } from "../../../store/cart";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    console.log("isLoggedIn", isLoggedIn);
    const shopListLength = useSelector(getShopListLength());
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-secondary mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand">Верхняя панель навигации</a>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarCollapse"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    aria-current="page"
                                    to="/"
                                >
                                    Main
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <div>
                                <Link
                                    type="button"
                                    to="/cart"
                                    className="btn btn-primary position-relative"
                                >
                                    <i className="bi bi-cart"></i>
                                    {shopListLength > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {shopListLength}
                                        </span>
                                    )}
                                </Link>
                            </div>
                            <br />
                            {isLoggedIn ? (
                                <NavProfile />
                            ) : (
                                <Link
                                    className="nav-link "
                                    aria-current="page"
                                    to="/auth/login"
                                >
                                    Login
                                </Link>
                            )}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
