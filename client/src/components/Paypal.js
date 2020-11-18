import React, { useRef, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";

export default function Paypal(props) {
  const paypal = useRef();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Donate to this charity",
                amount: {
                  currency_code: "EUR",
                  value: props.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          setSuccess(true);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  if (success) {
    console.log("Redirect");
    return <Redirect to="/favorite" />;
  } else {
    return (
      <div>
        <div ref={paypal}></div>
      </div>
    );
  }
}
