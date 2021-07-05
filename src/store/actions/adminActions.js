import axios from 'axios';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    // dispatch({ type: 'ORDERS' });

    axios
      .get(
        `${process.env.REACT_APP_URL_BACKEND}/admin/orders`,
        tokenConfig(getState)
      )

      .then((result) => {
        // console.log("RES DATA", result.data)
        dispatch({
          type: 'ORDERS',
          payload: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const fetchUsersOrders = () => {
  return async (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_URL_BACKEND}/admin/usersOrders`,
        tokenConfig(getState)
      )

      .then((result) => {
        // console.log("RES DATA USER", result.data)
        dispatch({
          type: 'USERS_ORDERS',
          payload: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_URL_BACKEND}/admin/fetchUsers`,
        tokenConfig(getState)
      )
      .then((result) => {
        // console.log("RES DATA USER", result.data)
        dispatch({
          type: 'FETCH_USERS',
          payload: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};


export const setUserDiscount = (id, discountCode, value) => (dispatch, getState) => {
  // console.log('USERS ID', id)
  // console.log('USERS DISCOUNT', discount)
  const disc = {
    discCode : discountCode,
    val : value
  }
  axios
    .post(
      `${process.env.REACT_APP_URL_BACKEND}/admin/setUserDiscount/${id}`,
      disc, tokenConfig(getState)
    )
    .then((result) => {
      console.log(result);
      // dispatch(fetchOrders());
    })

    .catch((err) => {
      console.log(err);
    });
};

export const setAllUsersDiscount  = (discountCode, value) => (dispatch, getState) => {
  // console.log('USERS Value', value)
  // console.log('USERS DISCOUNT', discountCode)
  const disc = {
    discCode : discountCode,
    val : value
  }
  axios
    .post(
      `${process.env.REACT_APP_URL_BACKEND}/admin/setAllUsersDiscount`,
      disc, tokenConfig(getState)
    )
    .then((result) => {
      console.log(result);
      // dispatch(fetchOrders());
    })

    .catch((err) => {
      console.log(err);
    });
};

export const handleStatus = ({ order, id }) => (dispatch, getState) => {
  axios
    .put(
      `${process.env.REACT_APP_URL_BACKEND}/admin/updateStatus/${id}`,
      order,
      tokenConfig(getState)
    )
    .then((result) => {
      // console.log(result);
      // dispatch(fetchOrders());
    })

    .catch((err) => {
      console.log(err);
    });
};

export const sendUserMsg = (contactUs) => (dispatch, getState) => {
  // console.log('CONTACT US', contactUs)
  axios
    .post(
      `${process.env.REACT_APP_URL_BACKEND}/admin/sendMessage`,
      contactUs,
    )
    .then((result) => {
      // console.log(result);
      dispatch({
        type: 'CONTACT_MSG',
        payload: result.data.msg,
      });
      setTimeout(() => {
        dispatch({
          type: 'CONTACT_MSG',
          payload: undefined,
        });
      }, 3000);
    })

    .catch((err) => {
      console.log(err);
    });
};


export const setTimeSchedule = (monday, tuesday, wednesday, thursday, friday, saturday, sunday) => (getState) => {
  const program = [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
  axios
    .post(
      `${process.env.REACT_APP_URL_BACKEND}/admin/updateProgram`,
      program
    )
    .then((result) => {
      console.log("setTimeSchedule RES", result);
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
      'Content-type': 'application/json',
    },
  };

  if (token) {
    config.headers['auth-token'] = token;
  }

  return config;
};
