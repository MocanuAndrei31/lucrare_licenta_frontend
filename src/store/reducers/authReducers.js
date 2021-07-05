import {
  FETCH_USER,
  FETCHED_USER,
  REGISTER_SUCCESFUL,
  LOGIN_SUCCESFUL,
  LOGOUT_SUCCESFUL,
  REGISTER_FAIL,
  LOGIN_FAIL,
  REGISTER_ERROR,
  LOGIN_ERROR,
  RESET_ERROR,
} from "../actions/authActions";

const initState = {
  token: localStorage.getItem("token"),
  isAuthentificated: null,
  isLoading: false,
  user: JSON.parse(localStorage.getItem("user")),
  errors: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isLoading: true,
      };
    case FETCHED_USER:
      return {
        ...state,
        isAuthentificated: true,
        isLoading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESFUL:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        token: action.payload.token,
        isAuthentificated: true,
        user: action.payload.user,
        errors: null,
      };
    case LOGIN_SUCCESFUL:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem('savePermision', 'yes');

      return {
        ...state,
        token: action.payload.token,
        isAuthentificated: true,
        user: action.payload.user,
        errors: null,
      };
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        errors: null,
      };

    case LOGOUT_SUCCESFUL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isAuthentificated: null,
        isLoading: false,
        user: null,
        errors: null,
      };

    default:
      return state;
  }
};
