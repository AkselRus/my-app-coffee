import React from "react";
import history from "../../../utils/hystory";

const FinishPay = () => {
    function sayHi() {
        history.push("/");
    }

    setTimeout(sayHi, 3000);
    return (
        <div>
            <h1>Спасибо за покупки!</h1>
        </div>
    );
};

export default FinishPay;
