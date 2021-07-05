import React, { memo } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// Redirect to the login page if the user is not logged in and goes to a NonPrivateRoute
export const PrivateRoute = memo(function PrivateRoute({ children, ...rest }) {
  const isAuthentificated = useSelector(({ auth }) => auth.isAuthentificated);

  return (
    <Route
      {...rest}
      render={() => {
        if (!isAuthentificated) {
          return <Redirect to="/SignIn" />;
        }

        return children;
      }}
    />
  );
});

export const NonPrivateRoute = memo(function NonPrivateRoute({
  children,
  ...rest
}) {
  const isAuthentificated = useSelector(({ auth }) => auth.isAuthentificated);

  return (
    <Route
      {...rest}
      render={() => {
        if (isAuthentificated) {
          return <Redirect to="/" />;
        }
        return children;
      }}
    />
  );
});

export const CartUndefined = memo(function CartUndefined({
  children,
  ...rest
}) {
  const cart = useSelector((state) => state.products.cartItems);
  let cartItems;
  cart === undefined
    ? (cartItems = JSON.parse(localStorage.getItem("cartItems")))
    : (cartItems = cart);

  return (
    <Route
      {...rest}
      render={() => {
        if (cartItems === undefined || cartItems === null) {
          return <Redirect to="/Pay/successPage" />;
        }

        return children;
      }}
    />
  );
});
