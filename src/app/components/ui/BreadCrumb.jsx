import React from "react";

const BreadCrumb = () => {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#">Главная</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="#">Библиотека</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Данные
                    </li>
                </ol>
            </nav>
        </div>
    );
};

export default BreadCrumb;
