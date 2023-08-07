import React from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { getCategoryById } from "../../../store/categories";

const Product = ({ data, onClick }) => {
    const categori = useSelector(getCategoryById(data?.categories));
    if (categori) {
        return (
            <>
                <div className="col-md-4 p-2">
                    <div className="card m-2">
                        <img
                            src={data.image}
                            className="card-img-top"
                            alt="..."
                        />
                        <div className="card-body">
                            <h5 className="card-title">
                                Special title treatment
                            </h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in
                                to additional content.
                            </p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
                            </a>
                        </div>
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
