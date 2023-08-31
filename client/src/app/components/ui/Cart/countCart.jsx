import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../../store/users";

const CountCart = ({ data }) => {
    const user = useSelector(getUser());
    const dispatch = useDispatch();
    const [count, setCount] = useState(data.count);
    const span = useRef();

    const maxGuests = 10;
    const minGuests = 1;

    useEffect(() => {
        const newData = { ...data, count: count };
        const newUser = {
            ...user,
            purchases: user.purchases.map((el) =>
                el._id === newData._id ? newData : el
            )
        };
        dispatch(updateUser(newUser));
    }, [count]);

    const decrementCount = () => {
        if (count > minGuests) setCount(count - 1);
    };

    const incrementCount = () => {
        if (count < maxGuests) setCount(count + 1);
        else if (count > maxGuests) setCount(maxGuests);
    };

    return (
        <form>
            <div className="d-flex flex-row align-items-center">
                <div>Количиство: </div>
                <input
                    type="button"
                    onClick={() => decrementCount()}
                    value="-"
                    className="cursor-pointer btn btn-secondary btn-sm"
                />
                <div className="">
                    <span id="hide" ref={span}>
                        {count}
                    </span>
                </div>
                <input
                    type="button"
                    onClick={() => incrementCount()}
                    value="+"
                    className="cursor-pointer btn btn-secondary btn-sm"
                />
            </div>
        </form>
    );
};

CountCart.propTypes = {
    data: PropTypes.object
};
export default CountCart;
