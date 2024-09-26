import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import LoadingButton from "../Components/LoadingButton";
const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState({
    oldpassword: "",
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
      const dataResponse = await fetch(`${SummaryApi.changePassword.url}`, {
        method: SummaryApi.changePassword.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          oldpassword: data.oldpassword,
        }),
      });

      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        setisLoading(false);
        navigate("/");
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
    <div>
      <section id="signup">
        <div className="mx-auto container p-4">
          <h1 className="text-3xl text-center font-bold my-4">
            Change Password
          </h1>
          <div className="bg-white p-5 w-full max-w-lg mx-auto">
            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div>
                <label className="font-bold">Old Password : </label>
                <div className="bg-slate-100 p-3 rounded-lg flex">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter Old Password"
                    value={data.oldpassword}
                    name="oldpassword"
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowOldPassword((preve) => !preve)}
                  >
                    <span>{showOldPassword ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="font-bold">New Password : </label>
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
                <label className="font-bold">New Confirm Password : </label>
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
                  Change Password
                </button>
              )}
            </form>
            <p className="my-5">
            Back To ?{" "}
            <Link
              to={"/profile"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Profile Page
            </Link>
          </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
