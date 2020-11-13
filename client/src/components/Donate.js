import React, { useState } from "react";
import PayPal from "./Paypal";

function CheckOutForm() {
  const [checkout, setCheckOut] = useState(false);

  return (
    <div className="container-sm text-center w-50 mt-5">
      {checkout ? (
        <div className="card mt-3 border border-warning">
          <h5 className="card-header">Choose your payment method</h5>
          <div className="card-body">
            <PayPal />
          </div>
        </div>
      ) : (
        <div className="container text-center mt-5">
          <h5 className="text-white">Charity + user info?</h5>
          <button
            onClick={() => {
              setCheckOut(true);
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CheckOutForm;
