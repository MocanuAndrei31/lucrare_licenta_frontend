import React from "react";
import "./AdminCards.scss";

const EditCard = ({
  setEditProductModal,
  editProductModal,
  editProductInfo,
  setEditProductInfo,
  handleSubmitEditProduct,
}) => {
  return (
    <>
      {editProductModal && (
        <div id="editModal" className="admin-modal-container">
          <div className="admin-modal-content">
            <div className="close-edit-modal">
              <i
                onClick={() => setEditProductModal(false)}
                className="fas fa-times"
              ></i>
            </div>

            <form
              className="admin-form-container"
              onSubmit={handleSubmitEditProduct}
            >
              <div className="edit-first-div">
                <div className="edit-inputs-div">
                  {/*NAME*/}
                  <div className="all-inputs-containers">
                    <div className="all-labels">Name:</div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={editProductInfo.name}
                      onChange={(e) =>
                        setEditProductInfo({
                          ...editProductInfo,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter the name of the product"
                      autoComplete="off"
                      required
                    ></input>
                  </div>

                  {/*CATEGORY*/}
                  <div className="all-inputs-containers">
                    <div className="all-labels">Category:</div>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={editProductInfo.category}
                      onChange={(e) =>
                        setEditProductInfo({
                          ...editProductInfo,
                          category: e.target.value,
                        })
                      }
                      placeholder="The category is..."
                      autoComplete="off"
                      required
                    ></input>
                  </div>

                  {/*SUBCATEGORY*/}
                  <div className="all-inputs-containers">
                    <div className="all-labels">Subcategory:</div>
                    <input
                      type="text"
                      name="subcategory"
                      id="subcategory"
                      value={editProductInfo.subcategory}
                      onChange={(e) =>
                        setEditProductInfo({
                          ...editProductInfo,
                          subcategory: e.target.value,
                        })
                      }
                      placeholder="The type is"
                      autoComplete="off"
                      required
                    ></input>
                  </div>

                  {/*PRICE*/}
                  <div className="number-container">
                    <div className="all-num-labels">Price/pc:</div>
                    <div className="all-num">
                      <span>&#8364;</span>
                      <input
                        type="number"
                        step="any"
                        id="price"
                        name="price"
                        value={editProductInfo.price}
                        onChange={(e) =>
                          setEditProductInfo({
                            ...editProductInfo,
                            price: e.target.value,
                          })
                        }
                        placeholder="00.00"
                        required
                      ></input>
                    </div>
                  </div>

                  {/* DISCOUNT */}
                  <div className="number-container">
                    <div className="all-num-labels">Discounted price:</div>
                    <div className="all-num">
                      <span>&#8364;</span>
                      <input
                        type="number"
                        step="any"
                        id="discount"
                        name="discount"
                        value={editProductInfo.discount}
                        onChange={(e) =>
                          setEditProductInfo({
                            ...editProductInfo,
                            discount: e.target.value,
                          })
                        }
                        placeholder="00.00"
                      ></input>
                    </div>
                  </div>

                  {/*STOCK*/}
                  <div className="number-container">
                    <div className="all-num-labels">Stock:</div>
                    <div className="all-num">
                      <input
                        type="number"
                        step="any"
                        id="stock"
                        name="stock"
                        value={editProductInfo.stock}
                        onChange={(e) =>
                          setEditProductInfo({
                            ...editProductInfo,
                            stock: e.target.value,
                          })
                        }
                        placeholder="0"
                        required
                      ></input>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="all-inputs-containers">
                    <div className="all-labels">Description:</div>
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      rows="2"
                      value={editProductInfo.description}
                      onChange={(e) =>
                        setEditProductInfo({
                          ...editProductInfo,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description of the product"
                      autoComplete="off"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="edit-second-div">
                <button type="submit" className="submit-card">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCard;
