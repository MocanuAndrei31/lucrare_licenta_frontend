import React from "react";
import "./ItemsAsList.scss";

const ItemsAsList = ({ itemsProps, i, removeItem, increment, decrement }) => {
  return (
    <div className="res-container">
      {itemsProps !== undefined && (
        <div>
          <div className="res">
            <div className="res-img">
              <div className="img-frame">
                <img src={itemsProps.url_img} alt=""></img>
              </div>
            </div>

            <div className="res-details">
              <h3>{itemsProps.name}</h3>
              {itemsProps.discount * 1 === 0 ? (
                <h6> Price € {itemsProps.price}/ pc.</h6>
              ) : (
                <>
                  <del>
                    <h6> Price € {itemsProps.price}/ pc.</h6>
                  </del>
                  <h6> Discounted € {itemsProps.discount}/ pc.</h6>
                </>
              )}
            </div>

            <div className="pc-price">
              {itemsProps.discount * 1 === 0 ? (
                <h4>€ {itemsProps.count * itemsProps.price}</h4>
              ) : (
                <h4>€ {itemsProps.count * itemsProps.discount}</h4>
              )}
              <button onClick={() => removeItem(i)}>
                <i className="far fa-trash-alt"></i>
              </button>
              <div className="res-btn">
                <div>
                  <button onClick={() => decrement(i)}>-</button>
                  <h4>{itemsProps.count}</h4>
                  <button onClick={() => increment(i)}>+</button>
                </div>
              </div>
              {itemsProps.stock < itemsProps.count ? (
                <h6 className="stock-err">Only {itemsProps.stock} pc. left</h6>
              ) : (
                <h6 className="stock-ok">Available {itemsProps.stock} pc.</h6>
              )}
            </div>
          </div>
          <hr></hr>
        </div>
      )}
    </div>
  );
};

export default ItemsAsList;
