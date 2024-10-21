import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import LoadingButton from "../Components/LoadingButton";
const ForgotPassowrd = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const dataResponse = await fetch(SummaryApi.forgotPassword.url, {
      method: SummaryApi.forgotPassword.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();
    console.log(dataApi.message);
    if (dataApi.success) {
      toast.success(dataApi.message);
      setisLoading(false);
      navigate("/");
    }

    if (dataApi.error) {
      setisLoading(false);
      toast.error(dataApi.message);
      navigate("/");
    }
    setisLoading(false);
    navigate("/");
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <h1 className="text-3xl text-center font-bold my-7">Forgot Password</h1>
        <div className="bg-white p-5 w-full max-w-lg mx-auto">
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label className="font-bold">Email : </label>
              <div className="bg-slate-100 p-3 rounded-lg">
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            {isLoading ? (
              <LoadingButton />
            ) : (
              <button className="bg-cyan-800 hover:bg-cyan-900 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-5">
                Forgot Passowrd
              </button>
            )}
          </form>

          <p className="my-5">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className=" text-red-600 hover:text-red-700 hover:underline mr-5"
            >
              Login
            </Link>
            Don't have account ?{" "}
            <Link
              to={"/register"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassowrd;
