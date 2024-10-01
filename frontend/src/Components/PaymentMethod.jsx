import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { load } from "@cashfreepayments/cashfree-js";
import SummaryApi from "../common";
import LoadingButton from "./LoadingButton";
import { useSelector } from "react-redux";
const PaymentMethod = ({
  onClose,
  handleordercashondelivery,
  handlePaymentverify,
  totalPrice,
  phoneNos,
}) => {
  const { user } = useSelector((state) => state?.user);
  const [isLoading, setisLoading] = useState(false);
  const [payments, setpayments] = useState("");
  let orderids;
  let cashfree;
  console.log(totalPrice, phoneNos);
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };
  initializeSDK();
  let price = totalPrice;
  let phone = phoneNos;
  const getSessionId = async () => {
    let data = {
      id: user._id,
      email: user.email,
      name: user.name,
      totalPrice: price,
      phoneNo: phone,
    };
    console.log(data);
    try {
      const response = await fetch(SummaryApi.payments.url, {
        method: SummaryApi.payments.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if (res && res.payment_session_id) {
        orderids = res.order_id;
        return res.payment_session_id;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();
    if (payments == "Cash On Delivery") {
      handleordercashondelivery();
      setisLoading(false);
      onClose();
      return;
    }
    try {
      let sessionId = await getSessionId();
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
          setisLoading(false);
        }
        if (result.redirect) {
          console.log("Payment will be redirected");
          setisLoading(false);
        }
        if (result.paymentDetails) {
          console.log("Payment has been completed, Check for Payment Status");
          console.log(result.paymentDetails.paymentMessage);
          console.log(result);
          handlePaymentverify(orderids);
          setisLoading(false);
          onClose();
        }
      });
    } catch (error) {
      setisLoading(false);
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
          <h1 className="font-bold text-lg text-green-800">
            Select Payment Method
          </h1>
        </div>

        <form className="grid p-10 gap-6 text-sm  pb-5" onSubmit={handleSubmit}>
          <label
            className={
              payments == "Cash On Delivery"
                ? "p-2 bg-slate-100 border rounded border-green-800 text-sm font-semibold"
                : "p-2 bg-slate-100 border rounded text-sm font-semibold"
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
                ? "p-2 bg-slate-100 border rounded border-green-800 text-sm font-semibold"
                : "p-2 bg-slate-100 border rounded text-sm font-semibold"
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
          </label>{" "}
          {isLoading ? (
            <LoadingButton />
          ) : (
            <button className="bg-cyan-800 text-white mt-3 hover:bg-cyan-900 p-2">
              Payment
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
