import React, { useEffect, useState } from "react";
import "./ProductDetails.scss";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/actions/cartActions";
import { getProdInfo } from "../../../store/actions/productsActions";

const ProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const infoProd = useSelector((state) => state.products.getProdInfo);
  const props = product.product;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  useEffect(() => {
    dispatch(getProdInfo(props.ID));
  }, [props.ID, dispatch]);

  return (
    <div className="products-details-container">
      {infoProd !== undefined && (
        <div className="products-details-content">
          <div className="block-one">
            <div className="products-details-img">
              <img src={infoProd.url_img} alt=""></img>
            </div>

            <div className="products-details-text">
              <h3>{infoProd.name}</h3>

              {infoProd.origin === null ||
              infoProd.origin === "" ||
              infoProd.origin === undefined ||
              infoProd.origin === "undefined" ? (
                <div>
                  <br></br>
                  <br></br>
                </div>
              ) : (
                <>
                  <h5>{infoProd.origin}</h5>
                </>
              )}
              <hr></hr>

              {infoProd.info.description === null ||
              infoProd.info.description === "" ||
              infoProd.info.description === undefined ||
              infoProd.info.description === "undefined" ? null : (
                <>
                  <h4>{infoProd.info.description}</h4>
                  <hr></hr>
                </>
              )}

              {props.discount * 1 === 0 ? (
                <h3>Total: € {infoProd.price}</h3>
              ) : (
                <>
                  <h3>
                    Total:<del> €{infoProd.price}</del>
                  </h3>
                  <h3 className="scontato">Discount: €{infoProd.discount}</h3>
                </>
              )}

              {infoProd.stock >= 1 ? (
                <button
                  className={!added ? "details-add-btn" : "details-added-btn"}
                  onClick={() => handleAddToCart(infoProd)}
                >
                  {!added ? "Add to cart" : "Added"}
                </button>
              ) : (
                <button className="details-btn-disabled">Out of stock</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
