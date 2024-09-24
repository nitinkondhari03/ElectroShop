import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCard from "../Components/VerticalCard";
import SummaryApi from "../common";
import { IoMdArrowDropdownCircle } from "react-icons/io";
const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filters, setfilters] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      ?.map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    //format for url change when change on the checkbox
    const urlFormat = arrayOfCategory?.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    setSortBy(value);

    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);

  const handleFilter = () => {
    setfilters(!filters);
  };

  return (
    <div className="mx-auto p-4">
      {/***desktop version */}
      <div className="flex justify-center">
        {/***left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll invisible sm:visible">
          {/**sort by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value={"asc"}
                />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value={"dsc"}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/**filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory?.map((categoryName, index) => {
                return (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/***right side ( product ) */}
        <div className="px-4 flex-none w-full sm:flex-auto sm:w-auto">
          <p className="font-medium invisible sm:visible text-slate-800 text-lg my-2">
            <p>Search Results : {data.length}</p>
          </p>
          <p
            style={{ marginTop: "-30px" }}
            className="font-medium sm:invisible text-slate-800 text-lg my-2 flex justify-evenly"
          >
            <p>Search Results : {data.length}</p>
            <p className="flex text-green-800" onClick={handleFilter}>
              Filter{" "}
              <IoMdArrowDropdownCircle
                size={"20"}
                color="#2e7d32"
                className="mt-auto mb-auto ml-1"
              />
            </p>
          </p>
          {filters ? (
            <div className="bg-white sm:hidden p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
              {/**sort by */}
              <div className="">
                <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                  Sort by
                </h3>

                <form className="text-sm flex flex-col gap-2 py-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="sortBy"
                      checked={sortBy === "asc"}
                      onChange={handleOnChangeSortBy}
                      value={"asc"}
                    />
                    <label>Price - Low to High</label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="sortBy"
                      checked={sortBy === "dsc"}
                      onChange={handleOnChangeSortBy}
                      value={"dsc"}
                    />
                    <label>Price - High to Low</label>
                  </div>
                </form>
              </div>

              {/**filter by */}
              <div className="">
                <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                  Category
                </h3>

                <form className="text-sm flex flex-col gap-2 py-2">
                  {productCategory?.map((categoryName, index) => {
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name={"category"}
                          checked={selectCategory[categoryName?.value]}
                          value={categoryName?.value}
                          id={categoryName?.value}
                          onChange={handleSelectCategory}
                        />
                        <label htmlFor={categoryName?.value}>
                          {categoryName?.label}
                        </label>
                      </div>
                    );
                  })}
                </form>
              </div>
              <div className="border-t pb-1 mt-2 border-slate-300">
                <button
                  onClick={handleFilter}
                  className="bg-cyan-800 w-full text-white p-2 rounded-lg uppercase hover:opacity-95 hover:bg-cyan-900 disabled:opacity-80"
                >
                  Filter
                </button>
              </div>
            </div>
          ) : (
            <div className="min-h-[calc(100vh-120px)] sm:hidden overflow-y-scroll max-h-[calc(100vh-120px)]">
              {data.length !== 0 && !loading && (
                <VerticalCard data={data} loading={loading} />
              )}
            </div>
          )}
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
