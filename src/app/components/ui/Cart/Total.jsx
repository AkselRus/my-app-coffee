import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearShopingCart, getShopList } from "../../../store/cart";

const Total = () => {
    const dispatch = useDispatch();
    const shopList = useSelector(getShopList());

    const [sum, setSum] = useState(0);
    const newList = shopList.map((el) => el.count * Number(el.price));

    const handleChange = () => {
        dispatch(clearShopingCart());
    };

    useEffect(() => {
        const sum = newList.reduce(add, 0);
        function add(accumulator, a) {
            return accumulator + a;
        }
        setSum(sum);
    }, [shopList]);

    return (
        shopList && (
            <>
                <div className="d-flex justify-content-between">
                    <p className="mb-2">Subtotal</p>
                    <p className="mb-2">{`${sum.toFixed(2)} ₽`}</p>
                </div>

                {/* <div className="d-flex justify-content-between">
                <p className="mb-2">Shipping</p>
                <p className="mb-2">$20.00</p>
            </div>

            <div className="d-flex justify-content-between mb-4">
                <p className="mb-2">Total(Incl. taxes)</p>
                <p className="mb-2">$4818.00</p>
            </div> */}

                <button
                    type="button"
                    className="btn btn-info btn-block btn-lg"
                    onClick={handleChange}
                >
                    <div className="d-flex justify-content-between">
                        <span>{`${sum.toFixed(2)}₽ `}</span>
                        <span>
                            Checkout
                            {/* <i className="fas fa-long-arrow-alt-right ms-2"></i> */}
                        </span>
                    </div>
                </button>
            </>
        )
    );
};

export default Total;
