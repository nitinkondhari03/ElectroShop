import React, { useState } from "react";
import scrollTop from "../helpers/scrollTop";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { showCart } from "../store/cartSlice/cartSlice";
const VerticalCard = ({data = [] }) => {
  const dispatch = useDispatch();
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    dispatch(showCart());
  };
  return (
    <div className="grid lg:grid-cols-3 gap-10 sm:grid-cols-2">
{data?.map((product, index) => {
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
                  <p className="font-medium pl-1 text-sm text-ellipsis line-clamp-1 text-gray-600">
                    {product?.productName}
                  </p>
                  <p className="capitalize text-slate-500">
                    {product?.brand}
                  </p>
                  <div className="flex gap-3 justify-evenly">
                    <p className="text-green-800 text-sm font-bold">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-green-700 text-sm font-medium line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>

                  <button
                    className="text-md w-full bg-cyan-800 hover:bg-cyan-900 text-white px-3 py-2 "
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
