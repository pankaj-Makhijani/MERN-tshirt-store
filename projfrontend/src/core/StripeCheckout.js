import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from "../backend";
import { StripePublishableKey } from "../backend"
import { StripeSecretKey } from "../backend"

import { createOrder } from "./helper/OrderHelper"

const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,products
    }
    const headers = {
      "Content-Type":"application/json"
    }
    return fetch(`$[API]/stripepayment`, {
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then(response => {
        console.log(response)
        //call further methods
    }).catch(error => console.log(error))
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
      stripeKey={StripePublishableKey}
      token={makePayment}
      amount={getFinalAmount()*100}
      name="Buy T-shirts"
      shippingAddress
      billingAddress>
      <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      <h5 className="text-white">stripe testing card details Card: Visa, No: 4242 4242 4242 4242, CVV: Random 3 digits, Date: Any future date</h5>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
