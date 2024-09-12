import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
  const navigate = useNavigate();
  console.log(data);
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
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center m-auto">
          <img
            src={data?.productImage[0]}
            className="mx-auto object-fill h-full"
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
            {displayINRCurrency(data.sellingPrice)}
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <div
            className="w-fit text-white p-2 bg-cyan-800 hover:bg-cyan-900 rounded-full hover:text-white cursor-pointer"
            onClick={(e) => handleDelete(e, data._id)}
          >
            <MdDelete />
          </div>
          <div
            className="w-fit ml-auto text-white p-2 bg-cyan-800 hover:bg-cyan-900 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
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
