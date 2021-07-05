import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CartSignIn.scss";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/actions/authActions";

const CartSignIn = () => {
  const errors = useSelector(({ auth }) => auth.errors);
  const isAuthentificated = useSelector(({ auth }) => auth.isAuthentificated);
  const user = JSON.parse(localStorage.getItem("user"));

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginInfo));
  };

  return (
    <>
      {!isAuthentificated ? (
        <div className="cart-signin-container">
          <div className="cart-signin-card">
            <div className="cart-signin-card-header">Already registered?</div>
          </div>

          <div className="cart-signin-content">
            <form className="cart-signin-form" onSubmit={handleSubmit}>
              {errors ? (
                <div className="errors">
                  <p>{errors.msg}</p>
                </div>
              ) : (
                ""
              )}

              <label htmlFor="email">E-mail:</label>
              <br></br>
              <input
                type="email"
                id="email1"
                name="email"
                value={loginInfo.email}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, email: e.target.value })
                }
                maxLength="50"
                required
              />
              <br></br>

              <label htmlFor="pwd">Password:</label>
              <br></br>
              <input
                type="password"
                id="pwd1"
                name="password"
                value={loginInfo.password}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }
                maxLength="50"
              ></input>
              <br></br>

              <button className="cart-signin-submit-btn" type="submit">
                Sign In
              </button>
              <br></br>

              <div className="signin-footer-text">
                Not registered yet? <Link to="/Register">Register here!</Link>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="cart-signin-container-after">
          <div className="cart-signin-success">
            <h4>You are authenticated!</h4>
            {user !== null && <h4>{user.email}</h4>}
          </div>
        </div>
      )}
    </>
  );
};

export default CartSignIn;
