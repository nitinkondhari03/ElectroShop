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

      handleorder({ dataApi });
    } catch (error) {
      console.log(error);
    }
  };
  const handleorder = async ({ dataApi }) => {
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
      shipping_status: "shipping soon",
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
      navigate("/success");
    }
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
      shipping_status: "shipping soon",
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
                    className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
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
                      <div className="flex items-center justify-between">
                        <p className="text-green-900 font-medium text-lg">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-green-900 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
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
        {!cart?.length==0 && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-green-800 px-4 py-1">Summary</h2>
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
