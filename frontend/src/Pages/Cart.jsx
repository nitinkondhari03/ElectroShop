import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import PaymentMethod from "../Components/PaymentMethod";
import OrderAddress from "../Components/OrderAddress";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showCart } from "../store/cartSlice/cartSlice";
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
      shipping_status: "Delivery Order",
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
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-20 mt-40 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-green-800"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          <div className="text-center text-lg my-3">
            {cart?.length === 0 && !loading && (
              <p className="bg-white py-5">No Data</p>
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

                          <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                            {product?.productId?.productName}
                          </h2>
                          <p className="capitalize text-slate-500">
                            {product?.productId.category}
                          </p>
                          <div className="flex gap-4 sm:items-center sm:justify-between">
                            <p className="text-green-900 font-medium text-sm sm:text-lg">
                              {displayINRCurrency(
                                product?.productId?.sellingPrice
                              )}
                            </p>
                            <p className="text-green-900 font-semibold text-sm sm:text-lg">
                              {displayINRCurrency(
                                product?.productId?.sellingPrice *
                                  product?.quantity
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <button
                              className="border border-cyan-800 text-cyan-800 hover:bg-cyan-900 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                              onClick={() =>
                                decraseQty(product?._id, product?.quantity)
                              }
                            >
                              -
                            </button>
                            <span>{product?.quantity}</span>
                            <button
                              className="border border-cyan-800 text-cyan-800 hover:bg-cyan-900 hover:text-white w-6 h-6 flex justify-center items-center rounded "
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
                    <h2 className="text-white bg-green-800 px-4 py-1">
                      Summary
                    </h2>
                    <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                      <p>Quantity</p>
                      <p>{totalQty}</p>
                    </div>

                    <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                      <p>Total Price</p>
                      <p>{displayINRCurrency(totalPrice)}</p>
                    </div>

                    <button
                      className="bg-cyan-800 p-2 text-white w-full mt-2 capitalize hover:bg-cyan-900"
                      onClick={() => setOpenAddress(true)}
                    >
                      continue
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
          onClose={() => setOpenpaymentoption(false)}
        />
      )}
    </div>
  );
};

export default Cart;
