import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.scss";

// ASSETS
import Img from "../../../assets/loginbg2.jpg";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/actions/authActions";

const SignIn = () => {
  const errors = useSelector(({ auth }) => auth.errors);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(loginInfo));
  };

  return (
    <div>
      <div className="signin-container">
        <div className="signin-content">
          <div className="signin-card">
            <div className="signin-card-header">Sign In</div>
          </div>

          <form className="signin-form" onSubmit={handleSubmit}>
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

            <div className="errors">{errors ? <h5>{errors.msg}</h5> : ""}</div>

            <button className="signin-submit-btn" type="submit">
              Sign In
            </button>
            <br></br>

            <div className="signin-footer-text">
              Are you not registered? <Link to="/Register">Register here!</Link>
            </div>
          </form>

          <div className="signin-img">
            <img src={Img} alt="img"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
