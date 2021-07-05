import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "../AdminPage.scss";

// Redux
import { useDispatch } from "react-redux";
import { handleStatus } from "../../../store/actions/adminActions";

const AdminPage = ({ order, status, id }) => {
  const parse = JSON.parse(order.what_bought);
  const [isComplete, setIsComplete] = useState(status);
  const [showProdList, setShowProdList] = useState(false);

  const dispatch = useDispatch();
  function handleStatusChange() {
    setIsComplete("completed");
    dispatch(handleStatus({ order, id }));
  }

  return (
    <div>
      <div className="table-body">
        <h5>#{order.ID}</h5>
        <h5>{order.name_customer + " " + order.lastname_customer}</h5>
        <h5>{order.email.split("@").join("@" + "\n")}</h5>
        <h5>{order.phone_number_customer}</h5>
        <h5>{order.address}</h5>
        <h5>{isComplete === "completed" ? "Delivered" : "Waiting"}</h5>
        <h5>€ {order.spent}</h5>
        <div className="table-btn">
          <button
            className={isComplete === "completed" ? "complete" : "incomplete"}
            onClick={handleStatusChange}
          >
            {isComplete === "completed" ? "Sent" : "Send"}
          </button>
          <button onClick={() => setShowProdList(!showProdList)}>
            Details
          </button>
        </div>
      </div>
      {showProdList &&
        parse.map((prod, i) => (
          <div key={i} className="table-details">
            <h5>{prod.name}</h5>
            <h5>{prod.count} pc.</h5>
            {prod.discount * 1 === 0 ? (
              <h5>€ {prod.price}</h5>
            ) : (
              <h5>€ {prod.discount}</h5>
            )}
          </div>
        ))}
    </div>
  );
};

export default withRouter(AdminPage);
