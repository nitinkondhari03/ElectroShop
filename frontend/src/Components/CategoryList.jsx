import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";
const CategoryList = () => {

  let data = [
    {
      id: 1,
      category: "Air Conditioners",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727451168/Products%20Images/pzwhi98jnkmi7nkycybg.jpg",
      categorylink: "air conditioners",
    },
    {
      id: 2,
      category: "Camera",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727446047/Products%20Images/imfjnfmabj21yngxwwnp.jpg",
      categorylink: "camera",
    },
    {
      id: 3,
      category: "Desktops",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727358708/Products%20Images/ycblgs6avhdr7sefnd3q.jpg",
      categorylink: "desktops",
    },
    {
      id: 4,
      category: "Drives Storage",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727704869/Products%20Images/skwtfk4rlhijuvb2vsqt.jpg",
      categorylink: "drives storage",
    },
    {
      id: 5,
      category: "EarBuds",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727361855/Products%20Images/cbehlim6cjwqlhf6bcfk.jpg",
      categorylink: "earBuds",
    },
    {
      id: 6,
      category: "Earphones",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727367855/Products%20Images/ckpnljp8o3ruznngjzla.jpg",
      categorylink: "earphones",
    },
    {
      id: 7,
      category: "Laptops",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727356996/Products%20Images/lq4lejwltzzbjl9uvkbq.jpg",
      categorylink: "laptops",
    },
    {
      id: 8,
      category: "Mobile Cover",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727412303/Products%20Images/sdaesk3jaw87diep0kn3.jpg",
      categorylink: "mobile cover",
    },
    {
      id: 9,
      category: "Mobiles",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727345963/Products%20Images/fpglb9bexoose91fblhx.jpg",
      categorylink: "mobiles",
    },
    {
      id: 10,
      category: "Refrigerator",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727453030/Products%20Images/upzbor6wutwajaapglge.jpg",
      categorylink: "refrigerator",
    },
    {
      id: 11,
      category: "Screen Protectors",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727415313/Products%20Images/eznrcrr0rnxujgrj3al4.jpg",
      categorylink: "screen protectors",
    },
    {
      id: 12,
      category: "Smartwatch",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727373046/Products%20Images/sszwbnxw2opmciztublk.jpg",
      categorylink: "smartwatch",
    },
    {
      id: 13,
      category: "Speakers",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727447280/Products%20Images/rmsa1qtd7qc3safrpxc4.jpg",
      categorylink: "speakers",
    },
    {
      id: 14,
      category: "Tablets",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727443564/Products%20Images/bus022qyopzokcjyaztb.jpg",
      categorylink: "tablets",
    },
    {
      id: 15,
      category: "Televisions",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727349395/Products%20Images/llkunu0bjmddzmpmvumw.jpg",
      categorylink: "televisions",
    },
    {
      id: 16,
      category: "Washing Machines",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727454780/Products%20Images/awu9zaelhhesd4r6qfag.jpg",
      categorylink: "washing machines",
    },
    {
      id: 17,
      category: "Watches",
      productImage:
        "http://res.cloudinary.com/dqy96w2ak/image/upload/v1727370588/Products%20Images/jjhr5kkznyy7zqhlscm0.jpg",
      categorylink: "watches",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Link to="/allcategories">
        <div className="flex m-auto justify-center xl:hidden">
          <div className="flex items-center justify-center">
            <p className="">All Categories</p>
          </div>
          <div className="flex items-center justify-center ml-1  mt-1">
            {" "}
            <IoIosArrowDroprightCircle size={"22"} color="gray" />
          </div>
        </div>
      </Link>
      <p className="text-center hidden xl:block text-gray-500">
        All Categories
      </p>
      <div className="flex flex-nowrap xl:flex-wrap items-center xl:gap-6 overflow-scroll scrollbar-none">
        {data?.map((product, index) => {
          return (
            <Link
              to={"/product-category?category="+product.categorylink}
              className="cursor-pointer"
              key={product?.categorylink}
            >
              <div className="w-32 m-auto text-center mt-5">
                <div className="w-16 h-16 md:w-20 m-auto md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                  <img
                    src={product?.productImage}
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
