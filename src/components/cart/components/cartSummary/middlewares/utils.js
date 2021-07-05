export const calcSum = (sum) => {
  let calc = 0;
  calc = sum;

  return calc;
};

export const calcDiscountSum = (sum, discount) => {
  let calc = 0;
  let err = "";

  if (discount.val_voucher !== 0) {
    calc = sum - discount.val_voucher;
  } else if (discount.discount !== 0) {
    calc = sum - sum * (discount.discount / 100);
  }

  return [calc, err];
};
