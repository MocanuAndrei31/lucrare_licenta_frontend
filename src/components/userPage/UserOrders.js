import React, { useState } from "react";

const UserOrders = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  const parse = JSON.parse(order.what_bought);

  return (
    <div>
      <div className="order-s">
        <h4>
          Order:
          <p>Total: € {order.spent}</p>
        </h4>
        <button onClick={() => setShowDetails(!showDetails)}>Details</button>
      </div>
      <hr></hr>
      {showDetails &&
        parse.map((prod, i) => (
          <div key={i} className="more-details">
            <div>
              <img src={prod.url_img} alt=""></img>
            </div>
            <h4>{prod.name}</h4>
            <h4>{prod.count} pc.</h4>
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

export default UserOrders;
