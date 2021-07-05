import React from "react";
import "./SuccessPage.scss";

// ASSETS
import delivery from "../../assets/delivery.png";

const SuccessPage = () => {
  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-title">
          <h2>Order received</h2>
          <h4>Payment complete with success!</h4>
        </div>

        <ul>
          <li>Cart</li>
          <li className="lines"></li>
          <li>Payment</li>
          <li className="lines"></li>
          <li>
            {" "}
            <img src={delivery} alt=""></img>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SuccessPage;
