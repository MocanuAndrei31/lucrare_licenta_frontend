import React, { useEffect, useState } from "react";
import "./DisplayVouchers.scss";

// REDUX
import { useSelector } from "react-redux";

const DisplayVouchers = () => {
  const vouchers = useSelector((state) => state.products.userVouchers);
  const [voucherFilter, setVoucherFilter] = useState();

  useEffect(() => {
    let voucherFilter;
    if (vouchers !== undefined) {
      voucherFilter = vouchers.filter((voucher) => voucher.val_voucher !== 0);
    }
    setVoucherFilter(voucherFilter);
  }, [vouchers]);

  return (
    <div className="displayVouchers-container">
      <h3>Discount codes:</h3>
      {voucherFilter !== undefined &&
        voucherFilter.map((voucher, i) => (
          <div key={i}>
            <h4>{voucher.cod}</h4>
            <h4>€ {voucher.val_voucher}</h4>
          </div>
        ))}
    </div>
  );
};

export default DisplayVouchers;
