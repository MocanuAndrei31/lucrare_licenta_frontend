import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Style.scss";

// STRIPE
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { stripePayment } from "../../../../store/actions/stripeActions";
import { outOfStock, clearCart } from "../../../../store/actions/cartActions";
import { handleOrder } from "../../../../store/actions/orderActions";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      color: "#606975",
      fontWeight: 500,
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#606975",
      },
      "::placeholder": {
        color: "#606975ab",
        fontSize: "12px",
      },
    },
    invalid: {
      iconColor: "#e02b2b",
      color: "#e02b2b",
    },
    complete: {
      iconColor: "#e02b2b",
      color: "#e02b2b",
    },
  },
  hidePostalCode: true,
};

const CardField = ({ onChange }) => (
  <div className="FormRow-Card">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#e02b2b"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#fff"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const CheckoutForm = ({ price, cartItems, discount }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
  });
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const clientSecret = useSelector((state) => state.products.stripeSecret);

  useEffect(() => {
    dispatch(stripePayment(price));
  }, [price, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe
      .createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      })

      .then(async (pay) => {
        if (!pay) {
          setPaymentSucceeded(true);
          throw new Error();
        } else {
          try {
            const confirmedCardPayment = await stripe.confirmCardPayment(
              clientSecret,
              {
                payment_method: pay.paymentMethod.id,
              }
            );
            // console.log('confirmedCardPayment',confirmedCardPayment)
            if (confirmedCardPayment.paymentIntent.status === "succeeded") {
              dispatch(handleOrder(price, discount))
                .then(async (order) => {
                  dispatch(outOfStock(cartItems));
                  dispatch(clearCart());
                  // window.location.replace("/Pay/successPage");
                  history.push("/Pay/successPage");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      });

    setProcessing(false);
  };

  return paymentSucceeded ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Something went wrong!
      </div>
      <div className="ResultMessage">
        The transaction failed. Let's try again.
      </div>
    </div>
  ) : (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <Field
          label="First name and last name:"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Enter your email:"
          id="email"
          type="email"
          placeholder="janedoe@gmail.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
      </fieldset>

      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>

      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Pay € {price}
      </SubmitButton>
    </form>
  );
};

export default CheckoutForm;
