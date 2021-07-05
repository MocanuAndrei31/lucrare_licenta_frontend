import React, { useEffect, useState } from "react";
import "./DisplayVouchers.scss";

// REDUX
import { useSelector } from "react-redux";

const DisplayDiscounts = () => {
  const vouchers = useSelector((state) => state.products.userVouchers);
  const [voucherFilter, setVoucherFilter] = useState();

  useEffect(() => {
    let voucherFilter;
    if (vouchers !== undefined) {
      voucherFilter = vouchers.filter((voucher) => voucher.discount !== 0);
    }
    setVoucherFilter(voucherFilter);
  }, [vouchers]);

  return (
    <div className="displayVouchers-container">
      <h3>Disponible codes:</h3>
      {voucherFilter !== undefined &&
        voucherFilter.map((voucher, i) => (
          <div key={i}>
            <h4>{voucher.cod}</h4>
            <h4>{voucher.discount} %</h4>
          </div>
        ))}
    </div>
  );
};

export default DisplayDiscounts;
