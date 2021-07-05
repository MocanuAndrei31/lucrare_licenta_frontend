import React, { useState } from "react";
import "./AdminCards.scss";

// REDUX
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/actions/productsActions";

const AdminCards = ({
  setNewProductModal,
  newProductModal,
  newProductInfo,
  setNewProductInfo,
}) => {
  const [imagePreview, setImagePreview] = useState();

  const handleFile = (e) => {
    const image = e.target.files[0];

    // DISPLAY THE IMG/FILE
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setNewProductInfo({
          ...newProductInfo,
          image,
        });
      }
    };
    reader.readAsDataURL(image);
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createProduct(newProductInfo));
    setNewProductInfo({
      category: "",
      subcategory: "",
      name: "",
      price: "",
      stock: "",
      image: "",
      description: "",
    });
    setNewProductModal(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-btn" onClick={() => setNewProductModal(true)}>
        <span>
          <i className="fas fa-plus"></i>
        </span>
        <div className="admin-tooltip">Add new product</div>
      </div>

      {newProductModal && (
        <div id="myModal" className="admin-modal-container">
          <div className="edit-modal-content">
            <div className="close-edit-modal">
              <i
                onClick={() => {
                  setNewProductModal(false);
                  setImagePreview();
                }}
                className="fas fa-times"
              ></i>
            </div>
            <form className="admin-form-container" onSubmit={handleSubmit}>
              {/* IMAGE */}
              <div className="first-div">
                <div className="img-div">
                  <div className="admin-add-img">
                    {imagePreview !== null && (
                      <img src={imagePreview} alt=""></img>
                    )}
                    <input
                      type="file"
                      name="file"
                      className="admin-input"
                      onChange={(e) => handleFile(e)}
                      required
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="all-inputs-containers">
                    <div className="all-labels">Description:</div>
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      rows="2"
                      value={newProductInfo.description}
                      onChange={(e) =>
                        setNewProductInfo({
                          ...newProductInfo,
                          description: e.target.value,
                        })
                      }
                      placeholder="Product description"
                      autoComplete="off"
                    ></textarea>
                  </div>
                </div>

                <div className="inputs-div">
                  {/* NAME */}
                  <div className="all-inputs-containers">
                    <div className="all-labels">Name:</div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={newProductInfo.name}
                      onChange={(e) =>
                        setNewProductInfo({
                          ...newProductInfo,
                          name: e.target.value,
                        })
                      }
                      placeholder="Name of product"
                      autoComplete="off"
                      required
                    ></input>
                  </div>

                  {/* CATEGORY */}
                  <div className="all-inputs-containers">
                    <div className="all-labels">Category:</div>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={newProductInfo.category}
                      onChange={(e) =>
                        setNewProductInfo({
                          ...newProductInfo,
                          category: e.target.value,
                        })
                      }
                      placeholder="Product Category"
                      autoComplete="off"
                      required
                    ></input>
                  </div>

                  {/* SUBCATEGORY */}
                  <div className="all-inputs-containers">
                    <div className="all-labels">Sub_category of product</div>
                    <input
                      type="text"
                      name="subcategory"
                      id="subcategory"
                      value={newProductInfo.subcategory}
                      onChange={(e) =>
                        setNewProductInfo({
                          ...newProductInfo,
                          subcategory: e.target.value,
                        })
                      }
                      placeholder="Subcategory"
                      autoComplete="off"
                      required
                    ></input>
                  </div>

                  {/* PRICE */}
                  <div className="number-container">
                    <div className="all-num-labels">Price/pc:</div>
                    <div className="all-num">
                      <span>&#8364;</span>
                      <input
                        type="number"
                        step="any"
                        id="price"
                        name="price"
                        value={newProductInfo.price}
                        onChange={(e) =>
                          setNewProductInfo({
                            ...newProductInfo,
                            price: e.target.value,
                          })
                        }
                        placeholder="00.00"
                        required
                      ></input>
                    </div>
                  </div>

                  {/* STOCK */}
                  <div className="number-container">
                    <div className="all-num-labels">Stock:</div>
                    <div className="all-num">
                      <input
                        type="number"
                        step="any"
                        id="stock"
                        name="stock"
                        value={newProductInfo.stock}
                        onChange={(e) =>
                          setNewProductInfo({
                            ...newProductInfo,
                            stock: e.target.value,
                          })
                        }
                        placeholder="0"
                        required
                      ></input>
                    </div>
                  </div>
                </div>
              </div>

              <div className="second-div">
                <button type="submit" className="submit-card">
                  New card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCards;
