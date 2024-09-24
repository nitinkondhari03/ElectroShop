import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import LoadingButton from "../Components/LoadingButton";

const ResetPassword = () => {
  let urlsd = window.location.pathname;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(
        `${SummaryApi.resetPassword.url}/${urlsd}`,
        {
          method: SummaryApi.resetPassword.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ password: data.password }),
        }
      );

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        setisLoading(false);
        navigate("/login");
      }

      if (dataApi.error) {
        setisLoading(false);
        toast.error(dataApi.message);
      }
      setisLoading(false);
    } else {
      setisLoading(false);
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <h1 className="text-3xl text-center font-bold my-4">ReSet Password</h1>
        <div className="bg-white p-5 w-full max-w-lg mx-auto">
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <label className="font-bold">Password : </label>
              <div className="bg-slate-100 p-3 rounded-lg flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="font-bold">Confirm Password : </label>
              <div className="bg-slate-100 p-3 rounded-lg flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Confirm Password"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />

                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            {isLoading ? (
              <LoadingButton />
            ) : (
              <button className="bg-cyan-800 hover:bg-cyan-900 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-6">
                Reset Password
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
