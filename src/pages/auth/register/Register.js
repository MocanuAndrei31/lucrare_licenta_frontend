import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.scss";

// ASSETS
import Img from "../../../assets/register2.jpg";

// CALENDAR
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../store/actions/authActions";

const Register = () => {
  const dispatch = useDispatch();
  const errors = useSelector(({ auth }) => auth.errors);
  const [showPassword, setShowPassword] = useState(true);
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  });
  const [err, setErr] = useState(false);
  const [openCalendar, setOpenCaledar] = useState(false);
  const [value, setValue] = useState(new Date());
  const [viewDate, setViewDate] = useState();
  const [yourAge, setYourAge] = useState();
  const [checkedErr, setCheckedErr] = useState(false);

  function onChangeDate(nextValue) {
    setValue(nextValue);

    let today = new Date();
    let dd = nextValue.getDate();
    let mm = nextValue.getMonth() + 1; //January is 0!
    let yyyy = nextValue.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;

    const todayB = new Date();
    const birthDate = new Date(nextValue);
    let age_now = todayB.getFullYear() - birthDate.getFullYear();
    const m = todayB.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && todayB.getDate() < birthDate.getDate())) {
      age_now--;
    }

    setYourAge(age_now);
    setViewDate(today);
    setOpenCaledar(!openCalendar);
    setRegisterInfo({
      ...registerInfo,
      birthday: today,
    });
  }

  // Click to show the password
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // Submit Registration
  const submitForm = (e) => {
    e.preventDefault();
    if (registerInfo.password === registerInfo.confirmPassword) {
      dispatch(registerUser(registerInfo));
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };

  return (
    <div>
      <div className="register-container">
        <div className="register-content">
          <div className="register-card">
            <div className="register-card-header">Register</div>
          </div>

          <form className="register-form" onSubmit={submitForm}>
            <label htmlFor="email">E-mail:</label>
            <br></br>
            <input
              className="register-input"
              type="email"
              id="email"
              name="email"
              value={registerInfo.email}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, email: e.target.value })
              }
              maxLength="50"
              required
            />
            <br></br>

            <label htmlFor="fname">First Name:</label>
            <br></br>
            <input
              className="register-input"
              type="text"
              id="fname"
              name="firstName"
              value={registerInfo.firstName}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, firstName: e.target.value })
              }
              maxLength="50"
              required
            />
            <br></br>

            <label htmlFor="lname">Last Name:</label>
            <br></br>
            <input
              className="register-input"
              type="text"
              id="lname"
              name="lastName"
              value={registerInfo.lastName}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, lastName: e.target.value })
              }
              maxLength="50"
              required
            />
            <br></br>

            <label htmlFor="phone">Phone Number:</label>
            <br></br>
            <input
              type="text"
              id="phone"
              name="phone"
              title="Leave your phone number!"
              value={registerInfo.phone}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, phone: e.target.value })
              }
              maxLength="20"
              required
            />
            <br></br>

            <label htmlFor="date">Birthday</label>
            <br></br>
            <input
              onClick={() => setOpenCaledar(!openCalendar)}
              type="text"
              id="date"
              name="date"
              value={viewDate}
              maxLength="20"
              required
              readOnly
            />
            <br></br>

            {openCalendar && (
              <Calendar
                onChange={onChangeDate}
                value={value}
                defaultView="decade"
              />
            )}

            <div className="show-pass">
              <label htmlFor="pwd">Password:</label>
              <br></br>
              <input
                className="register-input"
                type={showPassword ? "password" : "text"}
                id="pwd"
                name="password"
                value={registerInfo.password}
                onChange={(e) =>
                  setRegisterInfo({ ...registerInfo, password: e.target.value })
                }
                title="Password needs to be 5 characters long!"
                pattern=".{5,}"
                maxLength="50"
                required
              ></input>

              <i
                onClick={handleShowPassword}
                className={showPassword ? "fas fa-eye-slash" : "far fa-eye"}
              ></i>

              <br></br>
            </div>

            <div className="show-pass">
              <label htmlFor="pwdConf">Confirm password:</label>
              <br></br>
              <input
                className="register-input"
                type={showPassword ? "password" : "text"}
                id="pwdConf"
                name="password"
                value={registerInfo.confirmPassword}
                onChange={(e) => {
                  setRegisterInfo({
                    ...registerInfo,
                    confirmPassword: e.target.value,
                  });
                  setErr(false);
                }}
                title="Password needs to be 5 characters long!"
                pattern=".{5,}"
                maxLength="50"
                required
              ></input>

              <i
                onClick={handleShowPassword}
                className={showPassword ? "fas fa-eye-slash" : "far fa-eye"}
              ></i>

              <br></br>
            </div>

            <label htmlFor="checkbox1" className="checkbox-container">
              I declare that I have read and accept the information on
              processing of my personal data.
              <input type="checkbox" name="checkbox1" id="checkbox1" required />
              <span className="checkmark"></span>
            </label>
            <label htmlFor="checkbox2" className="checkbox-container">
              I consent to the processing of my personal data to be updated on
              new products and services.
              <input type="checkbox" name="checkbox2" id="checkbox2" required />
              <span className="checkmark"></span>
            </label>

            <div className="register-err">
              {err && <h5>Passwords are not corresponding!</h5>}

              {errors && <h5>{errors.msg}</h5>}
              {checkedErr && <h5></h5>}
            </div>
            <div className="register-err">
              {err && <h5>Passwords are not corresponding!</h5>}
              {yourAge !== undefined && yourAge < 14 ? (
                <h5>It seems that you are too young!</h5>
              ) : null}
              {errors && <h5>{errors.msg}</h5>}
              {checkedErr && <h5></h5>}
            </div>

            {yourAge > 14 ? (
              <button type="submit" className="register-submit-btn">
                Register
              </button>
            ) : (
              <button disabled className="register-submit-btn">
                Register
              </button>
            )}

            <div className="register-footer-text">
              Do you have an account? <Link to="/SignIn">Sign In!</Link>
            </div>
          </form>

          <div className="register-img">
            <img src={Img} alt="img"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
