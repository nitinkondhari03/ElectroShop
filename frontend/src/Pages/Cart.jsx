import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import PaymentMethod from "../Components/PaymentMethod";
import OrderAddress from "../Components/OrderAddress";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showCart } from "../store/cartSlice/cartSlice";
import Logoes from "../assets/Logo/Online Shop Logo.png";
const Cart = () => {
  const { user } = useSelector((state) => state?.user);
  const { cart } = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const [openAddress, setOpenAddress] = useState(false);
  const [openpaymentoption, setOpenpaymentoption] = useState(false);
  const [addresss, setaddresss] = useState("");
  const [citys, setcitys] = useState("");
  const [countrys, setcountrys] = useState("");
  const [pins, setpins] = useState("");
  const [states, setstates] = useState("");
  const [phoneNos, setPhoneNos] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const loadingCart = new Array(4).fill(null);
  const navigate = useNavigate();

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      dispatch(showCart());
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        dispatch(showCart());
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      dispatch(showCart());
    }
  };

  const totalQty = cart?.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = cart?.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );
  const handlePaymentverify = async (orderids) => {
    setisLoading(true);
    try {
      const dataResponse = await fetch(SummaryApi.paymentverify.url, {
        method: SummaryApi.paymentverify.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ orderId: orderids }),
      });
      const dataApi = await dataResponse.json();
      setLoading(false);
      handleorder({ dataApi });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleorder = async ({ dataApi }) => {
    setisLoading(true);
    let datas = {
      userId: user._id,
      email: user.email,
      mobile: phoneNos,
      productDetails: cart,
      paymentDetails: {
        order_id: dataApi[0].order_id,
        order_amount: dataApi[0].order_amount,
        payment_amount: dataApi[0].payment_amount,
        payment_method: [dataApi[0].payment_method],
        payment_currency: dataApi[0].payment_currency,
        payment_group: dataApi[0].payment_group,
        payment_status: dataApi[0].payment_status,
      },
      shipping_status: "Ordered",
      shipping_Address: {
        address: addresss,
        city: citys,
        state: states,
        country: countrys,
        pin: pins,
      },
    };
    const dataResponse = await fetch(SummaryApi.uploadorder.url, {
      method: SummaryApi.uploadorder.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(datas),
    });

    const dataApis = await dataResponse.json();
    if (dataApi[0].payment_status == "SUCCESS") {
      dispatch(showCart());
      setLoading(false);
      navigate("/success");
    }
    setLoading(false);
  };
  const handleordercashondelivery = async () => {
    setisLoading(true);
    let datas = {
      userId: user._id,
      email: user.email,
      mobile: phoneNos,
      productDetails: cart,
      paymentDetails: {
        order_id: "",
        order_amount: totalPrice,
        payment_amount: totalPrice,
        payment_method: "Cash On Delivery",
        payment_currency: "INR",
        payment_group: "Cash On Delivery",
        payment_status: "Pending",
      },
      shipping_status: "Ordered",
      shipping_Address: {
        address: addresss,
        city: citys,
        state: states,
        country: countrys,
        pin: pins,
      },
    };
    const dataResponse = await fetch(SummaryApi.uploadorder.url, {
      method: SummaryApi.uploadorder.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(datas),
    });

    const dataApis = await dataResponse.json();
    if (dataApis) {
      dispatch(showCart());
      navigate("/success");
    }
  };
  return (
    <div className="container mx-auto">
      {isLoading ? (
        <div>
          <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
            {/***view product */}
            <div className="w-full max-w-3xl">
              {loading
                ? loadingCart?.map((el, index) => {
                    return (
                      <div
                        key={el + "Add To Cart Loading" + index}
                        className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                      ></div>
                    );
                  })
                : cart?.map((product, index) => {
                    return (
                      <div
                        key={product?._id + "Add To Cart Loading"}
                        className="w-full bg-white h-32 my-2 border border-slate-300  rounded flex sm:grid sm:grid-cols-[128px,1fr]"
                      >
                        <div className="w-32 h-32 bg-slate-200 animate-pulse"></div>
                        <div className="px-4 py-2 relative w-full">
                          <h2 className="text-sm pl-1 pr-2 text-ellipsis line-clamp-1 animate-pulse bg-slate-200 w-full py-2"></h2>
                          <p className="text-sm pl-1 pr-2 text-ellipsis line-clamp-1 animate-pulse bg-slate-200 w-full py-2 mt-6"></p>
                          <p className="text-sm pl-1 pr-2 text-ellipsis line-clamp-1 animate-pulse bg-slate-200 w-full py-2 mt-6"></p>
                        </div>
                      </div>
                    );
                  })}
            </div>

            {/***summary  */}
            {!cart?.length == 0 && (
              <div className="mt-5 lg:mt-0 w-full max-w-sm">
                {loading ? (
                  <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
                ) : (
                  <div className="h-36 bg-white">
                    <h2 className="text-white bg-green-800 animate-pulse pt-4 w-full py-2 mt-6"></h2>
                    <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                      <p className="text-sm pl-1 pr-2 text-ellipsis line-clamp-1 animate-pulse bg-slate-200 w-full py-2 mt-2"></p>
                    </div>

                    <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                      <p className="text-sm pl-1 pr-2 text-ellipsis line-clamp-1 animate-pulse bg-slate-200 w-full py-2 mt-3"></p>
                    </div>

                    <button
                      className="bg-cyan-800 p-2 text-white w-full mt-2 capitalize hover:bg-cyan-900 animate-pulse py-2 h-8"
                      onClick={() => setOpenAddress(true)}
                    ></button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center text-lg my-3">
            {cart?.length === 0 && !loading && (
              <div className="bg-white py-5 mt-7">
                <div className="flex m-auto justify-center w-20">
                  <img src={Logoes} alt="Logo" className="m-auto" />
                </div>
                <div className="flex m-auto justify-center">
                  <p className="text-xl font-bold text-green-800">
                    Your Cart Is Empty!
                  </p>
                </div>
                <div>
                  <Link to={"/"}>
                    <button className="text-sm w-60 bg-cyan-800 hover:bg-cyan-900 text-white px-3 py-2 mt-8">
                      Back To Home
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
            {/***view product */}
            <div className="w-full max-w-3xl">
              {loading
                ? loadingCart?.map((el, index) => {
                    return (
                      <div
                        key={el + "Add To Cart Loading" + index}
                        className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                      ></div>
                    );
                  })
                : cart?.map((product, index) => {
                    return (
                      <div
                        key={product?._id + "Add To Cart Loading"}
                        className="w-full bg-white h-32 my-2 border border-slate-300  rounded flex sm:grid sm:grid-cols-[128px,1fr]"
                      >
                        <div className="w-32 h-32 bg-slate-200">
                          <img
                            src={product?.productId?.productImage[0]}
                            className="w-full h-full object-scale-down mix-blend-multiply"
                          />
                        </div>
                        <div className="px-4 py-2 relative w-full">
                          {/**delete product */}
                          <div
                            className="absolute right-0 text-cyan-800 rounded-full p-2 hover:bg-cyan-900 hover:text-white cursor-pointer"
                            onClick={() => deleteCartProduct(product?._id)}
                          >
                            <MdDelete />
                          </div>

                          <h2 className="text-sm pl-1 pr-2 text-ellipsis line-clamp-1">
                            {product?.productId?.productName}
                          </h2>
                          <p className="capitalize text-slate-500">
                            {product?.productId.category}
                          </p>
                          <div className="flex gap-4 sm:items-center sm:justify-between">
                            <p className="text-green-900 font-medium text-sm">
                              {displayINRCurrency(
                                product?.productId?.sellingPrice
                              )}
                            </p>
                            <p className="text-green-900 font-semibold text-sm line-through">
                              {displayINRCurrency(
                                product?.productId?.price * product?.quantity
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <button
                              className="border border-cyan-800 text-cyan-800 hover:bg-cyan-900 hover:text-white w-5 h-5 flex justify-center items-center rounded "
                              onClick={() =>
                                decraseQty(product?._id, product?.quantity)
                              }
                            >
                              -
                            </button>
                            <span>{product?.quantity}</span>
                            <button
                              className="border border-cyan-800 text-cyan-800 hover:bg-cyan-900 hover:text-white w-5 h-5 flex justify-center items-center rounded "
                              onClick={() =>
                                increaseQty(product?._id, product?.quantity)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>

            {/***summary  */}
            {!cart?.length == 0 && (
              <div className="mt-5 lg:mt-0 w-full max-w-sm">
                {loading ? (
                  <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
                ) : (
                  <div className="h-36 bg-white">
                    <h2 className="text-white text-md bg-green-800 px-4 py-1">
                      Summary
                    </h2>
                    <div className="flex items-center justify-between px-4 gap-2 font-medium text-md text-slate-600">
                      <p className="mt-2">Quantity</p>
                      <p>{totalQty}</p>
                    </div>

                    <div className="flex items-center justify-between px-4 gap-2 font-medium text-md text-slate-600">
                      <p className="mt-2">Total Price</p>
                      <p>{displayINRCurrency(totalPrice)}</p>
                    </div>

                    <button
                      className="bg-cyan-800 text-sm p-2 text-white w-full mt-6 capitalize hover:bg-cyan-900"
                      onClick={() => setOpenAddress(true)}
                    >
                      Check Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shipping Address */}
      {openAddress && (
        <OrderAddress
          onClose={() => setOpenAddress(false)}
          setOpenpaymentoption={setOpenpaymentoption}
          setaddresss={setaddresss}
          setcitys={setcitys}
          setcountrys={setcountrys}
          setpins={setpins}
          setstates={setstates}
          setPhoneNos={setPhoneNos}
        />
      )}
      {/**Payments */}
      {openpaymentoption && (
        <PaymentMethod
          handlePaymentverify={handlePaymentverify}
          handleordercashondelivery={handleordercashondelivery}
          totalPrice={totalPrice}
          phoneNos={phoneNos}
          onClose={() => setOpenpaymentoption(false)}
        />
      )}
    </div>
  );
};

export default Cart;
