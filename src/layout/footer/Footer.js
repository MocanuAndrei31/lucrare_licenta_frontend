import React, { useEffect } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { Helmet } from "react-helmet";

// ASSETS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="grid-layout">
          <div className="social">
            <div className="head-text">Contact Us!</div>
            <div className="splitter">
              <hr></hr>
            </div>
            <div className="customer-care">Customer Service:</div>
            <div className="footer-text">
              <p>tyb.administrator@gmail.com</p>
            </div>
            <div className="social-text">Find us on socials:</div>

            <div className="social-btn">
              <a
                href="https://www.facebook.com/TransformYourBusinessOfficial/"
                rel="noopener noreferrer"
                target="_blank"
                className="simple-social-btn1"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <br></br>
              <a
                href="https://api.whatsapp.com/send?phone=0040733210904&text=Hi"
                rel="noopener noreferrer"
                target="_blank"
                className="simple-social-btn6"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <br></br>
            </div>
          </div>
          <div className="idrink">
            <div className="head-text">Shortcuts</div>
            <div className="splitter">
              <hr></hr>
            </div>
            <div className="links">
              <li className="sidebar-link">
                <Link to="/">Home</Link>
              </li>
              <li className="sidebar-link">
                <Link to="/ContactPage">Contact</Link>
              </li>
            </div>
          </div>
        </div>

        <div className="spliter">
          <hr></hr>
        </div>

        <div className="rights">© 2021, Transform Your Business S.R.L.</div>
      </div>
    </div>
  );
};

export default Footer;
