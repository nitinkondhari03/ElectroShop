import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";
import ChangePaymetStatus from "../Components/ChangePaymetStatus";

const AllOrder = () => {
  const [data, setData] = useState([]);
  const [openUpdateRole,setOpenUpdateRole] = useState(false);
  const [shipping_data,setshipping_data]=useState()
  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.allOrder.url, {
      method: SummaryApi.allOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();

    setData(responseData.data);
    console.log(responseData.data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="h-[calc(100vh-190px)] overflow-y-scroll">
      {!data[0] && <p>No Order available</p>}

      <div className="p-4 w-full">
        {data?.map((item, index) => {
          return (
            <div key={item.userId + index}>
              <p className="font-medium text-lg">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="border rounded p-2">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="grid gap-1">
                    {item?.productDetails?.map((product, index) => {
                      return (
                        <div
                          key={product.productId + index}
                          className="flex  gap-3 bg-slate-100"
                        >
                          <img
                            src={product.productId.productImage[0]}
                            className="w-28 h-28 bg-slate-200 object-scale-down p-2"
                          />
                          <div>
                            <div className="font-medium text-lg text-ellipsis line-clamp-1">
                              {product.productId.brandName}
                            </div>
                            <div className="flex items-center gap-5 mt-1">
                              <div className="text-lg text-red-500">
                                {displayINRCurrency(
                                  product.productId.sellingPrice
                                )}
                              </div>
                              <p>Quantity : {product.quantity}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                    <div>
                      <div className="text-lg font-medium">
                        Payment Details :{" "}
                      </div>
                      <p className=" ml-1">
                        Payment method :{" "}
                        {item.paymentDetails.payment_group}
                      </p>
                      <p className=" ml-1">
                        Payment Status : {item.paymentDetails.payment_status}
                      </p>
                      
                    </div>
                    <div>
                      <div className="text-lg font-medium">
                        Shipping Details :
                      </div>
                      <p>Shipping Address: {item.shipping_Address.address}</p>
                      <p>shipping_status :{" "} {item.shipping_status}</p>
                     { item.shipping_status!=="Delivered" &&
                      <button
                        onClick={() => {
                          setOpenUpdateRole(true);
                          setshipping_data(item)
                        }}
                        className="bg-cyan-800 text-white p-2 pl-5 pr-5 rounded-lg hover:opacity-95 hover:bg-cyan-900 disabled:opacity-80"
                      >
                        Shipping Status
                      </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
              {openUpdateRole && (
        <ChangePaymetStatus
          onClose={() => setOpenUpdateRole(false)}
          shipping_status={shipping_data.shipping_status}
          orderId={shipping_data._id}
          callFunc={fetchOrderDetails}
        />
      )}
            </div>
          );
        })}
      </div>
     
    </div>
  );
};

export default AllOrder;
