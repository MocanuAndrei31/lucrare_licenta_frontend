import axios from "axios";

export const FETCH_USER = "FETCH_USER";
export const FETCHED_USER = "FETCHED_USER";
export const REGISTER_SUCCESFUL = "REGISTER_SUCCESFUL";
export const LOGIN_SUCCESFUL = "LOGIN_SUCCESFUL";
export const LOGOUT_SUCCESFUL = "LOGOUT_SUCCESFUL";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const RESET_ERROR = "RESET_ERROR";

export const fetchUser = () => (dispatch, getState) => {
  dispatch({ type: FETCH_USER });

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

  axios
    .get(`http://localhost:5001/auth/user`, config)
    .then((res) => {
      // console.log("FETCH USER", res.data)
      dispatch({
        type: FETCHED_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      // console.log(err);
      dispatch(logout());
    });
};

export const registerUser = (registerInfo) => (dispatch) => {
  const { firstName, lastName, email, password, phone, birthday } =
    registerInfo;

  const userCredentials = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phone,
    password,
    birthday,
  };

  axios
    .post(`http://localhost:5001/auth/register`, userCredentials)
    .then((res) => {
      // console.log("REGISTER USER", res.data)
      dispatch({
        type: REGISTER_SUCCESFUL,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err) {
        dispatch({
          type: REGISTER_ERROR,
          payload: err.response.data,
        });

        setTimeout(() => {
          dispatch(resetErrors());
        }, 3000);
      }
    });
};

export const loginUser =
  ({ email, password }) =>
  (dispatch) => {
    const loginCredentials = {
      email,
      password,
    };

    axios
      .post(`http://localhost:5001/auth/login`, loginCredentials)
      .then((res) => {
        // console.log("SIGN IN", res.data)
        dispatch({
          type: LOGIN_SUCCESFUL,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          dispatch({
            type: LOGIN_ERROR,
            payload: err.response.data,
          });

          setTimeout(() => {
            dispatch(resetErrors());
          }, 3000);
        }
      });
  };

export const logout = () => {
  return {
    type: LOGOUT_SUCCESFUL,
  };
};

export const resetErrors = () => (dispatch) => {
  dispatch({
    type: RESET_ERROR,
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
    config.headers["x-auth-token"] = token;
  }

  return config;
};
