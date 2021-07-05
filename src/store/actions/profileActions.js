import axios from "axios";

export const fetchUserOrders = (id) => (dispatch, getState) => {
  axios
    .get(
      `${process.env.REACT_APP_URL_BACKEND}/user/userOrders/${id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: "USER_ORDERS",
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchUserPoints = (id) => (dispatch, getState) => {
  axios
    .get(
      `${process.env.REACT_APP_URL_BACKEND}/user/userPoints/${id}`,
      tokenConfig(getState)
    )

    .then((res) => {
      dispatch({
        type: "USER_POINTS",
        payload: res.data[0].user_points,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUserPoints = (orderDetails) => (dispatch, getState) => {};

export const handleVoucher =
  (value, id, points, pt) => (dispatch, getState) => {
    const val_voucher = {
      val: value,
      id: id,
    };
    const calcPoints = {
      calcPoints: points - pt,
    };
    axios
      .post(
        `${process.env.REACT_APP_URL_BACKEND}/user/createVoucher`,
        val_voucher,
        tokenConfig(getState)
      )
      .then((res) => {
        // console.log(res)
        axios
          .put(
            `${process.env.REACT_APP_URL_BACKEND}/user/updatePoints/${id}`,
            calcPoints,
            tokenConfig(getState)
          )
          .then((res) => {
            dispatch(fetchUserPoints(id));
            dispatch(fetchUserVouchers(id));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const fetchUserVouchers = (id) => (dispatch, getState) => {
  // console.log("USER ID", id)
  axios
    .get(
      `${process.env.REACT_APP_URL_BACKEND}/user/userVouchers/${id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: "USER_VOUCHERS",
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteVoucher = (id, voucher) => (dispatch) => {
  // console.log("USER ID", id)
  axios
    .delete(
      `${process.env.REACT_APP_URL_BACKEND}/orders/deleteVoucher/${voucher.cod}`
    )
    .then((res) => {
      dispatch(fetchUserVouchers(id));
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
