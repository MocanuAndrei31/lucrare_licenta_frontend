import axios from 'axios';

export const stripePayment = (price) => (dispatch) => {
  // console.log("price stripe", price, "type of price", typeof price);
  const amount = {
    price: ((price * 100).toFixed(2)) * 1
  }
  // console.log('Stripe REEDUX PRICE', price)
  // console.log('Stripe REEDUX AMOUNT', amount)
  axios
    .post(
      `${process.env.REACT_APP_URL_BACKEND}/stripe/stripePayment`, amount)

    .then((result) => {
      // console.log("STRIPE RES", result)
      dispatch({
        type: 'STRIPE_SECRET',
        payload: result.data,
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

