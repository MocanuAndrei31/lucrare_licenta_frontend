import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./NavBar.scss";
// import axios from "axios";

// ASSETS
import cart from "../../../assets/cart1.svg";
import profil from "../../../assets/profil.png";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { searchResults } from "../../../store/actions/userActions";

const NavBar = ({ notification }) => {
  const isAuthentificated = useSelector(({ auth }) => auth.isAuthentificated);
  const [searchData, setSearchData] = useState({
    query: "",
    results: {},
    loading: false,
    message: "",
    openSearch: false,
  });
  const [openSearch, setOpenSearch] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  const allProducts = useSelector((state) => state.products.products);
  // console.log("THIS IS PRODUCTS", allProducts)

  const carte = useSelector((state) => state.products.cartItems);
  let cartItems;
  carte === undefined
    ? (cartItems = JSON.parse(localStorage.getItem("cartItems")))
    : (cartItems = carte);

  const price = useSelector((state) => state.products.itemsPrice);
  let itemsPrice;
  carte === undefined
    ? (itemsPrice = price)
    : (itemsPrice = JSON.parse(localStorage.getItem("cartPrice")));

  const cartItemsLocal = JSON.parse(localStorage.getItem("cartItems"));

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

  const scrollWidthOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -110;
    window.scrollTo({
      top: yCoordinate + yOffset,
    });
  };

  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    let resFiltered = [];

    resFiltered = allProducts.filter((prod) =>
      prod.name.toLowerCase().includes(searchData.query.toLowerCase())
    );

    setSearchData({
      ...searchData,
      results: resFiltered,
    });
  }, [searchData.query]);

  const dispatch = useDispatch();
  const handleSearchResults = (e) => {
    e.preventDefault();
    dispatch(searchResults(searchData.results));
  };

  return (
    <div className="navbar-container">
      <Link to="/User/user-page">
        <div className="navbar-profile">
          {isAuthentificated === true && <span></span>}
          <img src={profil} alt="" style={{ width: "22px" }}></img>
        </div>
      </Link>

      {size > 860 ? (
        <Link to="/Cart/user-cart">
          <div className="navbar-cart">
            {notification !== undefined ? (
              <div className="notification">{notification}</div>
            ) : null}
            <img src={cart} alt="" style={{ width: "16px" }}></img>

            {cartItems !== null && cartItems.length !== 0 ? (
              <div className="cart-tooltip">
                <div className="cart-tooltip-text">
                  {cartItems.map((item, i) => (
                    <div key={i}>
                      <div className="tooltip-img">
                        <img src={item.url_img} alt=""></img>
                      </div>
                      <h4 className="tooltip-details">
                        <span>{item.name} </span>
                        <br></br>
                        {item.discount * 1 === 0 ? (
                          <span>
                            {item.count} X € {item.price}
                          </span>
                        ) : (
                          <span>
                            {item.count} X € {item.discount}
                          </span>
                        )}
                      </h4>
                    </div>
                  ))}
                  <hr></hr>
                  <h4>
                    <span>Total:</span> € {sum}
                  </h4>
                  <br></br>
                  <br></br>
                  <button>CHECKOUT</button>
                </div>
              </div>
            ) : null}
          </div>
        </Link>
      ) : (
        <div
          className="navbar-cart"
          onClick={() => setOpenTooltip(!openTooltip)}
        >
          {notification !== undefined ? (
            <div className="notification">{notification}</div>
          ) : null}
          <img src={cart} alt="" style={{ width: "16px" }}></img>

          {openTooltip && cartItems !== null && cartItems.length !== 0 ? (
            <div className="cart-tooltip2">
              <div className="cart-tooltip-text2">
                {cartItems.map((item, i) => (
                  <div key={i}>
                    <div className="tooltip-img2">
                      <img src={item.url_img} alt=""></img>
                    </div>
                    <h4 className="tooltip-details2">
                      <span>{item.name} </span>
                      <br></br>
                      {item.discount * 1 === 0 ? (
                        <span>
                          {item.count} X € {item.price}
                        </span>
                      ) : (
                        <span>
                          {item.count} X € {item.discount}
                        </span>
                      )}
                    </h4>
                  </div>
                ))}
                <hr></hr>
                <h4>
                  <span>Total:</span> € {sum}
                </h4>
                <br></br>
                <br></br>
                <Link
                  to="/Cart/user-cart"
                  onClick={() => setOpenTooltip(!openTooltip)}
                >
                  CHECKOUT
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default NavBar;
