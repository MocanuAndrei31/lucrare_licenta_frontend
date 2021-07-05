import React, { useState } from "react";
import "../CartSummary.scss";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { checkDisocunt } from "../../../../../store/actions/cartActions";

const CheckDiscount = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [forDiscount, setForDiscount] = useState({
    discountCod: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkDisocunt(forDiscount, user.ID));
    // setForDiscount({
    //     ...forDiscount,
    //     discountCod: ''
    // })
  };

  return (
    <form className="discount-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="text"
        name="text"
        placeholder="Insert the discount code"
        value={forDiscount.discountCod}
        onChange={(e) =>
          setForDiscount({
            ...forDiscount,
            discountCod: e.target.value,
          })
        }
        maxLength="50"
        required
      />
      <button type="submit">Check</button>
    </form>
  );
};
export default CheckDiscount;
