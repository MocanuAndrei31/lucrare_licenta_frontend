import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserCards.scss";
import "./DeleteCards.scss";

// COMPONENTS
import EditCard from "./EditCard";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  editProduct,
} from "../../store/actions/productsActions";
import { addToCart } from "../../store/actions/cartActions";

const ProductsCards = ({ product, view }) => {
  const user = useSelector(({ auth }) => auth.user);
  const [editProductModal, setEditProductModal] = useState(false);
  const [editProductInfo, setEditProductInfo] = useState({
    id: product.ID,
    category: product.category,
    subcategory: product.sub_category,
    name: product.name,
    price: product.price,
    discount: product.discount,
    stock: product.stock,
  });
  const [added, setAdded] = useState(false);

  const handleEditProduct = () => {
    setEditProductModal(true);
  };

  const dispatch = useDispatch();
  const handleSubmitEditProduct = (e) => {
    e.preventDefault();
    dispatch(editProduct(editProductInfo));
    setEditProductModal(false);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAdded(true);
    const timer = setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="admin-main-container">
      <div className={!view ? "user-card-container1" : "user-card-container2"}>
        <div className="product-img">
          <Link
            to={{
              pathname: `/Details/product`,
              state: { product },
            }}
          >
            <img
              src={"http://localhost:5001/" + product.url_img}
              alt={product.name}
            ></img>
          </Link>
        </div>

        <div className="user-card-desc">{product.name}</div>

        {product.discount * 1 === 0 ? (
          <>
            <div className="price-container">
              <div className="totale">Price</div>
              <div className="price">
                <span>&#8364;</span>
                {product.price}
              </div>
            </div>

            <div className="price-container discount"></div>
          </>
        ) : (
          <>
            <div className="price-container">
              <div className="totale">Price</div>
              <div className="price">
                <span>&#8364;</span>
                <del>{product.price}</del>
              </div>
            </div>

            <div className="price-container discount">
              <div className="totale">Discount</div>
              <div className="price">
                <span>&#8364;</span>
                {product.discount}
              </div>
            </div>
          </>
        )}

        {product.stock >= 1 ? (
          <button
            className={!added ? "add-btn" : "added-btn"}
            onClick={() => handleAddToCart(product)}
          >
            {!added ? "Add to cart" : "Added"}
          </button>
        ) : (
          <button className="add-btn-disabled">Out of stock</button>
        )}

        {user ? (
          user.role === "admin" ? (
            <>
              <div className="edit-container" onClick={handleEditProduct}>
                <span>
                  <i className="fas fa-pencil-alt"></i>
                </span>
              </div>
              <div
                className="delete-container"
                onClick={() => dispatch(deleteProduct(product.ID))}
              >
                <span>
                  <i className="far fa-trash-alt"></i>
                </span>
              </div>
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <EditCard
          handleSubmitEditProduct={handleSubmitEditProduct}
          editProductModal={editProductModal}
          setEditProductModal={setEditProductModal}
          editProductInfo={editProductInfo}
          setEditProductInfo={setEditProductInfo}
        />
      </div>
    </div>
  );
};

export default ProductsCards;
