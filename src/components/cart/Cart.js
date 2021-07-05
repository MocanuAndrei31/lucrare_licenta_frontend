import React, { useEffect } from "react";
import "./Cart.scss";
import { Link, Redirect } from "react-router-dom";

// COMPONENTS
import ItemsAsList from "../../layout/itemsAsList/ItemsAsList";
import CartSignIn from "./middlewares/CartSignIn";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItem,
  deleteAll,
  incrementNr,
  decrementNr,
  checkStocks,
} from "../../store/actions/cartActions";

const Cart = () => {
  const stockErr = useSelector((state) => state.products.stockErr);
  const cart = useSelector((state) => state.products.cartItems);
  let cartItems;
  cart === undefined
    ? (cartItems = JSON.parse(localStorage.getItem("cartItems")))
    : (cartItems = cart);

  const cartItemsLocal = JSON.parse(localStorage.getItem("cartItems"));

  let total = useSelector((state) => state.products.itemsPrice);
  let totalPrice;
  JSON.parse(localStorage.getItem("cartPrice"))
    ? (totalPrice = JSON.parse(localStorage.getItem("cartPrice")))
    : (totalPrice = total);

  let sum = 0;
  if (cartItems !== null) {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].discount * 1 === 0) {
        sum = sum + cartItems[i].price * cartItems[i].count;
      } else {
        sum = sum + cartItems[i].discount * cartItems[i].count;
      }
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkStocks(cartItems));
  }, [cartItems, dispatch]);

  const removeItem = (product) => {
    dispatch(deleteItem(product));
  };

  const removeAll = () => {
    dispatch(deleteAll());
  };

  const increment = (product) => {
    dispatch(incrementNr(product));
  };

  const decrement = (product) => {
    dispatch(decrementNr(product));
  };

  return (
    <div>
      <div className="cart-container">
        {cartItems === undefined ||
        cartItems === null ||
        cartItems.length === 0 ||
        cartItemsLocal === null ? (
          <h3>The cart is empty</h3>
        ) : (
          <div>
            {cartItemsLocal.map((item, i) => (
              <ItemsAsList
                key={i}
                itemsProps={item}
                removeItem={removeItem}
                increment={increment}
                decrement={decrement}
                i={i}
              />
            ))}
          </div>
        )}

        {cartItems !== null && cartItems.length > 0 ? (
          <div className="res-footer-container">
            <hr></hr>

            <div className="res-footer">
              <h4>Total:</h4>
              <h4>€ {sum}</h4>
            </div>
            <div className="res-footer">
              <button onClick={() => removeAll()}>
                <i className="far fa-trash-alt"></i> Empty cart
              </button>
            </div>

            <CartSignIn />

            <div className="next-step">
              {stockErr ? (
                <div>
                  <Link
                    to="/checkout/pay"
                    onClick={() => dispatch(checkStocks(cartItems))}
                  >
                    Change quantity <i className="fas fa-redo-alt"></i>
                  </Link>
                </div>
              ) : (
                <div>
                  {sum < 15 ? (
                    <Link to="/Cart/user-cart">
                      Check cart <i className="fas fa-chevron-right"></i>
                    </Link>
                  ) : (
                    <Link
                      to="/checkout/pay"
                      onClick={() => dispatch(checkStocks(cartItems))}
                    >
                      Order <i className="fas fa-chevron-right"></i>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {
              (localStorage.removeItem("cartItems"),
              localStorage.removeItem("cartPrice"))
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
