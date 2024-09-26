import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import LoadingButton from "../Components/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { showUser } from "../store/userSlice/userSlice";
const UpdateProfile = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState({
    email: user?.email,
    name: user?.name,
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

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const dataResponse = await fetch(SummaryApi.updateProfile.url, {
      method: SummaryApi.updateProfile.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      setisLoading(false);
      dispatch(showUser());
      navigate("/profile");
    }

    if (dataApi.error) {
      setisLoading(false);
      toast.error(dataApi.message);
    }
    setisLoading(false);
  };
  return (
    <div>
      <section id="signup">
        <div className="mx-auto container p-4">
          <h1 className="text-3xl text-center font-bold my-4">
            Update Profile
          </h1>
          <div className="bg-white p-5 w-full max-w-lg mx-auto">
            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="grid">
                <label className="font-bold">Name : </label>
                <div className="bg-slate-100 p-3 rounded-lg">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="grid">
                <label className="font-bold">Email : </label>
                <div className="bg-slate-100 p-3 rounded-lg">
                  <input
                    disabled="true"
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              {isLoading ? (
                <LoadingButton />
              ) : (
                <button className="bg-cyan-800 hover:bg-cyan-900 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-6">
                  Update Profile
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

export default UpdateProfile;
