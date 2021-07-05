import React, { useState, useEffect } from "react";
import "./UserPage.scss";

// COMPONENTS
import EditUserInfo from "./EditUserInfo";
import UserOrders from "./UserOrders";
import ChooseVoucher from "./components/ChooseVoucher";

// MIDDLEWARES
import DisplayVouchers from "./components/DisplayVouchers";
import DisplayDiscounts from "./components/DisplayDiscounts";

// ASSETS
import img1 from "../../assets/user.png";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserOrders,
  fetchUserPoints,
  fetchUserVouchers,
} from "../../store/actions/profileActions";

const UserInt = () => {
  const user = useSelector(({ auth }) => auth.user);
  const isAuthentificated = useSelector(({ auth }) => auth.isAuthentificated);
  const points = useSelector((state) => state.products.userPoints);
  const orders = useSelector((state) => state.products.userOrders);
  const vouchers = useSelector((state) => state.products.userVouchers);

  const [editInfoModal, setEditInfoModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrders(user.ID));
    dispatch(fetchUserPoints(user.ID));
    dispatch(fetchUserVouchers(user.ID));
  }, [dispatch, user.ID]);

  return (
    <div className="user-interface">
      <div className="header">
        <h3>
          {isAuthentificated === true
            ? `${user.name} ${user.last_name}`
            : "Loading"}
        </h3>

        <div className="profile">
          <div>
            {user.url_img === null ? (
              <img src={img1} alt="" />
            ) : (
              <img src={user.url_img} alt="" />
            )}
          </div>
        </div>
      </div>

      <div className="container1">
        <h3>Account Details</h3>
        <ul>
          <li>
            <span>Name: </span>
            {isAuthentificated === true
              ? `${user.name} ${user.last_name}`
              : "Loading"}
            <i
              onClick={() => setEditInfoModal(true)}
              className="far fa-edit"
            ></i>
          </li>
          <li>
            <span>Email: </span>
            {isAuthentificated === true ? user.email : "Loading"}
            <i
              onClick={() => setEditInfoModal(true)}
              className="far fa-edit"
            ></i>
          </li>
          <li>
            <span>Birthday: </span>
            {isAuthentificated === true ? user.user_birthday : "Loading"}
            <i
              onClick={() => setEditInfoModal(true)}
              className="far fa-edit"
            ></i>
          </li>
          <li>
            <span>Phone Number: </span>
            {isAuthentificated === true ? user.phone_number : "Loading"}
            <i
              onClick={() => setEditInfoModal(true)}
              className="far fa-edit"
            ></i>
          </li>
        </ul>
      </div>

      <div className="container2">
        <h3>Bonus Points</h3>
        <p>
          You have acquired:{" "}
          {points !== undefined ? (
            <>
              <span>{points}</span> <span>/points</span>
            </>
          ) : (
            <>
              <span>0</span> <span>/points</span>
            </>
          )}
        </p>

        <ChooseVoucher points={points} id={user.ID} />
        <hr></hr>

        {vouchers !== undefined && vouchers.length > 0 && (
          <div className="vouchers-container">
            <DisplayVouchers />
            <DisplayDiscounts />
          </div>
        )}
      </div>

      <div className="container3">
        <h3>Past Orders</h3>

        {orders !== undefined &&
          orders
            .map((order, i) => <UserOrders key={i} order={order} />)
            .reverse()}
      </div>

      {editInfoModal ? (
        <EditUserInfo
          isAuthentificated={isAuthentificated}
          user={user}
          setEditInfoModal={setEditInfoModal}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default UserInt;
