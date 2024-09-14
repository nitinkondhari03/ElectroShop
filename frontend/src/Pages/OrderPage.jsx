import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();

    setData(responseData.data);
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
            <div key={item.userId + index} >
              {/* <p className="font-medium text-lg ">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="border rounded">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="grid gap-1">
                    {item?.productDetails.map((product, index) => {
                      return (
                        <div
                          key={product.productId + index}
                          className="flex  gap-3 bg-slate-100"
                        >
                          <img
                            src={product.image[0]}
                            className="w-28 h-28 bg-slate-200 object-scale-down p-2 transition-all mix-blend-multiply"
                          />
                          <div>
                            <div className="font-medium text-lg text-ellipsis line-clamp-1">
                              {product.name}
                            </div>
                            <div className="flex items-center gap-5 mt-1">
                              <div className="text-lg text-red-500">
                                {displayINRCurrency(product.price)}
                              </div>
                              <p>Quantity : {product.quantity}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                    <div>
                      <div className="text-lg font-medium">
                        Payment Details :{" "}
                      </div>
                      <p className=" ml-1">
                        Payment method :{" "}
                        {item.paymentDetails.payment_method_type[0]}
                      </p>
                      <p className=" ml-1">
                        Payment Status : {item.paymentDetails.payment_status}
                      </p>
                    </div>
                    <div>
                      <div className="text-lg font-medium">
                        Shipping Details :
                      </div>
                      {item.shipping_options.map((shipping, index) => {
                        return (
                          <div key={shipping.shipping_rate} className=" ml-1">
                            Shipping Amount : {shipping.shipping_amount}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="font-semibold ml-auto w-fit lg:text-lg">
                  Total Amount : {item.totalAmount}
                </div>
              </div> */}
              <section className="py-10 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                  <div className="main-box border bg-white border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                      <div className="data">
                        <p className="font-semibold text-base leading-7 text-black">
                          Order Id:{" "}
                          <span className="text-indigo-600 font-medium">
                            #10234987
                          </span>
                        </p>
                        <p className="font-semibold text-base leading-7 text-black mt-4">
                          Order Payment :{" "}
                          <span className="text-gray-400 font-medium">
                            {" "}
                            18th march 2021
                          </span>
                        </p>
                      </div>
                      <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                        Track Your Order
                      </button>
                    </div>
                    <div className="w-full px-3 min-[400px]:px-6">
                      <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                        <div className="img-box max-lg:w-full">
                          <img
                            src="https://pagedone.io/asset/uploads/1701167607.png"
                            alt="Premium Watch image"
                            className="aspect-square w-full lg:max-w-[140px] rounded-xl"
                          />
                        </div>
                        <div className="flex flex-row items-center w-full ">
                          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                            <div className="flex items-center">
                              <div className="">
                                <h4 className="font-semibold text-xl leading-8 text-black mb-3"></h4>
                                <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                  Premium Quality Dust Watch Premium Quality
                                  Dust{" "}
                                </p>
                                <div className="flex items-center ">
                                  <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                    Size:{" "}
                                    <span className="text-gray-500">
                                      100 ml
                                    </span>
                                  </p>
                                  <p className="font-medium text-base leading-7 text-black ">
                                    Qty:{" "}
                                    <span className="text-gray-500">2</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-5">
                              <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-black">
                                    price
                                  </p>
                                  <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                    $100
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-black">
                                    Status
                                  </p>
                                  <p className="font-medium text-sm leading-7 whitespace-nowrap  rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                    Ready for Delivery
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                    Expected Delivery Time
                                  </p>
                                  <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                    23rd March 2021
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
                        <div className="img-box max-lg:w-full">
                          <img
                            src="https://pagedone.io/asset/uploads/1701167621.png"
                            alt="Diamond Watch image"
                            className="aspect-square w-full lg:max-w-[140px] rounded-xl"
                          />
                        </div>
                        <div className="flex flex-row items-center w-full ">
                          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                            <div className="flex items-center">
                              <div className="">
                                <h2 className="font-semibold text-xl leading-8 text-black mb-3 ">
                                  Diamond Platinum Watch
                                </h2>
                                <p className="font-normal text-lg leading-8 text-gray-500 mb-3">
                                  Diamond Dials
                                </p>
                                <div className="flex items-center  ">
                                  <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                    Size:{" "}
                                    <span className="text-gray-500">
                                      Regular
                                    </span>
                                  </p>
                                  <p className="font-medium text-base leading-7 text-black ">
                                    Qty:{" "}
                                    <span className="text-gray-500">1</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-5">
                              <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-black">
                                    price
                                  </p>
                                  <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                    $100
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-black">
                                    Status
                                  </p>
                                  <p className="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-indigo-50 text-indigo-600">
                                    Dispatched
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                    Expected Delivery Time
                                  </p>
                                  <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                    23rd March 2021
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
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
                        <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                          Paid using Credit Card{" "}
                          <span className="text-gray-500">
                            ending with 8822
                          </span>
                        </p>
                      </div>
                      <p className="font-semibold text-lg text-black py-6">
                        Total Price:{" "}
                        <span className="text-indigo-600"> $200.00</span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          );
        })}
         {data?.map((item, index) => {
          return (
            <div key={item.userId + index} >
             
              <section className="py-10 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                  <div className="main-box border bg-white border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                      <div className="data">
                        <p className="font-semibold text-base leading-7 text-black">
                          Order Id:{" "}
                          <span className="text-indigo-600 font-medium">
                            #10234987
                          </span>
                        </p>
                        <p className="font-semibold text-base leading-7 text-black mt-4">
                          Order Payment :{" "}
                          <span className="text-gray-400 font-medium">
                            {" "}
                            18th march 2021
                          </span>
                        </p>
                      </div>
                      <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                        Track Your Order
                      </button>
                    </div>
                    <div className="w-full px-3 min-[400px]:px-6">
                      <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                        <div className="img-box max-lg:w-full">
                          <img
                            src="https://pagedone.io/asset/uploads/1701167607.png"
                            alt="Premium Watch image"
                            className="aspect-square w-full lg:max-w-[140px] rounded-xl"
                          />
                        </div>
                        <div className="flex flex-row items-center w-full ">
                          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                            <div className="flex items-center">
                              <div className="">
                                <h4 className="font-semibold text-xl leading-8 text-black mb-3"></h4>
                                <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                  Premium Quality Dust Watch Premium Quality
                                  Dust{" "}
                                </p>
                                <div className="flex items-center ">
                                  <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                    Size:{" "}
                                    <span className="text-gray-500">
                                      100 ml
                                    </span>
                                  </p>
                                  <p className="font-medium text-base leading-7 text-black ">
                                    Qty:{" "}
                                    <span className="text-gray-500">2</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-5">
                              <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-black">
                                    price
                                  </p>
                                  <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                    $100
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-black">
                                    Status
                                  </p>
                                  <p className="font-medium text-sm leading-7 whitespace-nowrap  rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                    Ready for Delivery
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                    Expected Delivery Time
                                  </p>
                                  <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                    23rd March 2021
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                   
                    </div>
                    <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
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
                        <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                          Paid using Credit Card{" "}
                          <span className="text-gray-500">
                            ending with 8822
                          </span>
                        </p>
                      </div>
                      <p className="font-semibold text-lg text-black py-6">
                        Total Price:{" "}
                        <span className="text-indigo-600"> $200.00</span>
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
