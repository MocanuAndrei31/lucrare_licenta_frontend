import React, { memo } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import ScrollToTop from "./ScrollToTop";

const Router = memo(function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes />
    </BrowserRouter>
  );
});

export default Router;
