import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { load } from "@cashfreepayments/cashfree-js";
import SummaryApi from "../common";
const PaymentMethod = ({
  onClose,
  handleordercashondelivery,
  handlePaymentverify,
}) => {
  const [payments, setpayments] = useState("");
  let orderids;
  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };
  initializeSDK();
  const getSessionId = async () => {
    console.log("getSessionId")
    try {
      const response = await fetch(SummaryApi.payments.url, {
        method: SummaryApi.payments.method,
        credentials: "include",
      });

      const res = await response.json();
      console.log(`res ${res}`)
      if (res && res.payment_session_id) {
        orderids = res.order_id;
        console.log(orderids)
        return res.payment_session_id;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (payments == "Cash On Delivery") {
      handleordercashondelivery();
      onClose();
      return;
    }
    try {
      let sessionId = await getSessionId();
      console.log(`sessionId ${sessionId}`)
      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };
      cashfree.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          console.log(
            "User has closed the popup or there is some payment error, Check for Payment Status"
          );
          console.log(result.error);
        }
        if (result.redirect) {
          console.log("Payment will be redirected");
        }
        if (result.paymentDetails) {
          console.log("Payment has been completed, Check for Payment Status");
          console.log(result.paymentDetails.paymentMessage);
          console.log(result);
          handlePaymentverify(orderids);
          
          onClose();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlepaymentsChange = (e) => {
    setpayments(e.target.value);
  };
  return (
    <div className="fixed w-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl  max-h-[80%] overflow-hidden">
        <div
          className="w-fit ml-auto text-2xl cursor-pointer"
          onClick={onClose}
        >
          <CgClose />
        </div>
        <div className="text-2xl text-center">
          <h1 className="font-bold text-green-800">Select Payment Method</h1>
        </div>

        <form className="grid p-10 gap-6  pb-5" onSubmit={handleSubmit}>
          <label
            className={
              payments == "Cash On Delivery"
                ? "p-2 bg-slate-100 border rounded border-green-800 text-lg font-semibold"
                : "p-2 bg-slate-100 border rounded text-lg font-semibold"
            }
          >
            <input
              type="radio"
              name="payments"
              value="Cash On Delivery"
              checked={payments === "Cash On Delivery"}
              onChange={handlepaymentsChange}
              className="text-green-800"
            />
            {"  "}Cash On Delivery
          </label>
          <label
            className={
              payments == "Other Payment Method"
                ? "p-2 bg-slate-100 border rounded border-green-800 text-lg font-semibold"
                : "p-2 bg-slate-100 border rounded text-lg font-semibold"
            }
          >
            <input
              type="radio"
              name="payments"
              value="Other Payment Method"
              checked={payments === "Other Payment Method"}
              onChange={handlepaymentsChange}
              className="text-green-800"
            />
            {"  "}Other Payment Method
          </label>

          <button className=" bg-cyan-800 text-white mt-3 hover:bg-cyan-900 p-4">
            Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
