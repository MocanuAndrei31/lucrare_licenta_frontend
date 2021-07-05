import React, { useEffect, useState } from "react";
import "./CartSummary.scss";

//MIDDLEWARE
import CheckDiscount from "./middlewares/checkDiscount";

// UTILS
import { calcSum, calcDiscountSum } from "./middlewares/utils.js";

// REDUX
import { useSelector } from "react-redux";

const CartSummary = () => {
  const isAuthentificated = useSelector(({ auth }) => auth.isAuthentificated);
  const discount = useSelector((state) => state.products.discountDetails);
  // console.log("FRONT VOUCHER", discount)
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (discount === null) {
      //console.log(true)
      setErr(true);
    }
    setTimeout(() => {
      setErr(false);
    }, 2000);
  }, [discount]);

  //console.log(typeof discount)

  const cart = useSelector((state) => state.products.cartItems);
  let cartItems;
  JSON.parse(localStorage.getItem("cartItems"))
    ? (cartItems = JSON.parse(localStorage.getItem("cartItems")))
    : (cartItems = cart);

  const total = useSelector((state) => state.products.itemsPrice);
  let totalPrice;
  JSON.parse(localStorage.getItem("cartPrice"))
    ? (totalPrice = JSON.parse(localStorage.getItem("cartPrice")))
    : (totalPrice = total);

  let sum = 0;
  if (cartItems !== undefined) {
    if (cartItems !== null) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].discount * 1 === 0) {
          sum = sum + cartItems[i].price * cartItems[i].count;
        } else {
          sum = sum + cartItems[i].discount * cartItems[i].count;
        }
      }
    }
  }

  return (
    <div id="toPay" className="cart-summary-container">
      <div className="cart-summary">
        <h4>Cart:</h4>
        <hr></hr>
        {cartItems !== undefined
          ? cartItems.map((item, i) => (
              <div key={i}>
                <h5>
                  {item.count} X {item.name}
                </h5>
                {item.discount * 1 === 0 ? (
                  <h5>€ {item.price}</h5>
                ) : (
                  <h5>€ {item.discount}</h5>
                )}
              </div>
            ))
          : null}
        <h4>Summary:</h4>

        {isAuthentificated === true && <CheckDiscount />}

        {err && <h5 className="discount-err">Code is invalid!</h5>}

        {discount !== undefined && discount !== null ? (
          <div>
            <h5>Discounted:</h5>
            {discount.val_voucher !== 0 && <h5>- €{discount.val_voucher}</h5>}
            {discount.discount !== 0 && <h5>- {discount.discount}%</h5>}
          </div>
        ) : null}

        <hr></hr>

        {discount === undefined || discount === null ? (
          <div>
            <h5>Total:</h5>
            <h5>€ {calcSum(sum)}</h5>
          </div>
        ) : (
          <div>
            {calcDiscountSum(sum, discount)[1].length > 1 ? (
              <h5 className="summary-err">
                {calcDiscountSum(sum, discount).slice(1)}
              </h5>
            ) : (
              <div>
                <h5>Total:</h5>
                <h5>€ {calcDiscountSum(sum, discount)}</h5>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default CartSummary;
