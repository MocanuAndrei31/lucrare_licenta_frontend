import React, { useState } from "react";
import "./map/map.scss";
import { withRouter } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { sendUserMsg } from "../../store/actions/adminActions";

// ASSETS
import SimpleMap from "./map/googleMap";

const ContactPage = () => {
  const dispatch = useDispatch();
  const contactMsg = useSelector((state) => state.products.contactMsg);

  const [contactUs, setContactUs] = useState({
    name: "",
    email: "",
    msg: "",
  });

  const submitContactForm = (e) => {
    e.preventDefault();
    dispatch(sendUserMsg(contactUs));
    setContactUs({
      name: "",
      email: "",
      msg: "",
    });
  };

  return (
    <div className="contact">
      <div className="text-main">
        <div className="map-container">
          <SimpleMap />
        </div>
        <div className="big">
          <h2>How to contact us?</h2>
        </div>
        <div className="social-info">
          <div className="social-btn2">
            <a
              href="https://www.facebook.com/TransformYourBusinessOfficial/"
              rel="noopener noreferrer"
              target="_blank"
              className="simple-social-btn2"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=0040733210904&text=Hi"
              rel="noopener noreferrer"
              target="_blank"
              className="simple-social-btn7"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
        <div className="contact-info">
          <h2>Or you could send us a message:</h2>
          <p>tyb.administrator@gmail.com</p>
        </div>

        <form onSubmit={submitContactForm}>
          <div className="form-items">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactUs.firstName}
                onChange={(e) =>
                  setContactUs({ ...contactUs, name: e.target.value })
                }
                maxLength="50"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactUs.email}
                onChange={(e) =>
                  setContactUs({ ...contactUs, email: e.target.value })
                }
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="message">Message</label>
              <textarea
                name="Message"
                id="msg"
                name="msg"
                value={contactUs.msg}
                onChange={(e) =>
                  setContactUs({ ...contactUs, msg: e.target.value })
                }
                required
              />
            </div>

            {contactMsg !== undefined && (
              <div className="contactUs-msg">{contactMsg}!</div>
            )}
            <button type="submit">Contact us </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(ContactPage);
