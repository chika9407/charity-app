import React, { useState, useEffect } from "react";

import PayPal from "./Paypal";

export default function CheckOutForm() {
  const [checkout, setCheckOut] = useState(false);
  const [amount, setAmount] = useState(5);

  const increase = () => {
    setAmount(amount + 5);
  };

  const decrease = () => {
    amount > 5 ? setAmount(amount - 5) : setAmount(amount);
  };

  return (
    <div className="container-sm text-center w-50 mt-5">
      {checkout ? (
        <div className="card mt-3 border border-warning">
          <h5 className="card-header">
            Choose your payment method for {amount} €
          </h5>
          <div className=" card-body ">
            <h5 className=" card-title "> Thank you for your donation !</h5>
            <PayPal price={amount} />
          </div>
        </div>
      ) : (
        <div className="card text-center mt-3 border border-warning">
          <h5 className=" card-header">
            How much would you like to donate : *demo*
          </h5>
          <div className="card-body">
            <div className=" card-title h4 font-weight-bold">
              {amount} €
              <button
                className="ml-3 btn btn-outline-success"
                onClick={increase}
              >
                ∆
              </button>
              <button
                className=" ml-2 btn btn-outline-secondary"
                onClick={decrease}
              >
                ∇
              </button>
            </div>
            <button
              className="btn btn-danger mt-2"
              onClick={() => {
                setCheckOut(true);
              }}
            >
              Donate!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
