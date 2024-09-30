import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { CgClose } from "react-icons/cg";
import { TiTick } from "react-icons/ti";
const TrackOrder = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState("");
  const fetchProductDetails = async () => {
    const response = await fetch(SummaryApi.orderDetails.url, {
      method: SummaryApi.orderDetails.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        orderId: params?.id,
      }),
    });
    const dataReponse = await response.json();

    setData(dataReponse?.data);
    console.log(dataReponse?.data);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);
  const handleorder = () => {
    navigate("/order");
  };
  return (
    <div className="fixed w-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl  max-h-[80%] overflow-hidden">
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={handleorder}
        >
          <CgClose />
        </div>
        <div className="text-lg text-center mt-0">
          <h4 className="font-bold text-xl">Track Order</h4>
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
            <div className="ml-5 text-md font-bold text-cyan-800">Ordered</div>
          </div>
          {data?.shipping_status == "Shipped" ||
          data?.shipping_status == "Out for delivery" ||
          data?.shipping_status == "Delivered" ? (
            <div>
              <div className="h-20 w-0.5 m-auto border-2 border-green-500/100"></div>
              <div className="w-10 m-auto flex h-10 flex-row">
                <div className="border-4 border-black-500/100">
                  <TiTick color="white" size={"33"} className="bg-green-600" />
                </div>
                <div className="ml-5 text-md font-bold text-cyan-800">
                  Shipped
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="h-20 w-0.5 m-auto border-2 border-black-500/100"></div>
              <div className="w-10 m-auto flex h-10 flex-row">
                <div className="border-4 border-black-500/100">
                  <TiTick color="white" size={"33"} className="" />
                </div>
                <div className="ml-5 text-md font-bold text-cyan-800">
                  Shipped
                </div>
              </div>
            </div>
          )}
          {data?.shipping_status == "Out for delivery" ||
          data?.shipping_status == "Delivered" ? (
            <div>
              <div className="h-20 w-0.5 m-auto border-2 border-green-500/100"></div>
              <div className="w-10 m-auto flex h-10 flex-row">
                <div className="border-4 border-black-500/100">
                  <TiTick color="white" size={"33"} className="bg-green-600" />
                </div>
                <div className="ml-5 text-md font-bold text-cyan-800">
                  Out for delivery
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="h-20 w-0.5 m-auto border-2 border-black-500/100"></div>
              <div className="w-10 m-auto flex h-10 flex-row">
                <div className="border-4 border-black-500/100">
                  <TiTick color="white" size={"33"} className="" />
                </div>
                <div className="ml-5 text-md font-bold text-cyan-800">
                  Out for delivery
                </div>
              </div>
            </div>
          )}
          {data?.shipping_status == "Delivered" ? (
            <div>
              <div className="h-20 w-0.5 m-auto border-2 border-green-500/100"></div>
              <div className="w-10 m-auto flex h-10 flex-row">
                <div className="border-4 border-black-500/100">
                  <TiTick color="white" size={"33"} className="bg-green-600" />
                </div>
                <div className="ml-5 text-md font-bold text-cyan-800">
                  Delivered
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="h-20 w-0.5 m-auto border-2 border-black-500/100"></div>
              <div className="w-10 m-auto flex h-10 flex-row">
                <div className="border-4 border-black-500/100">
                  <TiTick color="white" size={"33"} className="" />
                </div>
                <div className="ml-5 text-md font-bold text-cyan-800">
                Delivered
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
