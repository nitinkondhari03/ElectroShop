import React from "react";
import { CgClose } from "react-icons/cg";
import { TiTick } from "react-icons/ti";
const TrackOrder = ({ item, onClose }) => {
  let x = item.createdAt;
  const date = new Date(x);
  console.log(x);
  const today = new Date();
  console.log(today);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
  console.log(formattedDate);
  return (
    <div className="fixed w-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl  max-h-[80%] overflow-hidden">
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <CgClose />
        </div>
        <div className="text-lg text-center mt-0">
          <h4 className="font-bold text-2xl">Track Order</h4>
        </div>
        <div className="pt-4">
          <div className="w-10 m-auto flex h-10 flex-row">
            <div className="border-4 border-black-500/100">
              <TiTick
                color="white"
                size={"33"}
                className="m-auto bg-green-600"
              />
            </div>
            <div className="ml-5 text-lg font-bold text-cyan-800">Ordered</div>
          </div>
          <div className="h-20 w-0.5 m-auto border-2 border-black-500/100"></div>
          <div className="w-10 m-auto flex h-10 flex-row">
            <div className="border-4 border-black-500/100">
              <TiTick color="white" size={"33"} className="" />
            </div>
            <div className="ml-5 text-lg font-bold text-cyan-800">Shipped</div>
          </div>
          <div className="h-20 w-0.5 m-auto border-2 border-black-500/100"></div>
          <div className="w-10 m-auto flex h-10 flex-row">
            <div className="border-4 border-black-500/100">
              <TiTick color="white" size={"33"} className="" />
            </div>
            <div className="ml-5 text-lg font-bold text-cyan-800">
              Out for delivery
            </div>
          </div>
          <div className="h-20 w-0.5 m-auto border-2 border-black-500/100"></div>
          <div className="w-10 m-auto flex h-10 flex-row">
            <div className="border-4 border-black-500/100">
              <TiTick color="white" size={"33"} className="" />
            </div>
            <div className="ml-5 text-lg font-bold text-cyan-800">
              Delivery Order
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
