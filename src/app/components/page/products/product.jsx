import React from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { getCategoryById } from "../../../store/categories";

const Product = ({ data, onClick }) => {
    const categori = useSelector(getCategoryById(data?.categories));
    if (categori && data) {
        return (
            <>
                <div className=" col-md-4 p-2">
                    <div className="card m-2 h-100 shadow bg-body-tertiary ">
                        <img
                            src={data.image}
                            className="card-img-top"
                            width="350"
                            height="350"
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
                        <p className="card-text text-end mx-2">
                            <small className="text-muted">
                                {`id: ${data.id}`}
                            </small>
                        </p>
                    </div>
                </div>
            </>
        );
    }

    // {/* return (
    //     <div className="card mb-3 ">
    //         <div className="card-body position-relative">
    //             <div className="d-flex text-muted pt-3">
    //                 <img
    //                     src={data?.image}
    //                     width="100"
    //                     height="100"
    //                     className="rounded float-start bd-placeholder-img flex-shrink-0 me-2 rounded"
    //                     alt="..."
    //                 ></img>

    //                 <div className="pb-3 mb-0 small lh-sm w-100">
    //                     <div className="d-flex justify-content-between">
    //                         <strong>{data?.name}</strong>
    //                     </div>
    //                     {/* <span className="d-block">{`Описание ${data.description}`}</span> */}
    //                     <span className="d-block">{`Количество: ${data?.quantity}`}</span>
    //                     <span className="d-block">{`Категория: ${
    //                         categori && categori?.name
    //                     }`}</span>
    //                     <span className="d-block">{`Цена: ${data?.price}`}</span>
    //                     <div className="d-flex justify-content-end">
    //                         <a
    //                             type="button"
    //                             className="btn btn-primary"
    //                             href={`/product/${data?.id}`}
    //                         >
    //                             Открыть карточку
    //                         </a>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // ); */}
};
Product.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func
};
export default Product;
