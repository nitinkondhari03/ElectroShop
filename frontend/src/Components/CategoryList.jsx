import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";
const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(17).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
        <Link to="/allcategories">
        <div className="flex m-auto justify-center xl:hidden">
            <div className="flex items-center justify-center">
        <p className="">
        All Categories 
      </p>
      </div>
      <div className="flex items-center justify-center ml-1  mt-1"> <IoIosArrowDroprightCircle size={"22"}  color="gray"/></div>
        </div>
        </Link>
      <p className="text-center hidden xl:block text-gray-500">
        All Categories
      </p>
      <div className="flex flex-nowrap xl:flex-wrap items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading?.map((el, index) => {
              return (
                <div className="w-32">
                  <div
                    className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                    key={"categoryLoading" + index}
                  ></div>
                </div>
              );
            })
          : categoryProduct?.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.category}
                  className="cursor-pointer"
                  key={product?.category}
                >
                  <div className="w-32 m-auto text-center">
                    <div className="w-16 h-16 md:w-20 m-auto md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                      <img
                        src={product?.productImage[0]}
                        alt={product?.category}
                        className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                      />
                    </div>
                    <p className="text-sm capitalize text-center text-gray-700">
                      {product?.category}
                    </p>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
