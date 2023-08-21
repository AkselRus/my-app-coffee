import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn, getUser, logOut } from "../../../store/users";
import { Offcanvas } from "bootstrap";
import { getShopList } from "../../../store/cart";
import { getListBookMark } from "../../../store/products";

const navBar = () => {
    const dispatch = useDispatch();
    const handleLoguot = () => dispatch(logOut());
    const user = useSelector(getUser());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const shopList = useSelector(getShopList());
    console.log("isLoggedIn", isLoggedIn);

    const listBookmark = useSelector(getListBookMark());
    console.log("listBookmark", listBookmark);

    const offcanvasElementList = Array.prototype.slice.call(
        document.querySelectorAll(".offcanvas")
    );
    offcanvasElementList.map(function (offcanvasEl) {
        return new Offcanvas(offcanvasEl);
    });

    const countShopList = shopList?.length;

    return (
        <>
            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
            >
                {
                    <>
                        <div className="offcanvas-header">
                            <h5 id="offcanvasRightLabel">{user?.name}</h5>
                            <button
                                type="button"
                                className="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                data-bs-theme="secondary"
                                aria-label="Закрыть"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            List BookMark
                            {listBookmark && (
                                <ul>
                                    {listBookmark.map((el) => (
                                        <li
                                            key={el._id}
                                            className="list-group-item"
                                        >
                                            {el.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                }
            </div>

            <Navbar
                collapseOnSelect
                expand="lg"
                bg="dark"
                variant="dark"
                sticky="top"
            >
                <Container>
                    <Navbar.Brand>Logo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/" className="nav-link text-white">
                                Home
                            </Link>
                        </Nav>
                        <Nav>
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        className="me-2"
                                        type="button"
                                        to="/admin"
                                    >
                                        <h3>
                                            <i className="bi bi-gear"></i>
                                        </h3>
                                    </Link>
                                    <Link
                                        className="position-relative me-2"
                                        to="/cart"
                                    >
                                        <h3>
                                            <i className="bi bi-cart"></i>
                                            {countShopList > 0 && (
                                                <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger fs-6">
                                                    {countShopList}
                                                </span>
                                            )}
                                        </h3>
                                    </Link>
                                    <Link
                                        className="me-2"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRight"
                                        aria-controls="offcanvasRight"
                                    >
                                        <h3>
                                            <i className="bi bi-heart"></i>
                                        </h3>
                                    </Link>
                                    <Link
                                        className="me-2"
                                        onClick={handleLoguot}
                                    >
                                        <h3>
                                            <i className="bi bi-box-arrow-right"></i>
                                        </h3>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/auth/login">
                                    <h3>
                                        <i className="bi bi-person"></i>
                                    </h3>
                                </Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default navBar;
