import React from "react";

const Carusel = () => {
    return (
        <div
            id="introCarousel"
            className="carousel slide carousel-fade shadow-2-strong"
            data-mdb-ride="carousel"
        >
            {/* <!-- Indicators --> */}
            <ol className="carousel-indicators">
                <li
                    data-mdb-target="#introCarousel"
                    data-mdb-slide-to="0"
                    className="active"
                ></li>
                <li data-mdb-target="#introCarousel" data-mdb-slide-to="1"></li>
                <li data-mdb-target="#introCarousel" data-mdb-slide-to="2"></li>
            </ol>
            <div className="carousel-item active">
                <div
                    className="mask"
                    style="background-color: rgba(0, 0, 0, 0.6);"
                >
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white text-center">
                            <h1 className="mb-3">Learn Bootstrap 5 with MDB</h1>
                            <h5 className="mb-4">
                                Best & free guide of responsive web design
                            </h5>
                            <a
                                className="btn btn-outline-light btn-lg m-2"
                                href="https://www.youtube.com/watch?v=c9B4TPnak1A"
                                role="button"
                                rel="nofollow noreferrer"
                                target="_blank"
                            >
                                Start tutorial
                            </a>
                            <a
                                className="btn btn-outline-light btn-lg m-2"
                                href="https://mdbootstrap.com/docs/standard/"
                                target="_blank"
                                role="button"
                                rel="noreferrer"
                            >
                                Download MDB UI KIT
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carusel;
