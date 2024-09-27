import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import GoogleAuth from "../Components/GoogleAuth";
import { showUser } from "../store/userSlice/userSlice";
import { showCart } from "../store/cartSlice/cartSlice";
import LoadingButton from "../Components/LoadingButton";

const Login = () => {
  const {isAuthenticated } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
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
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      setisLoading(false);
      toast.success(dataApi.message);
      navigate("/");
      dispatch(showUser());
      dispatch(showCart());
    }

    if (dataApi.error) {
      setisLoading(false);
      toast.error(dataApi.message);
    }
    setisLoading(false);
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <h1 className="text-3xl text-center font-bold my-7">Login</h1>
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

            <div>
              <label className="font-bold">Password : </label>
              <div className="bg-slate-100 p-3 flex rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot password ?
              </Link>
            </div>
            {isLoading ? (
              <LoadingButton />
            ) : (
              <button className="bg-cyan-800 text-white p-2 rounded-lg uppercase hover:opacity-95 hover:bg-cyan-900 disabled:opacity-80">
                Login
              </button>
            )}
            <h1 className="text-center">OR</h1>
            <GoogleAuth />
          </form>

          <p className="my-5">
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

export default Login;
