import React, { useState } from "react";
import "./EditUserInfo.scss";

// REDUX
import { useDispatch } from "react-redux";
import {
  editName,
  editLastName,
  editEmail,
  editPhoneNumber,
} from "../../store/actions/userActions";

const EditUserInfo = ({ isAuthentificated, user, setEditInfoModal }) => {
  const [editUserName, setEditUserName] = useState("");
  const [editUserLastName, setEditUserLastName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [editUserPhone, setEditUserPhone] = useState("");

  const dispatch = useDispatch();
  const handleEditName = () => {
    if (editUserName !== "") {
      dispatch(editName({ name: editUserName, id: user.ID }));
      setEditUserName("");
    }
  };

  const handleEditLastName = () => {
    if (editUserLastName !== "") {
      dispatch(editLastName({ last_name: editUserLastName, id: user.ID }));
      setEditUserLastName("");
    }
  };

  const checkForValidEmail = (editUserEmail) => {
    var isValidEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (editUserEmail.match(isValidEmail)) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditEmail = () => {
    if (checkForValidEmail(editUserEmail) === true) {
      dispatch(editEmail({ email: editUserEmail, id: user.ID }));
      setEditUserEmail("");
    }
  };

  const handleEditPhone = () => {
    if (editUserPhone !== "") {
      dispatch(editPhoneNumber({ phone_number: editUserPhone, id: user.ID }));
      setEditUserPhone("");
    }
  };

  return (
    <div className="edit-user-info-container">
      <div className="edit-user-info-modal">
        <div className="close-modal">
          <i
            onClick={() => setEditInfoModal(false)}
            className="fas fa-times"
          ></i>
        </div>

        <h3>Edit Info</h3>

        <div className="edit-info">
          <div style={{ display: "flex", marginTop: "20px" }}>
            <label htmlFor="fullname">First Name</label>
            <input
              type="text"
              name="name"
              value={editUserName.name}
              onChange={(e) => setEditUserName(e.target.value)}
              placeholder={
                isAuthentificated === true ? `${user.name} ` : "Loading"
              }
            />
            <button onClick={handleEditName}>Change</button>
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <label htmlFor="fullname">Last Name</label>
            <input
              type="text"
              name="name"
              value={editUserLastName}
              onChange={(e) => setEditUserLastName(e.target.value)}
              placeholder={
                isAuthentificated === true ? `${user.last_name}` : "Loading"
              }
            />
            <button onClick={handleEditLastName}>Change</button>
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={editUserEmail}
              onChange={(e) => setEditUserEmail(e.target.value)}
              placeholder={isAuthentificated === true ? user.email : "Loading"}
            />
            <button onClick={handleEditEmail}>Change</button>
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <label htmlFor="phone">Phone</label>
            <input
              type="email"
              name="phone"
              value={editUserPhone}
              onChange={(e) => setEditUserPhone(e.target.value)}
              placeholder={
                isAuthentificated === true ? user.phone_number : "Loading"
              }
            />
            <button onClick={handleEditPhone}>Change</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;
