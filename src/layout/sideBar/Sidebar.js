import React, { useState, useEffect } from "react";
import "./SideBar.scss";
import { HashLink as Link } from "react-router-hash-link";

// MIDDLEWARES
import Category from "./middlewares/Category";
import SideBarSearch from "./middlewares/SideBarSearch";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/authActions";
import { handleSideBar } from "../../store/actions/userActions";

const SideBar = () => {
  const auth = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products.products);
  const open = useSelector((state) => state.products.openSideBar);

  const [category, setCategories] = useState(null);
  const [closeSideBar] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let category = products.map((product) => product.category).sort();
    let removeDuplicates = [...new Set(category)];
    setCategories(removeDuplicates);
  }, [products]);

  const handleCloseSideBar = () => {
    dispatch(handleSideBar(closeSideBar));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(handleSideBar(closeSideBar));
  };

  return (
    <div className={open ? "open-sidebar-container" : null}>
      <div className={open ? "open-sidebar-content" : "sidebar-content"}>
        <div className="search-bar">
          <SideBarSearch handleCloseSideBar={handleCloseSideBar} />
        </div>
        <div className="links-container">
          <ul className="body-links">
            <li className="individual-link">
              <Link to="/" onClick={handleCloseSideBar}>
                Home
              </Link>
            </li>

            <li className="links-products-container">
              <ul>
                {category !== null ? (
                  category.map((item, i) => (
                    <Category
                      key={i}
                      item={item}
                      handleCloseSideBar={handleCloseSideBar}
                    />
                  ))
                ) : (
                  <li className="dropdown-links">Loading...</li>
                )}
              </ul>
            </li>

            <li className="individual-link">
              <Link to="/ContactPage" onClick={handleCloseSideBar}>
                Contact
              </Link>
            </li>

            <li className="individual-link sidebar-profile">
              {auth.isAuthentificated === true && (
                <Link onClick={handleCloseSideBar} to="/User/user-page">
                  Profile
                </Link>
              )}
            </li>
          </ul>
        </div>

        {auth.isAuthentificated ? (
          <div className="sidebar-btn">
            <div className="sidebar-btnn">
              <Link onClick={handleLogout} to="#">
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <div className="sidebar-btn">
            <div className="sidebar-btnn">
              <Link onClick={handleCloseSideBar} to="/SignIn">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
