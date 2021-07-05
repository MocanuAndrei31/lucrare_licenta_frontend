import React, { useState, useEffect } from "react";
import "./FormToCheckout.scss";
import { useHistory, Redirect } from "react-router-dom";

// COMPONENTS
import CartSummary from "../cartSummary/CartSummary";
import ModalStripe from "../modal/Modal";

// UTILS
import { calcSum, calcDiscountSum } from "../cartSummary/middlewares/utils.js";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  saveDeliveryInfo,
  getSchedule,
} from "../../../../store/actions/orderActions";
import { checkStocks } from "../../../../store/actions/cartActions";
import { searchAdress } from "../../../../store/actions/userActions";
import { payAtDestination } from "../../../../store/actions/orderActions";

const FormToCheckout = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.products.statusZipCode);
  const isAuthentificated = useSelector(({ auth }) => auth.isAuthentificated);
  const stockErr = useSelector((state) => state.products.stockErr);
  const getProgram = useSelector((state) => state.products.getProgram);
  const discount = useSelector((state) => state.products.discountDetails);
  const cart = useSelector((state) => state.products.cartItems);

  let cartItems;
  cart === undefined
    ? (cartItems = JSON.parse(localStorage.getItem("cartItems")))
    : (cartItems = cart);

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

  const handlePayLater = (totalSum, discount) => {
    dispatch(payAtDestination(totalSum, discount));

    history.push("/Pay/successPage");
  };

  const [forDelivery, setForDelivery] = useState({
    phone: "",
    email: "",
    name: "",
    lname: "",
    deliveryDate: "",
    deliveryTime: "",
    deliveryTimeView: "",
    deliveryAddress: "",
  });
  const [deliveryInfo, setDeliveryInfo] = useState({ zipCode: "" });
  const [openCalendar, setOpenCaledar] = useState(false);
  const [value, setValue] = useState(new Date());

  const [todayIs, setTodayIs] = useState();
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const [payBtn, setPayBtn] = useState(false);
  const [dayNow, setDayNow] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryInfo(forDelivery));
    dispatch(checkStocks(cartItems));
    setPayBtn(true);
    dispatch(searchAdress(deliveryInfo));
  };

  function retProg(arr, hh, mm) {
    let resArr = [];
    if (dayNow === todayIs) {
      if (hh < parseInt(arr[0].slice(0, 2))) {
        for (let i = 0; i < arr.length - 1; i++) {
          resArr[i] = arr[i] + " - " + arr[i + 1];
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (parseInt(arr[i].slice(0, 2)) >= hh) {
            if (mm <= 15) {
              resArr[i] = arr[i + 1] + " - " + arr[i + 2];
            } else if (mm <= 45) {
              resArr[i] = arr[i + 2] + " - " + arr[i + 3];
            } else {
              resArr[i] = arr[i + 3] + " - " + arr[i + 4];
            }
          }
        }
      }
      let res = resArr.filter(
        (el) =>
          el !== undefined &&
          el !== "undefined - undefined" &&
          !el.includes("undefined")
      );
      return res;
    } else {
      for (let i = 0; i < arr.length - 1; i++) {
        resArr[i] = arr[i] + " - " + arr[i + 1];
      }
      const res = resArr;
      return res;
    }
  }

  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let today = new Date();
    let day = days[today.getDay()];
    let dd = value.getDate();
    let mm = value.getMonth() + 1;
    let yyyy = value.getFullYear();
    let hh = today.getHours();
    let min = today.getMinutes();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;

    let an = today.slice(0, 4);
    let luna = today.slice(5, 7);
    let zi = today.slice(8, 10);

    let d = new Date(`${luna}/${zi}/${an}`);
    let dayName = days[d.getDay()];
    setForDelivery({
      ...forDelivery,
      deliveryDate: today,
    });

    dispatch(getSchedule());
    setTodayIs(dayName);
    setHour(hh);
    setMin(min);
    setDayNow(day);
  }, [value]);

  return (
    <>
      {!stockErr ? (
        <div className="checkout-container">
          <div className="checkout-layout">
            <div className={isAuthentificated !== true ? "form-l" : "form-s"}>
              <h3>Delivery Info</h3>

              {/* <CheckoutForm /> */}
              <form id="my-form" className="style-form" onSubmit={handleSubmit}>
                <label htmlFor="text">Postal code</label>
                <input
                  type="text"
                  id="text"
                  name="text"
                  placeholder="Enter your postal code"
                  value={deliveryInfo.zipCode}
                  onChange={(e) =>
                    setDeliveryInfo({
                      ...deliveryInfo,
                      zipCode: e.target.value,
                    })
                  }
                  maxLength="50"
                  required
                  disabled={!payBtn ? "" : "disabled"}
                />

                <label htmlFor="date">Billing address</label>
                <br></br>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your billing address"
                  value={forDelivery.deliveryAddress}
                  onChange={(e) =>
                    setForDelivery({
                      ...forDelivery,
                      deliveryAddress: e.target.value,
                    })
                  }
                  required
                  disabled={!payBtn ? "" : "disabled"}
                />
                <br></br>

                {isAuthentificated !== true && (
                  <div>
                    <label htmlFor="phone">Phone number:</label>
                    <br></br>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      title="Only numbers allowed!"
                      placeholder="+40 0753345722"
                      // pattern="[0-9]+"
                      maxLength="20"
                      required
                      disabled={!payBtn ? "" : "disabled"}
                      value={forDelivery.phone}
                      onChange={(e) =>
                        setForDelivery({
                          ...forDelivery,
                          phone: e.target.value,
                        })
                      }
                    />
                    <br></br>

                    <label htmlFor="email">Enter your email:</label>
                    <br></br>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={forDelivery.email}
                      onChange={(e) =>
                        setForDelivery({
                          ...forDelivery,
                          email: e.target.value,
                        })
                      }
                      required
                      disabled={!payBtn ? "" : "disabled"}
                    />
                    <br></br>

                    <label htmlFor="name">First name:</label>
                    <br></br>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your first name"
                      value={forDelivery.name}
                      onChange={(e) =>
                        setForDelivery({
                          ...forDelivery,
                          name: e.target.value,
                        })
                      }
                      required
                      disabled={!payBtn ? "" : "disabled"}
                    />
                    <br></br>

                    <label htmlFor="date">Last name:</label>
                    <br></br>
                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Enter your last name"
                      value={forDelivery.lname}
                      onChange={(e) =>
                        setForDelivery({
                          ...forDelivery,
                          lname: e.target.value,
                        })
                      }
                      required
                      disabled={!payBtn ? "" : "disabled"}
                    />
                    <br></br>
                  </div>
                )}

                {!payBtn ? (
                  <div className="pay-step">
                    <div className="step-left">
                      <button onClick={() => history.goBack()}>
                        <i className="fas fa-chevron-left"></i>Back
                      </button>
                    </div>
                    <div className="step-right">
                      <button type="submit">
                        Purchase <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="res-stripe">
                    <div id="toPay">
                      {discount === undefined || discount === null ? (
                        <ModalStripe
                          buttonName={"Payment with Stripe"}
                          price={calcSum(sum)}
                          cartItems={cartItems}
                        />
                      ) : (
                        <div>
                          {calcDiscountSum(sum, discount)[1].length > 1 ? (
                            <button className="pay-btn-disabled">
                              Payment with Stripe
                            </button>
                          ) : (
                            <ModalStripe
                              buttonName={"Payment with Stripe"}
                              price={calcDiscountSum(sum, discount)[0]}
                              discount={discount}
                              cartItems={cartItems}
                            />
                          )}
                        </div>
                      )}

                      <button onClick={() => setPayBtn(!payBtn)}>
                        <i className="fas fa-chevron-left"></i>Back
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            <div className="pay-container">
              <CartSummary payBtn={payBtn} />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/Cart/user-cart" />
      )}
    </>
  );
};
export default FormToCheckout;
