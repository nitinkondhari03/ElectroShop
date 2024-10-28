import React, { useState } from "react";
import { MdEdit, MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.DeleteProduct.url, {
      method: SummaryApi.DeleteProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-70">
      <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                  <img
                    src={data?.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
        <hr />
        <h1 className="text-ellipsis line-clamp-2 text-center mt-1">
          {data.productName}
        </h1>

        <div className="flex gap-3 justify-evenly">
          <p className="font-semibold">
            {displayINRCurrency(data.sellingPrice)}
          </p>
          <p className="font-semibold">
            {displayINRCurrency(data.price)}
          </p>
        </div>
        <div className="flex gap-2">
          <div
            className=" text-white p-2 bg-red-500 hover:bg-red-800 rounded-full hover:text-white cursor-pointer w-1/2 flex justify-center"
            onClick={(e) => handleDelete(e, data._id)}
          >
            <button className="">Delete</button>
            <MdDelete className="mt-1 ml-1 size-5"/>
            
          </div>
          <div
            className="w-1/2 ml-auto text-white p-2 bg-cyan-800 hover:bg-cyan-900 rounded-full hover:text-white cursor-pointer flex justify-center"
            onClick={() => setEditProduct(true)}
          >
             <button className="">Edit</button>
             <MdEdit className="ml-1 size-5"/>
           
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
