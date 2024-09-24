import React, { useContext } from "react";
import scrollTop from "../helpers/scrollTop";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../store/cartSlice/cartSlice";
const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);

  const dispatch = useDispatch();
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    dispatch(showCart());
  };

  return (
    <div className="grid lg:grid-cols-3 gap-10 sm:grid-cols-2">
      {loading
        ? loadingList?.map((product, index) => {
            return (
              <div
                key={index}
                className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                    <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                  </div>
                  <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
                </div>
              </div>
            );
          })
        : data?.map((product, index) => {
            return (
              <Link
                key={index}
                to={"/product/" + product?._id}
                className="bg-white rounded-sm shadow "
                onClick={scrollTop}
              >
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                  <img
                    src={product?.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="grid gap-3 text-center">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3 justify-evenly">
                    <p className="text-green-800 font-bold">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-green-700 font-medium line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-lg w-full bg-cyan-800 hover:bg-cyan-900 text-white px-3 py-2 "
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default VerticalCard;
