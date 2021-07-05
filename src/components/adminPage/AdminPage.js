import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./AdminPage.scss";

// COMPONENTS
import AdminTable from "./middlewares/AdminTable";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrders,
  fetchUsersOrders,
} from "../../store/actions/adminActions";

const AdminPage = () => {
  const orders = useSelector((state) => state.products.orders);
  const usersOrders = useSelector((state) => state.products.usersOrders);

  const [id, setId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchUsersOrders());
  }, [dispatch]);

  return (
    <div className="admin-page-container">
      <h2>
        <span>Administrator</span> Page
      </h2>

      <div className="admin-page-navbar">
        <button id="1" onClick={(e) => setId(e.currentTarget.id)}>
          Registered users
        </button>
        <button id="2" onClick={(e) => setId(e.currentTarget.id)}>
          Non-registered users
        </button>
      </div>

      <div className="admin-page-title">
        {id === "" && <h3> Registered users</h3>}
        {id === "1" && <h3> Registered users</h3>}
        {id === "2" && <h3>Non-registered users</h3>}
      </div>

      <div className="table-container">
        <div className="table-head">
          <h4>Order number</h4>
          <h4>Name</h4>
          <h4>E-mail</h4>
          <h4>Phone number</h4>
          <h4>Billing address</h4>
          <h4>State of the order</h4>
          <h4>Total</h4>
        </div>

        {id === "" && (
          <div>
            {usersOrders !== undefined &&
              usersOrders
                .map((order, i) => (
                  <AdminTable
                    key={i}
                    order={order}
                    status={order.send_status}
                    id="1"
                  />
                ))
                .reverse()}
          </div>
        )}
        {id === "1" && (
          <div>
            {usersOrders !== undefined &&
              usersOrders
                .map((order, i) => (
                  <AdminTable
                    key={i}
                    order={order}
                    status={order.send_status}
                    id={id}
                  />
                ))
                .reverse()}
          </div>
        )}
        {id === "2" && (
          <div>
            {orders !== undefined &&
              orders
                .map((order, i) => (
                  <AdminTable
                    key={i}
                    order={order}
                    status={order.send_status}
                    id={id}
                  />
                ))
                .reverse()}
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(AdminPage);
