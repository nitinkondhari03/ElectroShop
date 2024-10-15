import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import Logoes from "../assets/Logo/Online Shop Logo.png";
import { toast } from "react-toastify";
const OrderPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchOrderDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });
    const responseData = await response.json();
    setData(responseData.data);
    setLoading(false);
    console.log(responseData.data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    console.log(SummaryApi.orderDelete.url + id);
    const dataResponse = await fetch(SummaryApi.orderDelete.url + id, {
      method: SummaryApi.orderDelete.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(dataResponse);
    const dataApi = await dataResponse.json();
    console.log(dataApi);
    if (dataApi.success) {
      toast.success(dataApi.message);
      fetchOrderDetails()
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
      fetchOrderDetails()
    }
    fetchOrderDetails()
  };
  return (
    <>
      {loading ? (
        <div>
          <div className="p-4 max-w-screen-lg m-auto">
            <h1 className="font-bold text-2xl text-center">Your Orders</h1>
            <div>
              <section className="py-10 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                  <div className="main-box border bg-white border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                      <div className="w-1/3">
                        <p className="text-sm w-full text-ellipsis line-clamp-1 animate-pulse bg-slate-200 py-2 mt-1"></p>
                        <p className="text-sm w-full text-ellipsis line-clamp-1 animate-pulse bg-slate-200 py-2 mt-1"></p>
                        <p className="text-sm w-full text-ellipsis line-clamp-1 animate-pulse bg-slate-200 py-2 mt-1"></p>
                      </div>
                      <button className="rounded-full w-1/4 h-12 py-2 px-4 font-semibold text-sm leading-7 text-white bg-slate-200 max-lg:mt-3 shadow-sm shadow-transparent transition-all duration-500 hover:bg-slate-300 hover:shadow-slate-300 animate-pulse "></button>
                    </div>
                    <div className="w-full px-3 min-[400px]:px-6">
                      <div className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
                        <div className="w-32 h-32 bg-slate-200 animate-pulse"></div>

                        <div className="flex flex-row items-center w-full ">
                          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                            <div className="flex items-center">
                              <div className="w-1/3">
                                <p className="text-sm w-full text-ellipsis line-clamp-1 animate-pulse bg-slate-200 py-2 mt-6"></p>
                                <p className="text-sm w-full text-ellipsis line-clamp-1 animate-pulse bg-slate-200 py-2 mt-6"></p>
                              </div>
                            </div>
                            <div className="flex justify-evenly w-full">
                              <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3 w-full">
                                <div className="w-full">
                                  <p className="text-sm w-full text-ellipsis line-clamp-1 animate-pulse bg-slate-200 py-2 mt-6"></p>
                                  <p className="text-sm w-full text-ellipsis line-clamp-1 animate-pulse bg-slate-200 py-2 mt-6"></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full border-gray-200">
                      <p className="text-sm w-full text-ellipsis line-clamp-1 animate-pulse bg-slate-200 py-2 mt-6"></p>
                      <p className="text-sm w-full text-ellipsis line-clamp-1 animate-pulse bg-slate-200 py-2 mt-6"></p>
                      <p className="text-sm w-full text-ellipsis line-clamp-1 animate-pulse bg-slate-200 py-2 mt-6 mb-3"></p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {data.length === 0 ? (
            <div>
              {data?.length === 0 && (
                <div className="bg-white py-5 mt-7">
                  <div className="flex m-auto justify-center w-20">
                    <img src={Logoes} alt="Logo" className="m-auto" />
                  </div>
                  <div className="flex m-auto justify-center">
                    <p className="text-xl font-bold text-green-800">
                      Your Order Bag Is Empty!
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Link to={"/"}>
                      <button className="text-sm w-60 bg-cyan-800 hover:bg-cyan-900 text-white px-3 py-2 mt-8">
                        Back To Home
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 max-w-screen-lg m-auto">
              <h1 className="font-bold text-2xl text-center">Your Orders</h1>
              {data?.map((item, index) => {
                return (
                  <div key={item.userId + index}>
                    <section className="py-10 relative">
                      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                        <div className="main-box border bg-white border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                            <div>
                              <p className="font-semibold text-sm leading-7 text-gray-400">
                                Order Id:{" "}
                                <span className="text-gray-500 font-semibold">
                                  {item._id}
                                </span>
                              </p>
                              <p className="font-semibold text-sm leading-7 text-gray-400 mt-1">
                                Payment Method:{" "}
                                <span className="text-gray-500 font-semibold">
                                  {" "}
                                  {item.paymentDetails.payment_group}
                                </span>
                              </p>
                              <p className="font-semibold text-sm leading-7 text-gray-400  mt-1">
                                Payment Status:{" "}
                                <span className="text-gray-500 text-sm leading-7">
                                  {" "}
                                  {item.paymentDetails.payment_status}
                                </span>
                              </p>
                            </div>

                            {item?.shipping_status == "Delivery Order" ? (
                              <button className="rounded-full text-sm pl-2 pr-2 pt-1 pb-1  font-semibold leading-7 text-white bg-green-800 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-green-900 hover:shadow-green-700">
                                Order Delivered Successfully
                              </button>
                            ) : (
                              <Link to={"/trackOrder/" + item?._id}>
                                {" "}
                                <button className="rounded-full pl-2 pr-2 pt-1 pb-1 font-semibold text-sm leading-7 text-white bg-cyan-800 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-cyan-900 hover:shadow-cyan-700">
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
                                    <div className="img-box max-lg:w-full m-auto">
                                      <img
                                        src={items.productId.productImage[0]}
                                        alt="Diamond Watch image"
                                        className="aspect-square w-1/2 lg:max-w-[140px] rounded-xl m-auto"
                                      />
                                    </div>
                                  </Link>
                                  <div className="flex flex-row items-center w-full ">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                      <div className="flex items-center">
                                        <div className="">
                                          <p className="font-normal text-sm leading-8 text-gray-500 mb-3 text-center m-auto line-clamp-2">
                                            {items.productId.productName}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex justify-evenly">
                                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                          <div className="flex gap-3 lg:block">
                                            <p className="font-medium text-sm leading-7 text-gray-400">
                                              Qty
                                            </p>
                                            <p className="lg:mt-4 font-semibold text-sm  leading-7 text-gray-500">
                                              {items.quantity}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                          <div className="flex gap-3 lg:block">
                                            <p className="font-medium text-sm leading-7 text-gray-400">
                                              Price
                                            </p>
                                            <p className="lg:mt-4 font-semibold text-sm leading-7 text-gray-500">
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
                          <hr />
                          <div className="w-full border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                            {item?.shipping_status !== "Delivery Order" && (
                              <div className="hidden lg:flex lg:flex-row items-center border-gray-200">
                                <button onClick={(event) =>
                                  handleSubmit(event, item._id)
                                } className="flex text-sm outline-0 text-gray-500 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group bg-white transition-all duration-500 hover:text-green-600">
                                  <svg
                                    className="stroke-black transition-all duration-500 group-hover:stroke-green-600"
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
                            <p className="font-medium py-3 max-lg:text-center  border-gray-200 pr-6 text-gray-500 text-sm">
                              <span className="font-medium text-gray-500 text-md">
                                Shipping Address
                              </span>
                              <br />
                              Address{" : "}
                              <span className="text-gray-400 text-sm">
                                {item.shipping_Address.address}
                              </span>
                              <br />
                              Country{" : "}
                              <span className="text-gray-400 text-sm">
                                {item.shipping_Address.country}
                              </span>
                              {"  ,"}
                              State{" : "}
                              <span className="text-gray-400 text-sm">
                                {item.shipping_Address.state}
                              </span>
                              {"  ,"}
                              City{" : "}
                              <span className="text-gray-400 text-sm">
                                {item.shipping_Address.city}
                              </span>
                              {"  ,"}
                              Pin Code{" : "}
                              <span className="text-gray-400 text-sm">
                                {item.shipping_Address.pin}
                              </span>
                              <br />
                              Mobile Number{" : "}
                              <span className="text-gray-400 text-sm">
                                {item.mobile}
                              </span>
                            </p>
                            <p className="font-semibold text-md text-gray-400 py-6">
                              Total Price:{" "}
                              <span className="text-gray-500 text-sm">
                                {" "}
                                {displayINRCurrency(
                                  item.paymentDetails.order_amount
                                )}
                              </span>
                            </p>
                            {item?.shipping_status !== "Delivery Order" && (
                              <button
                                onClick={(event) =>
                                  handleSubmit(event, item._id)
                                }
                                className="rounded-full pl-3 pr-3 pt-1 pb-1  mb-2 font-semibold text-sm text-white bg-green-800 transition-all duration-500 hover:bg-green-900 hover:shadow-green-700 lg:hidden"
                              >
                                Cancel Order
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderPage;
