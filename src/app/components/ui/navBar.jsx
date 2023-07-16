import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand">Верхняя панель навигации</a>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarCollapse"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link "
                                    aria-current="page"
                                    to="/"
                                >
                                    Main
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link disabled">Отключенная</a>
                            </li> */}
                        </ul>
                        <form className="d-flex">
                            <ul>
                                <li>
                                    <Link
                                        className="nav-link "
                                        aria-current="page"
                                        to="/cart"
                                    >
                                        <i className="bi bi-cart"></i>
                                    </Link>
                                </li>
                            </ul>
                            {isLoggedIn ? (
                                <NavProfile />
                            ) : (
                                <Link
                                    className="nav-link "
                                    aria-current="page"
                                    to="/login"
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
