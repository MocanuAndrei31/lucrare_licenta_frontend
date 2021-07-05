import axios from "axios";
import { outOfStock, clearCart } from "./cartActions";

import { updateUserPoints, deleteVoucher } from "./profileActions";

export const saveDeliveryInfo = (forDelivery) => (dispatch, getState) => {
  // const user = getState().auth.user;
  // console.log('USER DETAILS ', user);
  // console.log(forDelivery);
  localStorage.setItem("deliveryInfo", JSON.stringify(forDelivery));
  dispatch({
    type: "DELIVERY_INFO",
    payload: forDelivery,
  });
};

export const handleOrder = (totalSum, discount) => {
  // console.log("TOTALSUM IN orderActions", totalSum);
  // console.log("DISCOUNT IN orderActions", discount);
  //console.log("price stripe",price, "type of price", typeof price);

  return async function (dispatch, getState) {
    try {
      let deliveryInfo;
      let user;
      let token;
      let products;
      let price;
      deliveryInfo = await getState().products.deliveryInfo;
      user = await getState().auth.user;
      token = await getState().auth.token;
      console.log("DELIVERY INFO", deliveryInfo);
      if (getState().products.cartItems) {
        products = await getState().products.cartItems;
      } else {
        products = await JSON.parse(localStorage.getItem("cartItems"));
      }

      if (getState().products.cartPrice) {
        price = await getState().products.cartPrice;
      } else {
        price = await JSON.parse(localStorage.getItem("cartPrice"));
      }

      // console.log("GET USER STATE", user);
      // console.log("GET USER TOKEN", token);

      const address = deliveryInfo.deliveryAddress;
      const fname = deliveryInfo.name;
      const lname = deliveryInfo.lname;
      const email = deliveryInfo.email;
      const phone = deliveryInfo.phone;
      const what_bought = JSON.stringify(products);
      // const amount = (price * 1 > 29) ? price : ((price * 1) + 2.90);
      const amount = totalSum * 1;
      // console.log("amount ", amount, "type of amount", typeof amount);

      const forPoints = price;
      const date = deliveryInfo.deliveryDate + "/" + deliveryInfo.deliveryTime;
      const payment_method = "true";

      if (!token) {
        const orderDetails = {
          address: address,
          name_customer: fname,
          lastname_customer: lname,
          email: email,
          phone_number_customer: phone,
          what_bought: what_bought,
          date: date,
          spent: amount,
          forCalcPoints: forPoints,
          payment_method: "true",
        };

        const res = await axios
          .post(
            `${process.env.REACT_APP_URL_BACKEND}/orders/createOrder`,
            orderDetails
          )
          .then((result) => {
            // console.log('FETCH RES', result.data);
            dispatch({
              type: "CREATE_ORDER",
              payload: result.data,
            });
          })
          .catch((err) => console.log(err));
      } else {
        const orderDetails = {
          userID: user.ID,
          address: address,
          what_bought: what_bought,
          date: date,
          spent: amount,
          forCalcPoints: forPoints,
          payment_method: "true",
        };

        // console.log("DETAILS FOR AUTH ORDERS", orderDetails)

        const res = await axios
          .post(
            `${process.env.REACT_APP_URL_BACKEND}/orders/createOrderAuth`,
            orderDetails,
            tokenConfig(getState)
          )
          .then((result) => {
            dispatch({
              type: "CREATE_USER_ORDER",
              payload: result.data,
            });
            dispatch(updateUserPoints(orderDetails));
            if (discount !== undefined) {
              dispatch(deleteVoucher(orderDetails.userID, discount));
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const payAtDestination =
  (totalSum, discount) => (dispatch, getState) => {
    const deliveryInfo = getState().products.deliveryInfo;
    const user = getState().auth.user;
    const token = getState().auth.token;

    // console.log("PAY AT DESTINATION USER", user)
    // console.log("PAY AT DESTINATION TOTAL SUM", totalSum * 1)
    // console.log("PAY AT DESTINATION DISCOUNT", discount)

    let products;
    getState().products.cartItems
      ? (products = getState().products.cartItems)
      : (products = JSON.parse(localStorage.getItem("cartItems")));

    let price;
    getState().products.cartPrice
      ? (price = getState().products.cartPrice)
      : (price = JSON.parse(localStorage.getItem("cartPrice")));

    const address = deliveryInfo.deliveryAddress;
    const fname = deliveryInfo.name;
    const lname = deliveryInfo.lname;
    const email = deliveryInfo.email;
    const phone = deliveryInfo.phone;
    const what_bought = JSON.stringify(products);
    // const amount = price;
    // const amount = (price * 1 > 29) ? price : (price * 1) + 2.90;
    const amount = totalSum * 1;
    const forPoints = price;
    const date = deliveryInfo.deliveryDate + "/" + deliveryInfo.deliveryTime;

    if (!token) {
      const orderDetails = {
        address: address,
        name_customer: fname,
        lastname_customer: lname,
        email: email,
        phone_number_customer: phone,
        what_bought: what_bought,
        date: date,
        spent: amount,
        forCalcPoints: forPoints,
        payment_method: "false",
      };

      axios
        .post(
          `${process.env.REACT_APP_URL_BACKEND}/orders/createOrder`,
          orderDetails
        )
        .then((result) => {
          // console.log("PAY AT DESTINATION RES", result);
          dispatch(outOfStock(products));
          dispatch(clearCart());
        })
        .catch((err) => console.log(err));
    } else {
      const orderDetails = {
        userID: user.ID,
        address: address,
        name_customer: user.name,
        lastname_customer: user.last_name,
        email: user.email,
        phone_number_customer: user.phone_number,
        what_bought: what_bought,
        date: date,
        spent: amount,
        forCalcPoints: forPoints,
        payment_method: "false",
      };

      axios
        .post(
          `${process.env.REACT_APP_URL_BACKEND}/orders/createOrderAuth`,
          orderDetails,
          tokenConfig(getState)
        )
        .then((result) => {
          // console.log("PAY AT DESTINATION RES", result);
          dispatch(updateUserPoints(orderDetails));
          dispatch(outOfStock(products));
          dispatch(clearCart());
          if (discount !== undefined) {
            dispatch(deleteVoucher(user.ID, discount));
          }
        })
        .catch((err) => console.log(err));
    }
  };

export const getSchedule = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_URL_BACKEND}/orders/getProgram`)

    .then((result) => {
      // console.log("getSchedule RES", result);
      dispatch({
        type: "GET_PROGRAM",
        payload: result.data,
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["auth-token"] = token;
  }

  return config;
};
