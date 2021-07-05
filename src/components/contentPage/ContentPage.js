import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./ContentPage.scss";

// ASSETS
import Img from "../../assets/bg3.jpg";
import loadingGif from "../../assets/loadingGif.gif";

// COMPONENTS
import ProductsCards from "../cards/ProductsCards";
import MainText from "../mainText/MainText";
import AdminCards from "../cards/AdminCards";
import CarouselPromo from "../../layout/carouselPromo/CarouselPromo";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { fetchMostPopularProd } from "../../store/actions/productsActions";

const ContentPage = () => {
  const [newProductModal, setNewProductModal] = useState(false);
  const [newProductInfo, setNewProductInfo] = useState({
    category: "",
    subcategory: "",
    name: "",
    price: "",
    stock: "",
    image: "",
  });

  const [viewFilter, setViewFilter] = useState(false);

  const user = useSelector(({ auth }) => auth.user);
  const products = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.products.cartItems);
  let cartItems;
  JSON.parse(localStorage.getItem("cartItems"))
    ? (cartItems = JSON.parse(localStorage.getItem("cartItems")))
    : (cartItems = cart);

  const theBest = useSelector((state) => state.products.fetchMostPopular);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMostPopularProd());
  }, [dispatch]);

  return (
    <div className="content-page-container">
      <div className="landing-page">
        <div className="landing-page-text">
          <MainText />
        </div>

        <div className="landing-img">
          <img src={Img} alt="landing-img"></img>
        </div>
      </div>
      <div className="limiter"></div>
      <div className="carousel-promo-view1">
        <CarouselPromo />
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

      <div className="carousel-promo-view2">
        <CarouselPromo />
      </div>

      <div className="main-content">
        {products.length > 0 ? (
          theBest !== undefined ? (
            <div>
              <div className="sections-popular"> Most popular </div>

              <div className="view-filter">
                <i
                  className={!viewFilter ? "fas fa-list activ" : "fas fa-list"}
                  onClick={() => setViewFilter(false)}
                ></i>
                <i
                  className={
                    viewFilter ? "fas fa-th-large activ" : "fas fa-th-large "
                  }
                  onClick={() => setViewFilter(true)}
                ></i>
              </div>

              <div className="main-container-sections">
                <div
                  className={
                    !viewFilter
                      ? "sections-containers1"
                      : "sections-containers2"
                  }
                >
                  {theBest.map((product, i) => (
                    <ProductsCards
                      key={i}
                      product={product}
                      view={viewFilter}
                    />
                  ))}
                </div>
              </div>

              <div className="sections-best-sellers"> Best selling </div>
              <div className="main-container-sections">
                <div
                  className={
                    !viewFilter
                      ? "sections-containers1"
                      : "sections-containers2"
                  }
                >
                  {theBest
                    .map((product, i) => (
                      <ProductsCards
                        key={product.ID}
                        product={product}
                        view={viewFilter}
                        key={i}
                      />
                    ))
                    .reverse()}
                </div>
              </div>
            </div>
          ) : (
            <div className="loading">
              <img src={loadingGif} alt="Loading" />
            </div>
          )
        ) : (
          <div className="loading">
            <img src={loadingGif} alt="Loading" />
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(ContentPage);
