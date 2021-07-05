import React, { useState } from "react";
import "./ProductsPage.scss";

// COMPONENTS
import ProductsCards from "../cards/ProductsCards";
import AdminCards from "../cards/AdminCards";

// REDUX
import { useSelector } from "react-redux";

const ProductsPage = (props) => {
  const products = useSelector((state) => state.products.products);
  const filteredProd = useSelector((state) => state.products.filteredProd);

  let product;
  if (filteredProd !== undefined) {
    product = filteredProd;
  } else {
    product = products;
  }

  const user = useSelector(({ auth }) => auth.user);

  const [newProductModal, setNewProductModal] = useState(false);
  const [newProductInfo, setNewProductInfo] = useState({
    category: "",
    subcategory: "",
    name: "",
    price: "",
    stock: "",
    image: "",
  });
  const [showFilterContainer, setShowFilterContainer] = useState(false);
  const [viewFilter, setViewFilter] = useState(false);

  const chooseCategory = product.filter((product) =>
    product.category.includes(props.match.params.category)
  );

  const chooseSubCategory = chooseCategory.map(
    (product) => product.sub_category
  );
  const elimSubCat = [...new Set(chooseSubCategory)];

  return (
    <div className="products-container">
      <div className="category-title">
        <h3>{props.match.params.category}</h3>
      </div>

      <div className="products-subcat">
        {elimSubCat.length !== 0 ? (
          elimSubCat.map((subCat, i) => (
            <div id={subCat} key={i}>
              <h4>{subCat}</h4>
              <hr></hr>
              <div
                className={
                  !viewFilter ? "products-sections1" : "products-sections2"
                }
              >
                {chooseCategory
                  .filter((prod) => prod.sub_category === subCat)
                  .map((item, i) => (
                    <div id={item.ID} key={item.ID}>
                      <ProductsCards key={i} product={item} view={viewFilter} />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <h4>Sorry but no matching products were found</h4>
        )}
      </div>

      {user !== null ? (
        user.role === "admin" ? (
          <div>
            <AdminCards
              setNewProductModal={setNewProductModal}
              newProductModal={newProductModal}
              newProductInfo={newProductInfo}
              setNewProductInfo={setNewProductInfo}
            />
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductsPage;
