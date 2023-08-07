import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getUser, logOut } from "../../../store/users";
import { getShopListLength } from "../../../store/cart";
import { Offcanvas } from "bootstrap";

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser());
    console.log(user);
    const isLoggedIn = useSelector(getIsLoggedIn());
    console.log("isLoggedIn", isLoggedIn);
    const shopListLength = useSelector(getShopListLength());
    const handleLoguot = () => dispatch(logOut());

    const offcanvasElementList = Array.prototype.slice.call(
        document.querySelectorAll(".offcanvas")
    );
    const offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
        return new Offcanvas(offcanvasEl);
    });
    console.log("offcanvasList", offcanvasList);

    return (
        <>
            {/* <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
            >
                {user && (
                    <>
                        <div className="offcanvas-header">
                            <h5 id="offcanvasRightLabel">{user.name}</h5>
                            <button
                                type="button"
                                className="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                data-bs-theme="secondary"
                                aria-label="Закрыть"
                            ></button>
                        </div>
                        <div className="offcanvas-body"></div>
                    </>
                )}
            </div>
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="bg-dark p-4">
                    <a className="navbar-brand" href="#">
                        <img
                            src="/docs/5.1/assets/brand/bootstrap-logo.svg"
                            alt=""
                            width="30"
                            height="24"
                        />
                    </a>
                    <h5 className="text-white h4">Свернутый контент</h5>
                    <span className="text-muted">
                        Переключаемый через бренд навигационной панели.
                    </span>
                </div>
            </div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="row">
                    <div className="container-fluid">
                        <button
                            className="navbar-toggler m-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                            aria-expanded="false"
                            aria-label="Переключатель навигации"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <a className="navbar-brand m-2 p-2" href="/">
                            Главная страница
                        </a>
                    </div>
                </div>
            </nav> */}
            <header
                className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow"
                data-bs-theme="dark"
            >
                <a
                    className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"
                    href="/"
                >
                    <span className="fs-3">Главная страница</span>
                </a>

                <div className="col">
                    <form className="d-flex flex-row float-end">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    className="p-2 rounded-circle"
                                    type="button"
                                    to="/admin"
                                >
                                    <h1>
                                        <i className="bi bi-gear"></i>
                                    </h1>
                                </Link>
                                <Link
                                    className="nav-link p-2 position-relative"
                                    type="button"
                                    aria-current="page"
                                    to="/cart"
                                >
                                    <h1>
                                        <i className="bi bi-cart"></i>{" "}
                                        {shopListLength > 0 && (
                                            <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger fs-5">
                                                {shopListLength}
                                            </span>
                                        )}
                                    </h1>
                                </Link>
                                <Link
                                    className="p-2 rounded-circle"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight"
                                    aria-controls="offcanvasRight"
                                >
                                    <h1>
                                        <i className="bi bi-person"></i>
                                    </h1>
                                </Link>

                                <div></div>
                                <br />

                                <Link
                                    className="nav-link p-2 m-1"
                                    type="button"
                                    onClick={handleLoguot}
                                    aria-current="page"
                                >
                                    <h1>
                                        <i className="bi bi-box-arrow-right"></i>
                                    </h1>
                                </Link>
                            </>
                        ) : (
                            // <NavProfile />
                            <Link
                                className="nav-link "
                                aria-current="page"
                                to="/auth/login"
                            >
                                <h1>
                                    <i className="bi bi-person"></i>
                                </h1>
                            </Link>
                        )}
                    </form>
                </div>
            </header>
        </>
    );
};

export default NavBar;
