import React, { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { getCategoryById } from "../../../store/categories";
import { updateProduct } from "../../../store/products";

const Product = ({ data, onClick }) => {
    const dispatch = useDispatch();
    const [bookmark, setBookmark] = useState(data.bookmark);
    const categori = useSelector(getCategoryById(data?.categories));
    const toogleBookmark = () => {
        setBookmark((prev) => !prev);
        const newObject = { ...data, bookmark: !data.bookmark };
        dispatch(updateProduct(newObject));
        console.log("data ", data);
    };

    if (categori && data) {
        return (
            <>
                <div className=" col-md-4 p-2">
                    <div
                        className="card m-2 h-100 shadow bg-body-tertiary "
                        style={{ minWidth: "100%" }}
                    >
                        <button
                            className="position-absolute top-0 end-0 btn btn-light btn-sm"
                            onClick={toogleBookmark}
                        >
                            <i
                                className={
                                    "bi bi-heart" + (bookmark ? "-fill" : " ")
                                }
                            ></i>
                        </button>
                        <img
                            src={data.image}
                            className="card-img-top"
                            height="250px"
                            // style={{ height: "100", with: "100" }}
                            alt="icon"
                        />

                        <div className="card-body p-2 m-2">
                            <h5 className="">
                                <a
                                    className="nav-link text-dark p-0"
                                    href={`/product/${data.id}`}
                                >
                                    {data.name}
                                </a>
                            </h5>

                            <div className="d-flex align-items-end">
                                <h5>{`${Number(data.price).toFixed(2)} ₽`}</h5>
                                <a
                                    onClick={() => onClick(data)}
                                    className="btn btn-outline-success ms-auto"
                                >
                                    <i className="bi bi-cart"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};
Product.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func
};
export default Product;

// import React from "react";
// import PropTypes from "prop-types";
// import { Col, Card, Button } from "react-bootstrap";

// const Product = ({ data, onClick }) => {
//     return (
//         <div className="col-md-4">
//             <Col sm={3}>
//                 <Card style={{ width: "18rem" }}>
//                     <Card.Img variant="top" src={data.image} />
//                     <Card.Body>
//                         <Card.Title>Card Title</Card.Title>
//                         <div className="d-flex align-items-end">
//                             <Card.Text>Card Text</Card.Text>
//                             <Button
//                                 variant="secondary"
//                                 onClick={() => onClick(data)}
//                             >
//                                 <i className="bi bi-cart"></i>
//                             </Button>
//                         </div>
//                     </Card.Body>
//                 </Card>
//             </Col>
//         </div>
//     );
// };
// Product.propTypes = {
//     data: PropTypes.object,
//     onClick: PropTypes.func
// };
// export default Product;
