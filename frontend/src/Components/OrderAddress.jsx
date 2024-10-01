import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { Country, State, City } from "country-state-city";
const OrderAddress = ({
  onClose,
  setOpenpaymentoption,
  setaddresss,
  setcitys,
  setcountrys,
  setpins,
  setstates,
  setPhoneNos,
}) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [pinCode, setPinCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setaddresss(address);
    setcitys(city);
    setcountrys(country);
    setpins(pinCode);
    setstates(state);
    setPhoneNos(phoneNo);
    setOpenpaymentoption(true);
    onClose();
  };

  return (
    <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="items-center text-center">
          <h1 className="font-bold mt-3 text-lg text-green-800">Shipping Address</h1>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="pt-6 flex flex-col p-4 text-sm gap-2 overflow-y-scroll h-full"
          onSubmit={handleSubmit}
        >
          <label htmlFor="sellingPrice" className="">
            Full Address
          </label>
          <input
            type="text"
            placeholder="Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Mobile Number
          </label>

          <input
            type="number"
            placeholder="Mobile Number"
            required
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            size="10"
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Country
          </label>
          <select
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="">Country</option>
            {Country &&
              Country.getAllCountries()?.map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </select>
          {country && (
            <label htmlFor="sellingPrice" className="mt-3">
              State
            </label>
          )}
          {country && (
            <select
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="p-2 bg-slate-100 border rounded"
            >
              <option value="">State</option>
              {State &&
                State.getStatesOfCountry(country)?.map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          )}
          {state && (
            <label htmlFor="sellingPrice" className="mt-3">
              District / City
            </label>
          )}
          {state && (
            <select
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-2 bg-slate-100 border rounded"
            >
              <option value=""> District / City </option>
              {City &&
                City.getCitiesOfState(country, state).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          )}

          {city && (
            <label htmlFor="sellingPrice" className="mt-3">
              Pin Code
            </label>
          )}
          {city && (
            <input
              type="number"
              placeholder="Pin Code"
              maxLength="6"
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="p-2 bg-slate-100 border rounded"
            />
          )}

          <button className="px-3 py-2 bg-cyan-800 hover:bg-cyan-900 p-4 text-white mt-7 mb-16">
            Shipping Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderAddress;
