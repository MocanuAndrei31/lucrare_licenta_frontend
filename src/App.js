import React, { useEffect } from "react";
import "./App.css";
import loadingGif from ".//assets/loadingGif.gif";

import { withRouter } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./store/actions/productsActions";
import { fetchUser } from "./store/actions/authActions";

import Routes from "./router";

function App() {
  const isLoading = useSelector(({ auth }) => auth.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="main-container">
      {isLoading ? (
        <div className="loading">
          <img src={loadingGif} alt="Loading" />
        </div>
      ) : (
        <Routes />
      )}
    </div>
  );
}

export default withRouter(App);
