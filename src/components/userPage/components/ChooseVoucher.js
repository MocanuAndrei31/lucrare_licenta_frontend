import React from "react";
import "./ChooseVoucher.scss";

//MIDDLEWARES
import VoucherLayout from "./middlewares/VoucherLayout";

// 50 pt = 5€, 100pt = 15€, 200pt = 20€, 300pt= 30€ 400pt = 40€, 500pt= 50€
const vouchers = [
  {
    pt: 150,
    value: 5,
  },
  {
    pt: 300,
    value: 15,
  },
  {
    pt: 600,
    value: 20,
  },
  {
    pt: 900,
    value: 30,
  },
  {
    pt: 1200,
    value: 40,
  },
  {
    pt: 1500,
    value: 50,
  },
];

const ChooseVoucher = ({ points, id }) => {
  return (
    <div className="chooseVoucher-container">
      <h4>Transform your points into vouchers:</h4>

      <div className="voucher-container">
        {points !== undefined &&
          vouchers.map((voucher, i) => (
            <VoucherLayout key={i} voucher={voucher} points={points} id={id} />
          ))}
      </div>
    </div>
  );
};

export default ChooseVoucher;
