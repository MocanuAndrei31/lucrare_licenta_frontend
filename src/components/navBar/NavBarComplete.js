import React from "react";
import { Link } from "react-router-dom";
import "./NavBarComplete.scss";

// COMPONENTS
import NavBar from "./middlewares/NavBar";

// LAYOUT
import Hamburger from "../../layout/hamburger/Hamburger";

// REDUX
import { useSelector } from "react-redux";

const NavBarComplete = () => {
  const cart = useSelector((state) => state.products.cartItems);
  let cartItems;
  JSON.parse(localStorage.getItem("cartItems"))
    ? (cartItems = JSON.parse(localStorage.getItem("cartItems")))
    : (cartItems = cart);

  return (
    <div className="navbar-complete-container">
      <Hamburger />
      <div className="navbar-complete">
        {cartItems !== undefined && cartItems.length > 0 ? (
          <NavBar notification={cartItems.length} />
        ) : (
          <NavBar />
        )}
      </div>
    </div>
  );
};

export default NavBarComplete;
