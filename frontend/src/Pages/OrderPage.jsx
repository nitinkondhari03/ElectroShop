import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [data, setData] = useState([]);
  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });
    const responseData = await response.json();
    setData(responseData.data);
    console.log(responseData.data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div>
      {!data[0] && <p>No Order available</p>}

      <div className="p-4 max-w-screen-lg m-auto">
        <h1 className="font-bold text-2xl text-center">Your Orders</h1>
        {data?.map((item, index) => {
          return (
            <div key={item.userId + index}>
              <section className="py-10 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                  <div className="main-box border bg-white border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                      <div className="data">
                        <p className="font-semibold text-base leading-7 text-black">
                          Order Id:{" "}
                          <span className="text-green-600 font-medium">
                            {item._id}
                          </span>
                        </p>
                        <p className="font-semibold text-base leading-7 text-black mt-1">
                          Payment Method:{" "}
                          <span className="text-green-600 font-medium">
                            {" "}
                            {item.paymentDetails.payment_group}
                          </span>
                        </p>
                        <p className="font-semibold text-base leading-7 text-black mt-1">
                          Payment Status:{" "}
                          <span className="text-green-600 font-medium">
                            {" "}
                            {item.paymentDetails.payment_status}
                          </span>
                        </p>
                      </div>

                      {item?.shipping_status == "Delivery Order" ? (
                        <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-green-800 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-green-900 hover:shadow-green-700">
                          Order Delivered Successfully
                        </button>
                      ) : (
                        <Link to={"/trackOrder/" + item?._id}>
                          {" "}
                          <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-cyan-800 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-cyan-900 hover:shadow-cyan-700">
                            Track Your Order
                          </button>
                        </Link>
                      )}
                    </div>
                    <div className="w-full px-3 min-[400px]:px-6">
                      {item?.productDetails.map((items, indexs) => {
                        return (
                          <div
                            key={items + indexs}
                            className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full"
                          >
                            <Link to={"/product/" + items.productId._id}>
                              <div className="img-box max-lg:w-full">
                                <img
                                  src={items.productId.productImage[0]}
                                  alt="Diamond Watch image"
                                  className="aspect-square w-full lg:max-w-[140px] rounded-xl"
                                />
                              </div>
                            </Link>
                            <div className="flex flex-row items-center w-full ">
                              <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                <div className="flex items-center">
                                  <div className="">
                                    <h2 className="font-semibold text-xl leading-8 text-black mb-3 ">
                                      {items.productName}
                                    </h2>
                                    <p className="font-normal text-lg leading-8 text-gray-500 mb-3">
                                      Diamond Dials
                                    </p>
                                  </div>
                                </div>
                                <div className="flex justify-evenly">
                                  <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                    <div className="flex gap-3 lg:block">
                                      <p className="font-medium text-lg leading-7 text-black">
                                        Qty
                                      </p>
                                      <p className="lg:mt-4 font-medium text-lg leading-7 text-green-600">
                                        {items.quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                    <div className="flex gap-3 lg:block">
                                      <p className="font-medium text-lg leading-7 text-black">
                                        Price
                                      </p>
                                      <p className="lg:mt-4 font-medium text-lg leading-7 text-green-600">
                                        {displayINRCurrency(
                                          items.productId.sellingPrice
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                      {item?.shipping_status !== "Delivery Order" && (
                        <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                          <button className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                            <svg
                              className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                            >
                              <path
                                d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                                stroke=""
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                            Cancel Order
                          </button>
                        </div>
                      )}
                      <p className="font-medium text-sm text-gray-900 py-3 max-lg:text-center border-r border-gray-200 pr-6">
                        <span className="font-medium text-lg">
                          Shipping Address
                        </span>
                        <br />
                        Address{" : "}
                        <span className="text-gray-500">
                          {item.shipping_Address.address}
                        </span>
                        <br />
                        Country{" : "}
                        <span className="text-gray-500">
                          {item.shipping_Address.country}
                        </span>
                        {"  ,"}
                        State{" : "}
                        <span className="text-gray-500">
                          {item.shipping_Address.state}
                        </span>
                        {"  ,"}
                        City{" : "}
                        <span className="text-gray-500">
                          {item.shipping_Address.city}
                        </span>
                        {"  ,"}
                        Pin Code{" : "}
                        <span className="text-gray-500">
                          {item.shipping_Address.pin}
                        </span>
                        <br />
                        Mobile Number{" : "}
                        <span className="text-gray-500">{item.mobile}</span>
                      </p>
                      <p className="font-semibold text-lg text-black py-6">
                        Total Price:{" "}
                        <span className="text-indigo-600">
                          {" "}
                          {displayINRCurrency(item.paymentDetails.order_amount)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
