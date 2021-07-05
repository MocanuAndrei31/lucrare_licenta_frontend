import React, { useState } from "react";
import "./Modal.scss";

// COMPONENTS
import Stripe from "../stripe/Stripe";

const Modal = ({ buttonName, price, cartItems, discount }) => {
  const [modal, setModal] = useState(false);

  const closeModal = (e) => {
    var modal = document.getElementById("myModal");
    if (e.target === modal) {
      setModal(!modal);
    }
  };

  return (
    <div className="modal-stripe-container">
      <button
        className="modal-stripe-btn"
        id="myBtn"
        onClick={() => setModal(!modal)}
      >
        {buttonName}
      </button>

      {modal && (
        <div id="myModal" className="modal-stripe" onClick={closeModal}>
          <div className="modal-stripe-content">
            <div className="modal-stripe-header">
              <span className="close" onClick={() => setModal(!modal)}>
                &times;
              </span>
              <h3>
                Payment with <span>Stripe</span>
              </h3>
            </div>

            <div className="modal-stripe-body">
              <Stripe price={price} cartItems={cartItems} discount={discount} />
            </div>

            <div className="modal-stripe-footer"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
