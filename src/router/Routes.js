import React, { memo, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { NonPrivateRoute, PrivateRoute } from "./Utils";

// PAGES
import Login from "../pages/auth/signIn/SignIn";
import Register from "../pages/auth/register/Register";
import ContentPage from "../components/contentPage/ContentPage";
import UserPage from "../components/userPage/UserPage";
import ContactPage from "../components/contactPage/ContactPage";
import ProductsPage from "../components/productsPage/ProductsPage";
import Cart from "../components/cart/Cart";
import FormToCheckout from "../components/cart/components/formToCheckout/FormToCheckout";
import AdminPage from "../components/adminPage/AdminPage";
import SuccessPage from "../layout/successPage/SuccessPage";
import ProductDetails from "../components/productsPage/productDetails/ProductDetails";

// LAYOUT
import SideBar from "../layout/sideBar/Sidebar";
import Footer from "../layout/footer/Footer";

// REDUX
import { useSelector } from "react-redux";
import NavBarComplete from "../components/navBar/NavBarComplete";

const Routes = memo(function Routes() {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <Switch>
      <NonPrivateRoute path="/SignIn" exact>
        <SideBar />
        <NavBarComplete />
        <Login />
        <Footer />
      </NonPrivateRoute>

      <NonPrivateRoute path="/Register" exact>
        <SideBar />
        <NavBarComplete />
        <Register />
        <Footer />
      </NonPrivateRoute>

      <Route>
        <SideBar />
        <NavBarComplete />

        <Switch>
          <Route exact path="/" component={ContentPage} />
          <Route exact path="/ContactPage" component={ContactPage} />

          <Route
            exact
            path="/:category"
            render={(props) => (
              <ProductsPage {...props} category={props.match.params} />
            )}
          />
          <Route
            exact
            path="/Details/product"
            render={(props) => (
              <ProductDetails {...props} product={props.location.state} />
            )}
          />
          <Route exact path="/Cart/user-cart" component={Cart} />
          <Route exact path="/Pay/successPage" component={SuccessPage} />
          <Route exact path="/checkout/pay" component={FormToCheckout} />

          <PrivateRoute path="/User/user-page">
            {user !== null && user.role === "admin" ? (
              <AdminPage />
            ) : (
              <UserPage />
            )}
          </PrivateRoute>
        </Switch>

        <Footer />
      </Route>

      <Route path="*">
        <div>404</div>
      </Route>
    </Switch>
  );
});

export default Routes;
