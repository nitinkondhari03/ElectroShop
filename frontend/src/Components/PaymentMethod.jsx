import React, { useState } from "react";
import { CgClose } from "react-icons/cg";

const PaymentMethod = ({ onClose }) => {
  const [gender, setGender] = useState("male");

  const handleSubmit = async (e) => {
    e.preventDefault();

    onClose();
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  return (
    <div className="fixed w-full   bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl  max-h-[80%] overflow-hidden">
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <CgClose />
        </div>
        <div className="text-2xl text-center">
          <h1 className="font-bold">Select Payment Method</h1>
        </div>

        <form className="grid p-10 gap-6  pb-5" onSubmit={handleSubmit}>
          <label
            className={
              gender == "male"
                ? "p-2 bg-slate-100 border rounded border-black text-lg font-semibold"
                : "p-2 bg-slate-100 border rounded text-lg font-semibold"
            }
          >
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={handleGenderChange}
    
            />
            Cash On Delivery
          </label>
          <label
            className={
              gender == "female"
                ? "p-2 bg-slate-100 border rounded border-black text-lg font-semibold"
                : "p-2 bg-slate-100 border rounded text-lg font-semibold"
            }
          >
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={handleGenderChange}
            />
            Other Payment Method
          </label>

          <button className=" bg-cyan-800 text-white mt-3 hover:bg-cyan-900 p-4">
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
