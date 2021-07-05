import axios from 'axios';

import { fetchUser } from './authActions';

export const editName = ({ name, id }) => (dispatch, getState) => {
  axios
    .put(
      `${process.env.REACT_APP_URL_BACKEND}/user/edit/name`,
      { name, id },
      tokenConfig(getState)
    )
    .then((result) => {
      dispatch(fetchUser());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editLastName = ({ last_name, id }) => (dispatch, getState) => {
  axios
    .put(
      `${process.env.REACT_APP_URL_BACKEND}/user/edit/lastname`,
      { last_name, id },
      tokenConfig(getState)
    )
    .then((result) => {
      dispatch(fetchUser());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editEmail = ({ email, id }) => (dispatch, getState) => {
  axios
    .put(
      `${process.env.REACT_APP_URL_BACKEND}/user/edit/email`,
      { email, id },
      tokenConfig(getState)
    )
    .then((result) => {
      dispatch(fetchUser());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editPhoneNumber = ({ phone_number, id }) => (
  dispatch,
  getState
) => {
  axios
    .put(
      `${process.env.REACT_APP_URL_BACKEND}/user/edit/number`,
      { phone_number, id },
      tokenConfig(getState)
    )
    .then((result) => {
      dispatch(fetchUser());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleSideBar = (status) => (dispatch) => {
  // console.log('HAM STATUS', status);
  dispatch({
    type: 'SIDE_BAR',
    payload: status,
  });
};

export const searchResults = (res) => (dispatch) => {
  // console.log('STATUS', res);
  // dispatch({
  //   type: 'SIDE_BAR',
  //   payload: status,
  // });
};

export const handlePermisionStatus = (status) => (dispatch) => {
  dispatch({
    type: 'STATUS',
    payload: status,
  });
};

export const searchAdress = (deliveryInfo) => (dispatch) => {
  // console.log('zipCode', deliveryInfo)
  axios
    .post(
      `${process.env.REACT_APP_URL_BACKEND}/user/zipCode`, deliveryInfo)

    .then((result) => {
      // console.log("ZIP CODE RES", result.data)

      if (typeof result.data === 'string' || result.data instanceof String) {
        dispatch({
          type: 'STATUS_ZIP_CODE',
          payload: result.data,
        });
      } else {
        dispatch({
          type: 'STATUS_ZIP_CODE',
          payload: "OK",
        });
      }

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
