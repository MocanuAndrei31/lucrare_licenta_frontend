import React, { useState } from "react";
import "../ChooseVoucher.scss";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { handleVoucher } from "../../../../store/actions/profileActions";

const VoucherLayout = ({ voucher, points, id }) => {
  // console.log("USER ID", id)
  // console.log("USER POINTS", points)
  const dispatch = useDispatch();
  const [createVoucher, setCreateVoucher] = useState(false);

  const handleActions = () => {
    dispatch(handleVoucher(voucher.value, id, points, voucher.pt));
    setCreateVoucher(true);
    setTimeout(() => setCreateVoucher(false), 3000);
  };

  return (
    <div className={voucher.pt < points ? null : "inactive"}>
      <h3>Coupon {voucher.value} €</h3>
      {/* <h3>{voucher.value} €</h3> */}
      {voucher.pt < points ? (
        <button
          className={!createVoucher ? null : "active"}
          onClick={!createVoucher ? handleActions : null}
        >
          {!createVoucher ? `${voucher.pt} points` : "Create"}
        </button>
      ) : (
        <button className="disabled">{voucher.pt} points</button>
      )}
    </div>
  );
};

export default VoucherLayout;
