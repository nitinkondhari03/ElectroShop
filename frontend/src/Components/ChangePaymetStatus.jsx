import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangePaymetStatus = ({
  shipping_status,
  orderId,
  onClose,
  callFunc,
}) => {
  console.log(shipping_status);
  const [shippingstatus, setshippingstatus] = useState(shipping_status);

  const handleOnChangeSelect = (e) => {
    setshippingstatus(e.target.value);
    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    console.log(SummaryApi.updateOrderstatus.url);
    console.log(orderId);
    console.log(shippingstatus);
    const fetchResponse = await fetch(SummaryApi.updateOrderstatus.url, {
      method:"PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        shipping_status: shippingstatus,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Shipping Status </h1>

        {shipping_status == "Ordered" && (
          <div className="flex items-center justify-around my-4">
            <p>Change Status :</p>

            <select
              className="border px-4 py-1"
              value={shippingstatus}
              onChange={handleOnChangeSelect}
            >
              <option value="Ordered">Ordered</option>
              <option value="Shipped">Shipped</option>
            </select>
          </div>
        )}
        {shipping_status == "Shipped" && (
          <div className="flex items-center justify-around my-4">
            <p>Change Status :</p>

            <select
              className="border px-4 py-1"
              value={shippingstatus}
              onChange={handleOnChangeSelect}
            >
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
            </select>
          </div>
        )}
        {shipping_status == "Out for delivery" && (
          <div className="flex items-center justify-around my-4">
            <p>Change Status :</p>

            <select
              className="border px-4 py-1"
              value={shippingstatus}
              onChange={handleOnChangeSelect}
            >
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        )}

        <button
          className="bg-cyan-800 text-white p-2 w-full rounded-lg hover:opacity-95 hover:bg-cyan-900 disabled:opacity-80"
          onClick={updateUserRole}
        >
          Change Shipping Status
        </button>
      </div>
    </div>
  );
};

export default ChangePaymetStatus;
